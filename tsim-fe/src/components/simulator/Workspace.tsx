import { Dispatch, SetStateAction, useState } from "react";
import {
  AiOutlineFolder,
  AiFillFolder,
  AiFillFolderOpen,
  AiFillFile,
  AiOutlineUpload,
  AiOutlineDownload,
  AiOutlineDelete,
} from "react-icons/ai";
import { IoMdArrowDropdown, IoMdAdd } from "react-icons/io";
import { FileItemProps } from "./types";
import { DEFAULT_WORKSPACE_TREE } from "./constants";
import { useWorkspace } from "./Context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FilePlusIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FileItem: React.FC<FileItemProps> = ({
  name,
  type,
  children,
  code,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const {
    setSelectedCode,
    setSelectedFileName,
    setSelectedFileId,
    setSelectedFolder,
  } = useWorkspace();

  const Icon = type === "folder" ? AiFillFolder : AiFillFile;

  return (
    <div className="items-center my-1 text-gray-300 hover:text-white cursor-pointer">
      <div className="flex items-center ">
        <div
          className="mr-2"
          onClick={() => {
            if (type === "file") {
              setSelectedCode(code!);
            } else setSelectedFolder(id);
            setIsOpen(!isOpen);
            setSelectedFileId(id);
            setSelectedFileName(name);
          }}
        >
          {isOpen && type === "folder" ? <AiFillFolderOpen /> : <Icon />}
        </div>
        <span className="text-sm">{name}</span>
      </div>
      <div className="pl-4">
        {children &&
          isOpen &&
          children.map((child) => <FileItem key={child.id} {...child} />)}
      </div>
    </div>
  );
};

const Workspace: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
  const [isModalWorkspaceOpen, setIsModalWorkspaceOpen] = useState(false);
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    workspaces,
    createNewWorkspace,
    addFile,
  } = useWorkspace();

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">WORKSPACES</h2>
        <div className="mr-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <IoMdArrowDropdown />
        </div>
      </div>
      {isOpen && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <Select
              onValueChange={(e) => {
                if (e === "new") setIsModalWorkspaceOpen(true);
                else
                setSelectedWorkspace(Number(e));
              }}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder={workspaces[selectedWorkspace].name} />
              </SelectTrigger>
              <SelectContent
                onChange={(e) => {
                  console.log("HIII");
                }}
              >
                {workspaces.map((workspace, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {workspace.name}
                  </SelectItem>
                ))}
                <SelectItem
                  value="new"
                  onSelect={() => {
                    console.log("HIII");
                    // TODO: Show a popup to create new workspace
                  }}
                >
                  - create a new workspace -
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-2 cursor-pointer">
              <AiOutlineDelete onClick={() => {}} />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="mr-2 cursor-pointer">
              <AiOutlineFolder
                onClick={() => {
                  setIsModalFolderOpen(true);
                }}
              />
            </div>
            <div className="mr-2 cursor-pointer">
              <AiFillFile
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
            </div>
            <div className="mr-2 cursor-pointer">
              <AiOutlineUpload />
            </div>
            <div className="mr-2 cursor-pointer">
              <AiOutlineDownload />
            </div>
          </div>
          <div className="space-y-2">
            {workspaces[selectedWorkspace]?.children.map((file) => (
              <FileItem key={file.name} {...file} />
            ))}
          </div>
        </div>
      )}
      <Modal
        label={"New File"}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={addFile("file")}
      />
      <Modal
        label={"New Folder"}
        isModalOpen={isModalFolderOpen}
        setIsModalOpen={setIsModalFolderOpen}
        handleSubmit={addFile("folder")}
      />
      <Modal
        label={"New Workspace"}
        isModalOpen={isModalWorkspaceOpen}
        setIsModalOpen={setIsModalWorkspaceOpen}
        handleSubmit={createNewWorkspace}
      />
    </div>
  );
};

const Modal = ({
  label,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
}: {
  label: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (data: string) => void;
}) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <Input
            type="text"
            placeholder="File Name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border rounded-md p-2 mb-2 w-full"
          />
          {!!error && <span className="text-red-500 text-sm">{error}</span>}
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant={"destructive"}>Cancel</Button>
            </DialogClose>
            <Button
              onClick={(e) => {
                handleSubmit(input);
                setIsModalOpen(false);
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default Workspace;
