import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { cn } from "../../lib/utils";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
  containerClassName?: string;
};

const FormModal = ({
  isOpen,
  closeModal,
  title,
  children,
  containerClassName,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        className={cn(
          "flex w-full max-w-[520px] flex-col gap-6 border-none bg-light-2 px-6 py-9",
          containerClassName
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
