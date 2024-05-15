"use client";
import { useState, useEffect, useRef } from "react";
import { useWorkspace } from "./Context";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge, BadgeButton } from "../badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AiOutlineUndo,
  AiOutlineRedo,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { TEST_TRACE, TRACE_ERROR_ENDPOINT } from "./constants";
import { selector } from "starknet";

export default function BottomRight() {
  const [tracing, isTracing] = useState(false);
  const [sierra, setSierra] = useState("");
  const [casm, setCasm] = useState("");
  const [relocationTrace, setRelocationTrace] = useState([]);
  const { compilationResult, trace, traceError, simulationParameters } =
    useWorkspace();

  useEffect(() => {
    isTracing(!tracing);
  }, [traceError]);

  const getRelocationTrace = async () => {
    const apiUrl = TRACE_ERROR_ENDPOINT;

    // Get casm contract class
    const compilationResultJson = JSON.parse(compilationResult);
    const casmContractClass =
      compilationResultJson.casm_sierra.casm_contract_class;

    // Get entrypoint offset
    const externalEntryPoints = casmContractClass.entry_points_by_type.EXTERNAL;
    const entryPointSelector = selector.getSelectorFromName(
      simulationParameters?.functionName!
    );
    const entryPointOffset = externalEntryPoints.find(
      (entryPoint: any) => entryPoint.selector === entryPointSelector
    )?.offset;

    const payload = {
      args: simulationParameters?.calldata,
      casm_contract_class: JSON.stringify(casmContractClass),
      entrypoint_offset: entryPointOffset,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Trace completed:", data);

      setRelocationTrace(data.trace);
      isTracing(true);
      console.log(tracing);
    } catch (error) {
      console.error("Error compiling contract:", error);
    }
  };

  useEffect(() => {
    // const fetchTrace = async () => {
    //   console.log("Fetching trace");
    //   const decodedTrace = await decodeTrace(
    //     TEST_TRACE,
    //     "https://free-rpc.nethermind.io/sepolia-juno/"
    //   );
    //   console.log(decodedTrace);
    //   setTrace(decodedTrace);
    // };
    // fetchTrace();

    if (!compilationResult) {
      console.log("No compilation result available.");
      return;
    }

    try {
      const jsonCompilationResult = JSON.parse(compilationResult);
      if (jsonCompilationResult) {
        if (jsonCompilationResult) {
          setSierra(
            JSON.stringify(
              jsonCompilationResult.cairo_sierra.sierra_contract_class,
              null,
              4
            )
          );
          setCasm(
            JSON.stringify(
              jsonCompilationResult.casm_sierra.casm_contract_class,
              null,
              4
            )
          );
        }
      }
    } catch (error) {
      console.error("Error parsing compilation result:", error);
      setSierra("");
      setCasm("");
    }
  }, [compilationResult]);

  return (
    <div className="p-2">
      <Tabs defaultValue="bottom-right" className=" justify-between">
        <TabsList className="">
          <TabsTrigger value="sierra">Sierra</TabsTrigger>
          <TabsTrigger value="casm">CASM</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
        </TabsList>
        <TabsContent value="sierra">
          <Editor
            height={200}
            language="json"
            theme="vs-dark"
            value={sierra}
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              scrollbar: {
                horizontal: "hidden",
              },
            }}
          />
        </TabsContent>
        <TabsContent value="casm">
          <Editor
            height={200}
            language="json"
            theme="vs-dark"
            value={casm}
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              scrollbar: {
                horizontal: "hidden",
              },
            }}
          />
        </TabsContent>
        <TabsContent value="simulation">
          <div>
            {traceError ? (
              <div>
                {tracing && relocationTrace ? (
                  <ExecutionTrace relocationTrace={relocationTrace} />
                ) : (
                  <>
                    <p>{traceError}</p>
                    <Button
                      onClick={() => {
                        getRelocationTrace();
                      }}
                      className="mt-2"
                    >
                      Trace Error
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <SimulateTraceTable traces={trace} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const ExecutionTrace = ({ relocationTrace }: any) => {
  const [traceIndex, setTraceIndex] = useState(0);
  const [currentPc, setCurrentPc] = useState(0);
  const [casmInstructions, setCasmInstructions] = useState([]);
  const { selectedFileName, compilationResult, setLocation } = useWorkspace();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 200;
    }
  }, [currentPc]);

  useEffect(() => {
    const pc = relocationTrace[traceIndex].pc;
    const realPc = pc - 1;
    setCurrentPc(realPc);

    const compilationResultJson = JSON.parse(compilationResult);
    const casmSierraMappingInstruction =
      compilationResultJson.casm_sierra.casm_sierra_mapping_instruction;
    let casmSierraMapping = casmSierraMappingInstruction.casm_sierra_mapping;
    let casmInstructions = casmSierraMappingInstruction.casm_instructions;
    setCasmInstructions(casmInstructions);

    let sierraCairoInfoMapping =
      compilationResultJson.cairo_sierra.sierra_cairo_info_mapping;

    const location = getErrorLocation(
      realPc,
      selectedFileName,
      casmInstructions,
      casmSierraMapping,
      sierraCairoInfoMapping
    );
    if (location) {
      setLocation(location);
    }
  }, [traceIndex]);

  //
  const getErrorLocation = (
    pc: number,
    fileName: string,
    casmInstructions: any,
    casmSierraMapping: any,
    sierraCairoInfoMapping: any
  ) => {
    if (pc >= casmInstructions.length) {
      return;
    }

    let instructionIndex = casmInstructions[pc].instruction_index;
    let sierraLocationsIndices = casmSierraMapping[instructionIndex];
    if (sierraLocationsIndices) {
      for (const locationIndex of sierraLocationsIndices) {
        let cairoLocations =
          sierraCairoInfoMapping[locationIndex].cairo_locations;
        for (const location of cairoLocations) {
          if (location.file_name == `${fileName}.cairo`) {
            console.log(location);
            return location;
          }
        }
      }
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 m-2">Execution Trace</div>
        <div className="w-1/2">
          <div className="buttons flex justify-end">
            <AiOutlineUndo
              onClick={() => {
                if (traceIndex > 0) {
                  setTraceIndex(traceIndex - 1);
                }
              }}
              className="mr-2"
            />
            <AiOutlineRedo
              onClick={() => {
                if (traceIndex < relocationTrace.length - 1) {
                  setTraceIndex(traceIndex + 1);
                }
              }}
              className="mr-2"
            />
            <AiOutlinePlayCircle />
          </div>
        </div>
      </div>
      <div className="relative h-96 overflow-y-auto" ref={scrollRef}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>pc</TableHead>
              <TableHead>memory</TableHead>
              <TableHead>opcode</TableHead>
              <TableHead>off0</TableHead>
              <TableHead>off1</TableHead>
              <TableHead>off2</TableHead>
              <TableHead>dst</TableHead>
              <TableHead>op0</TableHead>
              <TableHead>op1</TableHead>
              <TableHead>res</TableHead>
              <TableHead></TableHead>
              <TableHead>pc_update</TableHead>
              <TableHead>ap_update</TableHead>
              <TableHead>fp_update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {casmInstructions?.map((instruction: any, index: number) => {
              const rowStyle =
                index === currentPc ? "text-white" : "text-gray-400";
              let instructionRepresentation =
                instruction.instruction_representation;
              return (
                <TableRow key={index} className={rowStyle}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{instruction.memory}</TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.opcode
                      : ""}
                  </TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.off0
                      : ""}
                  </TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.off1
                      : ""}
                  </TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.dst
                      : ""}
                  </TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.op0
                      : ""}
                  </TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.op1
                      : ""}
                  </TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.res
                      : ""}
                  </TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.pc_update
                      : ""}
                  </TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.ap_update
                      : ""}
                  </TableCell>
                  <TableCell>
                    {instructionRepresentation
                      ? instructionRepresentation.fp_update
                      : ""}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const SimVis = ({ traces }: { traces: Trace[] | Trace }) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log(showDetails);
  if (Array.isArray(traces)) {
    traces.map((trace, index) => {
      return <SimVis traces={trace} key={index} />;
    });
  } else {
    return (
      <>
        <TableRow>
          <TableCell>{traces.contractAddress.slice(5)}</TableCell>
          <Badge color="purple" className="p-2">
            <TableCell className="text-base">{traces.functionName}</TableCell>
          </Badge>
        </TableRow>

        {showDetails && (
          <MoreDetails inputs={traces.inputs} outputs={traces.outputs} />
        )}
        {Array.isArray(traces.internal_calls) ? (
          traces.internal_calls?.map((call, index) => {
            return <SimVis traces={call} key={index} />;
          })
        ) : (
          <SimVis traces={traces.internal_calls} />
        )}
      </>
    );
  }
};

