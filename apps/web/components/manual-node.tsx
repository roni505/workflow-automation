import { Mouse, Plus, Square } from "lucide-react";
import { useEffect, useState } from "react";
import Actions from "./actions";
import { useActionFormStore } from "../stores/action-form-store";
import axios from "axios";
import { useWorkflowIdStore } from "../stores/workflowId-store";
import { useSearchParams } from "next/navigation";
import { Angle } from "./icons/angle";
import { useTriggerStore } from "../stores/trigger-store";
import { useWebhookStore } from "../stores/webhook-store";
import { useNodeStore } from "../stores/node-store";

const triggerTexts = {
  manual: {
    header: "Execution will start when you click the start execution button",
    action: "Click to execute workflow",
  },
  webhook: {
    header:
      "Execution will start automatically when this webhook URL receives a request.",
    action: "Click to activate workflow",
  },
};

const SAVE_WORKFLOW_API: string = "http://localhost:8080/api/v0/workflow";

function executeWorkflow(workflowId: string) {
  try {
    alert("Hey");
    console.log("This is the id: ", workflowId);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not present in the localstorage");
    }
    const response = axios.post(
      `${SAVE_WORKFLOW_API}/${workflowId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error("Failed executing workflow: ", error);
  }
}

const BASE_URL = "http://localhost:8080/api/v0/webhook";

export function ManualNode() {
  const searchParas = useSearchParams();
  const workflowId = searchParas.get("id");
  const [isOpen, setIsOpen] = useState(false);
  const { setIsActionAdded } = useActionFormStore();
  const [isAddStepClicked, setIsAddStepClicked] = useState(false);
  const { savedWorkflowId } = useWorkflowIdStore();
  const { trigger, setTrigger } = useTriggerStore();
  const { webhook, setWebhook } = useWebhookStore();
  const { iNodes, addNode } = useNodeStore();

  useEffect(() => {
    if (trigger === "webhook") {
      const uuid = crypto.randomUUID();
      setWebhook(`${BASE_URL}/${uuid}`);
      // addNode()
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => {
          if (trigger === "manual") {
            if (workflowId) {
              executeWorkflow(workflowId);
            } else {
              alert("Please save the workflow first");
            }
          }
        }}
        className="w-xl group relative flex cursor-pointer flex-col items-start justify-start border border-neutral-800 bg-neutral-950 shadow-md shadow-zinc-950/5 duration-200 hover:border hover:border-neutral-600 hover:bg-neutral-950"
      >
        <Angle className="absolute left-0" />
        <Angle className="absolute right-0 top-0 rotate-90" />
        <Angle className="absolute bottom-0 right-0 -rotate-180" />
        <Angle className="absolute bottom-0 left-0 -rotate-90" />
        {/* {trigger === "manual" ? (
          <div className="w-full border-b border-b-neutral-800 px-4 py-3 text-xs font-medium text-neutral-500">
            Execution will start when you click the start exution button
          </div>
        ) : (
          <div className="w-full border-b border-b-neutral-800 px-4 py-3 text-xs font-medium text-neutral-500">
            Execution will start automatically when this webhook URL receives a
            request.
          </div>
        )} */}
        <div className="w-full border-b border-b-neutral-800 px-4 py-3 text-xs font-medium text-neutral-500">
          {trigger ? triggerTexts[trigger].header : "default text"}
        </div>

        <div className="flex w-full items-center gap-2 px-4 py-4">
          <div className="border border-neutral-800 p-1">
            <Mouse size={20} className="text-neutral-400" />
          </div>
          {trigger === "webhook" ? (
            <>
              <div className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap text-base text-neutral-300 duration-200 group-hover:text-white">
                {webhook}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(webhook)}
                className="cursor-pointer rounded-sm border border-neutral-800 bg-neutral-800 px-3.5 py-1 text-sm text-neutral-300"
              >
                Copy
              </button>
            </>
          ) : (
            <div className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap text-base text-neutral-300 duration-200 group-hover:text-white">
              Click to execute workflow
            </div>
          )}
        </div>
      </div>
      {!isAddStepClicked && (
        <>
          <div className="h-9 w-px bg-[#4F17DD]"></div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex cursor-pointer items-center justify-center gap-1.5 border border-[#2d2d2d] bg-neutral-950 px-4 py-2 text-sm font-medium text-[#c0c0c0] duration-200 hover:bg-neutral-900 hover:text-neutral-300"
          >
            <Plus
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
            />
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
