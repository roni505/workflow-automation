"use client";

import { EllipsisVertical, Plus, Square } from "lucide-react";
import Actions from "./actions";
import { useState } from "react";
import { useActionFormStore } from "../stores/action-form-store";
import { useNodeStore } from "../stores/node-store";
import { Handle, Position } from "@xyflow/react";

export function DynamicNode({ id, data }: { id: string; data: any }) {
  const { isActionAdded, setIsActionAdded } = useActionFormStore();
  const [isOpen, setIsOpen] = useState(false);
  // state that keeps in check weather action is added or not
  const [isAddStepClicked, setIsAddStepClicked] = useState(false);
  const { iNodes, addNode } = useNodeStore();

  const currentNode = iNodes.find((node) => node.id === id);
  const nodeToDisplay = currentNode || { actionData: data };

  return (
    <div className="flex flex-col items-center">
      <div className="w-xl flex items-center justify-between gap-2 border border-neutral-800 bg-neutral-950 px-4 py-3 shadow-[0_0_2px_0_rgba(48,48,48,0.20)] duration-200 hover:border hover:border-[#9e9e9e]">
        <div className="flex items-center gap-2">
          {/* <span className="px-2 text-neutral-400">1</span> */}
          <div className="border border-neutral-800 p-1">
            {nodeToDisplay?.actionData.icon}
          </div>
          <span className="text-base text-neutral-300">
            {nodeToDisplay?.actionData.label}
          </span>
        </div>
        <EllipsisVertical
          size={16}
          className="cursor-pointer text-neutral-500 duration-200 hover:text-black"
        />
        {/* <Handle type="source" position={Position.Top} id="a" />
        <Handle type="target" position={Position.Bottom} id="b" /> */}
      </div>
      {/* {!isAddStepClicked && (
        <> */}
      <div className="h-9 w-px bg-[#4F17DD]"></div>
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative mb-4 flex cursor-pointer items-center gap-2 border border-dashed border-[#4F17DD] bg-white px-3 py-1 hover:bg-[#4461FE] hover:text-white"
      >
        <Plus className="absolute -left-2 -top-2" color="#7843FF" size={13} />
        <Plus className="absolute -right-2 -top-2" color="#7843FF" size={13} />
        <Plus
          className="absolute -bottom-2 -left-2"
          color="#7843FF"
          size={13}
        />
        <Plus
          className="absolute -bottom-2 -right-2"
          color="#7843FF"
          size={13}
        />
        <Plus
          size={16}
          strokeWidth={3}
          className="text-[#4F17DD] transition-all duration-75 group-hover:text-white"
        />
        Add step
      </button> */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex cursor-pointer items-center justify-center gap-1.5 border border-[#2d2d2d] bg-neutral-950 px-4 py-2 text-sm font-medium text-[#c0c0c0] duration-200 hover:bg-neutral-900 hover:text-neutral-300"
      >
        <Plus className="absolute -left-1 -top-1 text-neutral-300" size={8} />
        <Plus className="absolute -right-1 -top-1 text-neutral-300" size={8} />
        <Plus
          className="absolute -bottom-1 -left-1 text-neutral-300"
          size={8}
        />
        <Plus
          className="absolute -bottom-1 -right-1 text-neutral-300"
          size={8}
        />
        <Plus
          size={16}
          strokeWidth={3}
          className="transition-all duration-75 group-hover:text-white"
        />
        Add node
      </button>
      {/* </>
      )} */}
      {isOpen && (
        <Actions
          isAddStepClicked={isActionAdded}
          setIsAddStepClicked={setIsAddStepClicked}
        />
      )}
    </div>
  );
}
