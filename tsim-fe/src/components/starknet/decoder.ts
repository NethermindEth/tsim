import { RpcProvider, Abi, Contract, selector } from "starknet";

type CallPuts = {
  name: string;
  type: string;
}[];

type DecodedSelector = {
  [key: string]: {
    name: string;
    inputs: CallPuts;
    outputs: CallPuts;
  };
};

const StarknetAbiTypes = [
  "felt",
  "felt*",
  "complex",
  "Uint256",
  "core::felt252",
  "core::integer::u8",
  "core::integer::u16",
  "core::integer::u32",
  "core::integer::u64",
  "core::integer::u128",
  "core::integer::u256",
  "core::starknet::contract_address::ContractAddress",
  "core::starknet::class_hash::ClassHash",
  "core::bool",
  "core::byte_array::ByteArray",
];

export const decodeTrace = async (trace: any) => {
  const {
    execute_invocation: executeInvocation,
    validate_invocation: validateInvocation,
  } = trace;
  const revertReason =
    executeInvocation?.revert_reason || validateInvocation?.revert_reason;
  if (revertReason) {
    return revertReason;
  }

  return await decodeInvocation(executeInvocation);
};

const decodeInvocation = async (invocation: any): Promise<any> => {
  const {
    contract_address: contractAddress,
    calldata,
    entry_point_selector: entryPointSelector,
    calls = [],
  } = invocation;
  const abi = await getAbi(contractAddress);
  const selectors = getSelectors(abi);
  const functionName = getFunctionName(entryPointSelector, selectors);

  const { inputs, outputs } = decodeCallData(
    abi,
    calldata,
    entryPointSelector,
    selectors
  );

  const functionInvocationTrace = {
    contractAddress,
    functionName,
    inputs,
    outputs,
    internal_calls: await Promise.all(calls.map(decodeInvocation)),
  };

  return functionInvocationTrace;
};

const decodeCallData = (
  abi: Abi,
  calldata: string[],
  entryPointSelector: string,
  selectors: DecodedSelector
): { inputs: any; outputs: any } => {
  // Directly access the inputs and outputs using the entryPointSelector, avoiding redundant lookups
  const { inputs, outputs } = selectors[entryPointSelector];
  return {
    inputs: decodePuts(abi, calldata, inputs).decoded,
    outputs: decodePuts(abi, calldata, outputs).decoded,
  };
};

const decodePuts = (abi: Abi, call: string[], puts: CallPuts) => {
  const decodedCall: {
    name: string;
    type: string;
    value: any;
  }[] = [];

  let startIndex = 0;
  for (const put of puts) {
    let stopIndex = startIndex;
    const elementTypeMatch = put.type.match(/core::array::Array::<(.+)>/);
    const elementType = elementTypeMatch ? elementTypeMatch[1] : put.type;

    // TODO: Handle bool, byteArray, and complex.
    if (elementType.includes("integer") || elementType === "Uint256") {
      stopIndex += 2; // For integers and Uint256
    } else if (!StarknetAbiTypes.includes(elementType)) {
      const structTypes = abi.filter(
        (item) => item.type === "struct" && item.name === elementType
      );
      if (structTypes.length > 0) {
        const structType = structTypes[0];
        const structInputs = structType.members.map(
          ({ name, type }: { name: string; type: string }) => ({ name, type })
        );

        let decodedStruct = [];

        // If it's an array
        if (elementTypeMatch) {
          const noOfElements = parseInt(call[startIndex], 16);
          startIndex += 1; // Move past the length element
          for (let i = 0; i < noOfElements; i++) {
            const structResult = decodePuts(
              abi,
              call.slice(startIndex),
              structInputs
            );
            decodedStruct.push(structResult.decoded);
            startIndex += structResult.consumed; // Increment startIndex by the number of elements consumed in the struct
          }
        } else {
          const structResult = decodePuts(
            abi,
            call.slice(startIndex),
            structInputs
          );
          decodedStruct = structResult.decoded;
          startIndex += structResult.consumed; // Adjust startIndex based on the consumed elements in the struct
        }

        decodedCall.push({
          name: put.name,
          type: put.type,
          value: decodedStruct,
        });
      }
    } else {
      stopIndex += 1; // Increment stopIndex for recognized StarknetAbiTypes
      decodedCall.push({
        name: put.name,
        type: put.type,
        value: call.slice(startIndex, stopIndex),
      });
    }

    startIndex = stopIndex; // Update startIndex for the next iteration
  }

  return {
    decoded: decodedCall,
    consumed: startIndex, // Return the total number of elements consumed to decode this call
  };
};

export const getAbi = async (address: string): Promise<Abi> => {
  const provider = new RpcProvider({
    nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/",
  });
  const classHash = await provider.getClassHashAt(address);
  let abi = (await provider.getClass(classHash)).abi;
  if (isProxy(abi)) {
    const implementationFunction = isProxy(abi);
    const contract = new Contract(abi, address, provider);
    const implementationHash = await contract[implementationFunction]();
    abi = (await provider.getClass(implementationHash)).abi;
  }
  return abi;
};

const isProxy = (abi: Abi): string => {
  return (
    abi.find(
      (f) =>
        f.type === "function" &&
        f.name.includes("implementation") &&
        f.stateMutability === "view"
    )?.name || ""
  );
};

const getSelectors = (abi: Abi): DecodedSelector => {
  return abi.reduce((acc, f) => {
    if (
      f.type === "function" ||
      (f.type === "interface" &&
        f.items.some((item: { type: string }) => item.type === "function"))
    ) {
      const functions =
        f.type === "function"
          ? [f]
          : f.items.filter(
              (item: { type: string }) => item.type === "function"
            );
      functions.forEach((func: { name: string; inputs: any; outputs: any }) => {
        acc[selector.getSelectorFromName(func.name)] = {
          name: func.name,
          inputs: func.inputs,
          outputs: func.outputs,
        };
      });
    }
    return acc;
  }, {});
};

const getFunctionName = (
  entryPointSelector: string,
  selectors: DecodedSelector
) => selectors[entryPointSelector].name;
