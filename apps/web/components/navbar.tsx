"use client";

import { Component, Download, Plus, Square, Waypoints } from "lucide-react";
import { useState } from "react";
import { useNodeStore } from "../stores/node-store";
import axios from "axios";
import { Edge, Node } from "@xyflow/react";
import { useWorkflowIdStore } from "../stores/workflowId-store";
import { WorkFlow } from "@repo/types/workflow";
import { useAllWorkflowStore } from "../stores/workflow-store";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const SAVE_WORKFLOW_API: string = "http://localhost:8080/api/v0/workflow";

const ALL_WORKFLOW_URL: string = "http://localhost:8080/api/v0/get-workflow";

interface SaveWorkFlowType {
  SAVE_WORKFLOW_API: string;
  iNodes: Node[];
  iEdges: Edge[];
  workflowName: string;
  setWorkflowId: (data: WorkFlow) => void;
  router: AppRouterInstance;
}

//function to get all workflow
async function getAllWorkflow(setWorkflow: (data: WorkFlow[]) => void) {
  try {
    const response = await axios.get(ALL_WORKFLOW_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    console.log("This is the res from get all workflow: ", data.data);

    if (data.data) {
      setWorkflow(data.data);
    }
  } catch (error) {
    console.error("Error fetching all workflows");
  }
}

// function to save the workflow
async function saveWorkflow({
  SAVE_WORKFLOW_API,
  iNodes,
  iEdges,
  workflowName,
  setWorkflowId,
  router,
}: SaveWorkFlowType) {
  try {
    alert("Post res has been sent");
    const res = await axios.post(
      SAVE_WORKFLOW_API,
      {
        isActive: true,
        name: workflowName || "untitled workflow",
        isArchived: false,
        iNodes,
        iEdges,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("This is the error from res:", res);

    if (res) {
      const data = await res.data;
      console.log("Data from db when saving the workflow: ", data.data.id);

      router.replace(`?id=${data.data.id}`);
      // setWorkflowId(data);
      // console.log("This is the res from the add workflow api:", data);
    }
    return;
  } catch (error) {
    console.error("Error while fetching data", error);
    console.log("Cannot post request");
  }
}

function NavBar() {
  const router = useRouter();
  const [workflowName, setWorkflowName] = useState("");
  const { iNodes, iEdges } = useNodeStore();
  const { setWorkflowId } = useWorkflowIdStore();
  const { setWorkflow } = useAllWorkflowStore();
  return (
    <div className="flex w-full flex-1 items-center justify-between gap-2 rounded-t-xl border-b border-b-neutral-800 bg-neutral-950 px-20 py-5 text-black">
      {/* <div className="relative"> */}
      {/* <Plus className="absolute left-0 top-" /> */}
      <button
        onClick={async () => {
          await getAllWorkflow(setWorkflow);
          router.push("/all-workflow");
        }}
        className="relative flex cursor-pointer items-center justify-center gap-1.5 border border-[#2d2d2d] bg-neutral-950 px-4 py-3 text-sm font-medium text-[#c0c0c0] duration-200 hover:bg-neutral-900 hover:text-neutral-300"
      >
        <Square
          className="absolute -left-1 -top-1 bg-black"
          color="#525252"
          size={10}
        />
        <Square
          className="absolute -right-1 -top-1 bg-black"
          color="#525252"
          size={10}
        />
        <Square
          className="absolute -bottom-1 -left-1 bg-black"
          color="#525252"
          size={10}
        />
        <Square
          className="absolute -bottom-1 -right-1 bg-black"
          color="#525252"
          size={10}
        />
        {/* <Plus className="absolute -left-2 -top-2" color="#7843FF" size={13} />
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
        /> */}
        <Waypoints size={16} className="text-neutral-200" />
        Recent workflow
      </button>
      {/* </div> */}

      <div className="flex items-center justify-center gap-2">
        <Component size={16} className="text-neutral-400" color="#ffffff" />
        <input
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          type="text"
          placeholder="untitled workflow"
          className="text-white outline-none"
        />
      </div>
      <button
        onClick={() =>
          saveWorkflow({
            SAVE_WORKFLOW_API,
            iNodes,
            iEdges,
            workflowName,
            setWorkflowId,
            router,
          })
        }
        className="relative flex cursor-pointer items-center justify-center gap-1.5 border border-[#2d2d2d] bg-neutral-950 px-4 py-3 text-sm font-medium text-[#c0c0c0] duration-200 hover:bg-neutral-900 hover:text-neutral-300"
      >
        {/* <Plus className="absolute -left-2 -top-2" color="#7843FF" size={13} /> */}
        <Square
          className="absolute -left-1 -top-1 bg-black"
          color="#525252"
          size={10}
        />
        <Square
          className="absolute -right-1 -top-1 bg-black"
          color="#525252"
          size={10}
        />
        <Square
          className="absolute -bottom-1 -left-1 bg-black"
          color="#525252"
          size={10}
        />
        <Square
          className="absolute -bottom-1 -right-1 bg-black"
          color="#525252"
          size={10}
        />
        <Download size={16} className="text-neutral-200" />
        Save
      </button>
    </div>
  );
}

export default NavBar;