type Value =
  | string[]
  | {
      name: string;
      type: string;
      value: Value;
    };

export type Trace = {
  contractAddress: string;
  functionName: string;
  callType: string;
  inputs: Value[];
  outputs: Value[];
  internal_calls: Trace[] | Trace;
};

export const SimulateTrace = ({
  traces,
  level,
}: {
  traces: any;
  level: number;
}) => {
  if (!traces) return <></>;
  let _level = level + 1;
  const {
    contractAddress,
    functionName,
    callType,
    inputs,
    outputs,
    internal_calls,
  } = traces;
  const [showDetails, setShowDetails] = useState(false);
  let arr = new Array(_level).fill(0);
  return (
    <>
      <TableRow>
        <TableCell className="">
          <div className="flex">
            {arr.map((e, index) => {
              return (
                <div
                  key={index}
                  className="w-4 h-4 space-x-8 align-centre items-center justify-center "
                ></div>
              );
            })}
            <div>
              {contractAddress.slice(0, 6) + "..." + contractAddress.slice(-4)}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-base">
          <Badge
            color={callType === "CALL" ? "purple" : "green"}
            className="p-2"
          >
            {callType}
          </Badge>
        </TableCell>
        <TableCell>{functionName}</TableCell>
        <TableCell>
          {" "}
          <BadgeButton
            className="cursor-pointer p-2"
            onClick={() => {
              setShowDetails(!showDetails);
            }}
            color="amber"
          >
            More Details
          </BadgeButton>
        </TableCell>
      </TableRow>
      {showDetails && (
        <TableRow>
          <MoreDetails inputs={inputs} outputs={outputs} />
        </TableRow>
      )}
      {internal_calls?.map((call: any, index: number) => {
        return <SimulateTrace traces={call} level={_level} key={index} />;
      })}
    </>
  );
};

export const SimulateTraceTable = ({ traces }: { traces: any }) => {
  return (
    <Table>
      {/* <TableCaption>The trace of your transaction</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Contract</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Function</TableHead>
          <TableHead className="text-right">More Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {traces && <SimulateTrace traces={traces} level={0} />}
      </TableBody>
    </Table>
  );
};

const MoreDetails = ({ inputs, outputs }: { inputs: any; outputs: any }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Input</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inputs.map((input: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell>{input.name}</TableCell>
                <TableCell>{input.type}</TableCell>
                <TableCell>
                  <pre>
                    <code>
                      {input.value?.length <= 1 &&
                      typeof input?.value[0] === "string"
                        ? input?.value[0]
                        : JSON.stringify(input.value, null, 4)}
                    </code>
                  </pre>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Output</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {outputs.map((output: any, index: number) => {
            return (
              <TableRow key={index}>
                <TableCell>{output.name}</TableCell>
                <TableCell>{output.type}</TableCell>
                <TableCell>
                  <pre>
                    <code>
                      {output.value?.length <= 1 &&
                      typeof output?.value[0] === "string"
                        ? output?.value[0]
                        : JSON.stringify(output.value, null, 4)}
                    </code>
                  </pre>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
