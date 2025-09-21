import { Mouse, MousePointer2, Plus } from "lucide-react";
import { useState } from "react";
import Actions from "./actions";
import { useActionFormStore } from "../stores/action-form-store";

export function ManualNode() {
  const [isOpen, setIsOpen] = useState(false);
  const { isActionAdded, setIsActionAdded } = useActionFormStore();

  return (
    <div className="flex flex-col items-center">
      <div className="w-xl flex items-center gap-2 rounded-[8px] border border-neutral-200 bg-[#EEF4F2] px-4 py-6">
        <Mouse size={18} color="#2E7420" />
        <div className="text-base font-medium text-[#2E7420]">
          Click to start flow manually
        </div>
      </div>
      {!isActionAdded && (
        <>
          <div className="h-9 w-px bg-neutral-200"></div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mb-4 flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1"
          >
            <Plus size={16} />
            Add step
          </button>
        </>
      )}
      {isOpen && <Actions />}
    </div>
  );
}

// shadow-[0px_-2px_0px_0px_rgba(255,255,255)] bg-gradient-to-b from-[rgb(0,114,255,100)] to-[rgb(0,25,96,100)] hover:from-[rgb(0,89,198)] hover:to-[rgb(0,19,71,100)]
