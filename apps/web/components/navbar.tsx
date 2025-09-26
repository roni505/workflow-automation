"use client";

import {
  Component,
  Download,
  Folder,
  Plus,
  Waypoints,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { EdgeData, NodeData, useNodeStore } from "../stores/node-store";
import axios from "axios";
import { Edge, Node } from "@xyflow/react";

const SAVE_WORKFLOW_API: string = "http://localhost:8080/api/v0/workflow";

interface SaveWorkFlowType {
  SAVE_WORKFLOW_API: string;
  iNodes: Node[];
  iEdges: Edge[];
  workflowName: string;
}

// function to save the workflow
async function SaveWorkflow({
  SAVE_WORKFLOW_API,
  iNodes,
  iEdges,
  workflowName,
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
      console.log("This is the res from the add workflow api:", data);
    }
    return;
  } catch (error) {
    console.error("Error while fetching data", error);
    console.log("Cannot post request");
  }
}

function NavBar() {
  const [workflowName, setWorkflowName] = useState("");
  const { iNodes, iEdges, addNode, addEdge } = useNodeStore();
  return (
    <div className="flex w-full flex-1 items-center justify-between gap-2 rounded-t-xl border-b border-b-neutral-200 bg-white px-20 py-5 text-black">
      {/* <div className="relative"> */}
      {/* <Plus className="absolute left-0 top-" /> */}
      <button className="relative flex cursor-pointer items-center justify-center gap-1.5 border border-dashed border-[#4F17DD] bg-purple-50 px-4 py-2 text-sm font-medium text-neutral-600 duration-200 hover:bg-purple-200 hover:text-[#2d009e]">
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
        <Waypoints size={16} color="#4F17DD" />
        Recent workflow
      </button>
      {/* </div> */}

      <div className="flex items-center justify-center gap-2">
        <Component size={16} className="text-neutral-400" color="#4F17DD" />
        <input
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          type="text"
          placeholder="untitled workflow"
          className="outline-none"
        />
      </div>
      <button
        onClick={() =>
          SaveWorkflow({ SAVE_WORKFLOW_API, iNodes, iEdges, workflowName })
        }
        className="relative flex cursor-pointer items-center justify-center gap-1.5 border border-dashed border-[#4F17DD] bg-purple-50 px-4 py-2 text-sm font-medium text-neutral-600 duration-200 hover:bg-purple-200 hover:text-[#2d009e]"
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
        <Download size={16} color="#4F17DD" />
        Save
      </button>
    </div>
  );
}

export default NavBar;
