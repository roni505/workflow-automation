import { Mouse, Plus, Square } from "lucide-react";
import { useState } from "react";
import Actions from "./actions";
import { useActionFormStore } from "../stores/action-form-store";
import axios from "axios";
import { useWorkflowIdStore } from "../stores/workflowId-store";
import { useSearchParams } from "next/navigation";
import { Angle } from "./icons/angle";

const SAVE_WORKFLOW_API: string = "http://localhost:8080/api/v0/workflow";

function executeWorkflow(workflowId: string) {
  try {
    alert("Hey");
    console.log("This is the id: ", workflowId);

    const response = axios.post(`${SAVE_WORKFLOW_API}/${workflowId}`);
  } catch (error) {
    console.error("Failed executing workflow: ", error);
  }
}

export function ManualNode() {
  const searchParas = useSearchParams();
  const workflowId = searchParas.get("id");
  const [isOpen, setIsOpen] = useState(false);
  const { setIsActionAdded } = useActionFormStore();
  const [isAddStepClicked, setIsAddStepClicked] = useState(false);
  const { savedWorkflowId } = useWorkflowIdStore();
  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => {
          if (workflowId) {
            executeWorkflow(workflowId);
          } else {
            alert("Please save the workflow first");
          }
        }}
        className="w-xl group relative flex cursor-pointer flex-col items-start justify-start border border-neutral-800 bg-neutral-950 shadow-md shadow-zinc-950/5 duration-200 hover:border hover:border-[#326100] hover:bg-neutral-950"
      >
        <Angle />
        <Plus
          size={4}
          className="absolute -right-0.5 -top-0.5 bg-white text-white"
        />
        {/* <Plus
          size={4}
          className="absolute -left-0.5 -top-0.5 bg-white text-white"
        /> */}
        <Plus
          size={4}
          className="absolute -bottom-0.5 -left-0.5 bg-white text-white"
        />
        <Plus
          size={4}
          className="absolute -bottom-0.5 -right-0.5 bg-white text-white"
        />

        <div className="w-full border-b border-b-neutral-800 px-4 py-2 text-xs font-medium text-neutral-500">
          Execution will start when you click the start exution button
        </div>
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="border border-neutral-800 p-1">
            <Mouse size={20} className="text-neutral-400" />
          </div>
          <div className="text-base text-neutral-300 duration-200 group-hover:text-white">
            Click to execute flow
          </div>
        </div>
      </div>
      {!isAddStepClicked && (
        <>
          <div className="h-9 w-px bg-[#4F17DD]"></div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex cursor-pointer items-center justify-center gap-1.5 border border-[#2d2d2d] bg-neutral-950 px-4 py-2 text-sm font-medium text-[#c0c0c0] duration-200 hover:bg-neutral-900 hover:text-neutral-300"
          >
            {/* <Plus
              className="absolute -left-1 -top-1 text-neutral-300"
              size={8}
            />
            <Plus
              className="absolute -right-1 -top-1 text-neutral-300"
              size={8}
            />
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
            /> */}
            Add node
          </button>
        </>
      )}
      {isOpen && (
        <Actions
          // isAddStepClicked={isActionAdded}
          setIsAddStepClicked={setIsActionAdded}
        />
      )}
    </div>
  );
}

// shadow-[0px_-2px_0px_0px_rgba(255,255,255)] bg-gradient-to-b from-[rgb(0,114,255,100)] to-[rgb(0,25,96,100)] hover:from-[rgb(0,89,198)] hover:to-[rgb(0,19,71,100)]
