import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
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
      <div className="flex items-center cursor-pointer">
        <div
          className="flex items-center"
          onClick={() => {
            if (type === "file") {
              setSelectedCode(code!);
            } else {
              isOpen ? setSelectedFolder(id - 1) : setSelectedFolder(id);
            }

            setIsOpen(!isOpen);
            setSelectedFileId(id);
            setSelectedFileName(name);
          }}
        >
          <div className="mr-2">
            {isOpen && type === "folder" ? <AiFillFolderOpen /> : <Icon />}
          </div>
          <span className="text-sm">{name}</span>
        </div>
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
  const [searchHash, setSearchHash] = useState('');
  const [code,setCode] = useState([]);
  const [importfromHash,setImportFromHash] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchHash);

    fetch(`https://sepolia.voyager.online/api/class/${searchHash}/code`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCode(data);
        setImportFromHash(true);
      })
      .catch(error => {
        console.log(error.message);
      });

    setSearchHash('');
  };

  const [isModalWorkspaceOpen, setIsModalWorkspaceOpen] = useState(false);
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    workspaces,
    createNewWorkspace,
    addFile,
    deleteWorkspace,
  } = useWorkspace();

  const value = useMemo(() => {
    return workspaces[selectedWorkspace].name;
  }, [selectedWorkspace, workspaces]);

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
              value={selectedWorkspace.toString()}
              onValueChange={(e) => {
                if (e === "new") setIsModalWorkspaceOpen(true);
                else setSelectedWorkspace(Number(e));
              }}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder={value} />
              </SelectTrigger>
              <SelectContent onChange={(e) => { }}>
                {workspaces.map((workspace, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {workspace.name}
                  </SelectItem>
                ))}
                <SelectItem
                  value="new"
                  onSelect={() => {
                    // TODO: Show a popup to create new workspace
                  }}
                >
                  - create a new workspace -
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-2 cursor-pointer">
              <AiOutlineDelete
                onClick={() => {
                  deleteWorkspace();
                }}
              />
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
      <div className="text-sm mt-7">
        Search using Class Hash Or Address
      </div>
      <div className="w-full h-20px mt-3">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={searchHash}
            placeholder="Search..."
            onChange={(e) => setSearchHash(e.target.value)}
            className="w-full h-10 p-2 text-sm border-2 border-gray-300 rounded-l-md focus:outline-none focus:w-full focus:border-blue-500 transition-all duration-300"
          />
          <button
            className="h-10 px-4 text-sm border-2 border-l-0 border-gray-300 rounded-r-md bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

//@dev should be moved into a seperate component but needs to be made more generic before doing so
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
                if (input === "") setError("Field Cannot be empty");
                else {
                  setError(null);
                  handleSubmit(input);
                  setIsModalOpen(false);
                }
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
