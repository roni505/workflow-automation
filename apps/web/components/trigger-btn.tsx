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
      className="flex cursor-pointer flex-col justify-center border border-neutral-800 bg-black px-12 py-6 duration-200"
    >
      <div className="flex items-center gap-2">
        <Plus className="text-neutral-400" size={20} />
        <div className="text-white">Add</div>
      </div>
    </div>
  );
}
