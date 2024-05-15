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

export default function CreateNewWorkspace() {
  const { setSelectedWorkspace, workspaces, setWorkspaces } = useWorkspace();
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceError, setNewWorkspaceError] = useState<string | null>(
    null
  );

  const closeNewWorkspaceModal = () => {
    setIsNewWorkspaceModalOpen(false);
  };

  const handleNewWorkspaceSubmit = () => {
    if (!newWorkspaceName) {
      setNewWorkspaceError("Workspace name is required");
      return;
    }

    const newWorkspace = {
      name: newWorkspaceName,
      children: [],
    };

    // Add new workspace to existing workspaces
    setWorkspaces([...workspaces, newWorkspace]);

    // Select the newly created workspace
    setSelectedWorkspace(workspaces.length);

    // Close the modal and reset input field
    setNewWorkspaceName("");
    closeNewWorkspaceModal();
  };

  return (
    <Dialog
      open={isNewWorkspaceModalOpen}
      onOpenChange={setIsNewWorkspaceModalOpen}
    >
      <DialogTrigger>
        <span className="relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm">
          Create New Workspace
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <Input
            type="text"
            placeholder="Workspace Name"
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            className="border rounded-md p-2 mb-2 w-full"
          />
          {!!newWorkspaceError && (
            <span className="text-red-500 text-sm">{newWorkspaceError}</span>
          )}
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant={"destructive"}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleNewWorkspaceSubmit}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
