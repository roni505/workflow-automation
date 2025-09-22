import { Mouse, MousePointer2, Plus } from "lucide-react";
import { useState } from "react";
import Actions from "./actions";
import { useActionFormStore } from "../stores/action-form-store";

export function ManualNode() {
  const [isOpen, setIsOpen] = useState(false);
  const { isActionAdded, setIsActionAdded } = useActionFormStore();
  const [isAddStepClicked, setIsAddStepClicked] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div className="w-xl group flex cursor-pointer flex-col items-start justify-start rounded-[8px] border border-[#cfcfcf] bg-white duration-200 hover:border hover:border-[#8d60ff] hover:bg-purple-50">
        <div className="w-full rounded-t-lg border-b border-b-neutral-300 bg-[#EEF4F2] px-4 py-3 text-sm font-medium text-[#1A7020]">
          Execution will start when you click the start exution button
        </div>
        <div className="flex items-center gap-2 px-4 py-6">
          <div className="rounded-sm border border-neutral-200 p-1">
            <Mouse size={20} color="#4f17dd" />
          </div>
          <div className="text-base duration-200 group-hover:text-[#3000ab]">
            Click to execute flow
          </div>
        </div>
      </div>
      {!isAddStepClicked && (
        <>
          <div className="h-9 w-px bg-[#4461FE]"></div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mb-4 flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1 hover:bg-[#4461FE] hover:text-white"
          >
            <Plus size={16} />
            Add step
          </button>
        </>
      )}
      {isOpen && (
        <Actions
          isAddStepClicked={isActionAdded}
          setIsAddStepClicked={setIsActionAdded}
        />
      )}
    </div>
  );
}

// shadow-[0px_-2px_0px_0px_rgba(255,255,255)] bg-gradient-to-b from-[rgb(0,114,255,100)] to-[rgb(0,25,96,100)] hover:from-[rgb(0,89,198)] hover:to-[rgb(0,19,71,100)]
