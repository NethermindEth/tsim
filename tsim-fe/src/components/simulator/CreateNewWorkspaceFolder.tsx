"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWorkspace } from "./Context";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FolderPlusIcon } from "lucide-react";

export default function CreateNewWorkspaceFolder() {
  const { selectedWorkspace, workspaces, setWorkspaces } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createNewFolder = (folderName: string) => {
    const updatedWorkspaces = [...workspaces];
    updatedWorkspaces[selectedWorkspace].children.push({
      name: folderName,
      type: "folder",
      children: [],
    });
    setWorkspaces(updatedWorkspaces);
  };

  const handleCreateNewFolder = () => {
    if (!folderName) {
      setError("Folder name is required");
      return;
    }

    if (folderName) {
      createNewFolder(folderName);
      setFolderName("");
      setError(null);
      closeModal();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <FolderPlusIcon className="size-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <Input
            type="text"
            placeholder="Workspace Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="border rounded-md p-2 mb-2 w-full"
          />
          {!!error && <span className="text-red-500 text-sm">{error}</span>}
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant={"destructive"}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateNewFolder}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
