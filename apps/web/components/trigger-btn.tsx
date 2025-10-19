import { Plus } from "lucide-react";
import React from "react";

const sizeClasses = {
  small: "h-12 w-40",
  medium: "h-20 w-32",
  large: "h-24 w-40",
  // large: "h-32 w-48",
};

type SizeType = keyof typeof sizeClasses;

export default function TriggerBtn({
  isOpen,
  setIsOpen,
  size,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size: SizeType;
}) {
  return (
    <div
      className={`relative ${sizeClasses[size]} overflow-hidden bg-neutral-800 p-px`}
    >
      <div className="relative z-20 h-full w-full rounded-lg bg-black"></div>
      <div className="absolute inset-0 h-full w-full scale-[1.4] animate-spin [animation-duration:1.2s] [background-image:conic-gradient(at_center,transparent,var(--color-orange-500)_30%,transparent_30%)]"></div>
      <div className="absolute inset-0 h-full w-full scale-[1.4] animate-spin [animation-delay:0.5s] [animation-duration:1.2s] [background-image:conic-gradient(at_center,transparent,var(--color-purple-500)_30%,transparent_30%)]"></div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center gap-1.5 rounded-sm"
      >
        <Plus className="text-neutral-400" size={16} />
        <div className="text-white">Add</div>
      </div>
    </div>
  );
}

// [animation-delay:0.4s]
