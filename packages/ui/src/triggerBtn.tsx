import { Plus } from "lucide-react";
import React from "react";

export default function TriggerBtn({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex cursor-pointer flex-col justify-center rounded-xl border border-[#1111] bg-[#f9f9f9] p-9 duration-200 hover:bg-neutral-100"
    >
      <div className="flex items-center gap-2">
        <Plus color="black" size={20} />
        <div className="text-black">Add trigger</div>
      </div>
    </div>
  );
}
