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
import { FilePlusIcon } from "lucide-react";

export default function CreateNewWorkspaceFile() {
  const { selectedWorkspace, workspaces, setWorkspaces } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createNewFile = (fileName: string) => {
    const updatedWorkspaces = [...workspaces];
    updatedWorkspaces[selectedWorkspace].children.push({
      name: fileName,
      type: "file",
      code: "",
    });
    setWorkspaces(updatedWorkspaces);
  };

  const handleCreateNewFile = () => {
    if (!fileName) {
      setError("File name is required");
      return;
    }

    if (fileName) {
      createNewFile(fileName);
      setFileName("");
      setError(null);
      closeModal();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <FilePlusIcon className="size-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New File</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <Input
            type="text"
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="border rounded-md p-2 mb-2 w-full"
          />
          {!!error && <span className="text-red-500 text-sm">{error}</span>}
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant={"destructive"}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateNewFile}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
