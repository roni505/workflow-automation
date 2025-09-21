"use client";

import { Mouse, Plus } from "lucide-react";
import Actions from "./actions";
import { useState } from "react";
import { useActionFormStore } from "../stores/action-form-store";

export function GmailNode() {
  const { isActionAdded, setIsActionAdded } = useActionFormStore();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div className="w-xl flex items-center gap-2 rounded-[8px] border border-neutral-200 bg-[#] px-4 py-6">
        <Mouse size={18} color="#2E7420" />
        <div className="text-base font-medium text-[#2E7420]">Gmail</div>
      </div>
      {isActionAdded && (
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
