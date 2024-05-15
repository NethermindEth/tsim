import { useState } from "react";
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

const FileItem: React.FC<FileItemProps> = ({
  name,
  type,
  children,
  code,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const { setSelectedCode, setSelectedFileName, setSelectedFileId } =
    useWorkspace();

  const Icon = type === "folder" ? AiFillFolder : AiFillFile;

  return (
    <div className="items-center my-1 text-gray-300 hover:text-white cursor-pointer">
      <div className="flex items-center ">
        <div
          className="mr-2"
          onClick={() => {
            if (type === "file") {
              setSelectedCode(code!);
            }
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
  const {
    selectedWorkspace,
    setSelectedWorkspace,
    workspaces,
    createNewWorkspace,
    addFile,
  } = useWorkspace();

  console.log("HEREDATA",workspaces,workspaces[selectedWorkspace])
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
            <Select>
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder={workspaces[selectedWorkspace].name} />
              </SelectTrigger>
              <SelectContent>
                {workspaces.map((workspace, index) => (
                  <SelectItem
                    key={index}
                    value={workspace.name}
                    onClick={() => {
                      setSelectedWorkspace(index);
                    }}
                  >
                    {workspace.name}
                  </SelectItem>
                ))}
                <SelectItem
                  value="new"
                  onClick={() => {
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
                  createNewWorkspace();
                }}
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="mr-2 cursor-pointer">
              <AiOutlineFolder
                onClick={() => {
                  addFile("abc", "folder");
                }}
              />
            </div>
            <div className="mr-2 cursor-pointer">
              <AiOutlineFolder />
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
    </div>
  );
};

export default Workspace;
