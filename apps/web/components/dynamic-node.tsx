"use client";

import { EllipsisVertical, Mouse, Plus } from "lucide-react";
import Actions from "./actions";
import { JSX, useState } from "react";
import { useActionFormStore } from "../stores/action-form-store";
import GmailIcon from "./icons/gamil";
import { useNodeStore } from "../stores/node-store";

export function DynamicNode({ id, data }: { id: string; data: any }) {
  const { isActionAdded, setIsActionAdded } = useActionFormStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddStepClicked, setIsAddStepClicked] = useState(false);
  const { iNodes, addNode } = useNodeStore();

  const currentNode = iNodes.find((node) => node.id === id);
  const nodeToDisplay = currentNode || { actionData: data };
  // const latestNode = iNodes[iNodes.length - 1]; // last added node

  // const [nodeData, setNodeData] = useState<{
  //   type: string;
  //   icon: JSX.Element;
  //   label: string;
  //   data: Record<string, string>;
  // }>({
  //   type: "noo value",
  //   icon: <></>,
  //   label: "noo vlaue",
  //   data: {},
  // });
  console.log("This is data from iNodes:", iNodes);

  return (
    <div className="flex flex-col items-center">
      <div className="w-xl flex items-center justify-between gap-2 rounded-lg border border-[#cfcfcf] bg-white px-4 py-6 shadow-[0_0_2px_0_rgba(48,48,48,0.20)] duration-200 hover:border hover:border-[#9e9e9e]">
        <div className="flex items-center gap-2">
          <div className="rounded-sm border border-neutral-200 p-1">
            {nodeToDisplay?.actionData.icon}
          </div>
          <span className="text-base text-neutral-700">
            {nodeToDisplay?.actionData.label}
          </span>
        </div>
        <EllipsisVertical
          size={16}
          className="cursor-pointer text-neutral-500 duration-200 hover:text-black"
        />
      </div>
      {!isAddStepClicked && (
        <>
          <div className="h-9 w-px bg-[#4461FE]"></div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mb-4 flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1 hover:bg-[#4461FE] hover:text-white"
          >
            <Plus size={16} />
            Add step
          </button>
        </>
      )}
      {isOpen && (
        <Actions
          isAddStepClicked={isActionAdded}
          setIsAddStepClicked={setIsAddStepClicked}
          // onNodeCreated={(config, formValues) => {
          //   setNodeData({
          //     type: config.nodeType,
          //     icon: config.icon,
          //     label: config.label,
          //     data: formValues,
          //   });
          //   setIsOpen(false);
          //   setIsAddStepClicked(true);
          // }}
        />
      )}
    </div>
  );
}
