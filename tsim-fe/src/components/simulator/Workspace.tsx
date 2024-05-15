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
import { FileItemProps, Workspace as WorkspaceType } from "./types";
import { useWorkspace } from "./Context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateNewWorkspace from "./CreateNewWorkspace";
import { DownloadIcon, UploadIcon } from "lucide-react";
import CreateNewWorkspaceFolder from "./CreateNewWorkspaceFolder";
import CreateNewWorkspaceFile from "./CreateNewWorkspaceFile";

const FileItem: React.FC<FileItemProps> = ({ name, type, children, code }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedCode } = useWorkspace();
  // const isSelected = selectedCode === code;

  const handleItemClick = () => {
    if (type === "file") {
      setSelectedCode(code || "");
    }
    setIsOpen(!isOpen);
  };

  const Icon = type === "folder" ? AiFillFolder : AiFillFile;

  return (
    <div
      className={`items-center my-1 hover:text-white cursor-pointer`}
      style={{ paddingLeft: `${type === "file" ? "20px" : "0"}` }}
      onClick={handleItemClick}
    >
      <div className="flex items-center">
        <div className="mr-2">
          {isOpen && type === "folder" ? <AiFillFolderOpen /> : <Icon />}
        </div>
        <span className="text-sm">{name}</span>
      </div>
      <div className="pl-4">
        {children &&
          isOpen &&
          children.map((child) => <FileItem key={child.name} {...child} />)}
      </div>
    </div>
  );
};

const Workspace: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { selectedWorkspace, setSelectedWorkspace, workspaces } =
    useWorkspace();

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
              onValueChange={(value) => {
                setSelectedWorkspace(
                  workspaces.findIndex((w) => w.name === value)
                );
              }}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder={workspaces[selectedWorkspace].name} />
              </SelectTrigger>
              <SelectContent>
                {workspaces.map((workspace, index) => (
                  <SelectItem
                    key={index}
                    value={workspace.name}
                    onClick={() => setSelectedWorkspace(index)}
                  >
                    {workspace.name}
                  </SelectItem>
                ))}
                <CreateNewWorkspace />
              </SelectContent>
            </Select>

            <div className="ml-2 cursor-pointer">
              <AiOutlineDelete />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <CreateNewWorkspaceFolder />
            <CreateNewWorkspaceFile />
            <div className="cursor-pointer">
              <UploadIcon className="size-4" />
            </div>
            <div className="cursor-pointer">
              <DownloadIcon className="size-4" />
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
