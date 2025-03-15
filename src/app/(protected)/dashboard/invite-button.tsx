"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useProject from "@/hooks/use-project";
import { User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const InviteButton = () => {
  const { projectId } = useProject();
  const [open, setOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  // Set the invite link only on the client side after window is available
  useEffect(() => {
    setInviteLink(`${window.location.origin}/join/${projectId}`);
  }, [projectId]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Ask them to copy and paste this link
          </p>
          <Input
            readOnly
            className="mt-4"
            onClick={() => {
              navigator.clipboard.writeText(inviteLink);
              toast.success("Copied to clipboard");
            }}
            value={inviteLink}
          />
        </DialogContent>
      </Dialog>
      <Button onClick={() => setOpen(true)} size="sm">
        <User /> Invite Members
      </Button>
    </>
  );
};

export default InviteButton;