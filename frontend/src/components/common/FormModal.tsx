import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
};

const FormModal = ({ isOpen, closeModal, title, children }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-light-2 px-6 py-9 ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
