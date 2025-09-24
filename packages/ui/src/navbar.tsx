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

function NavBar() {
  const [workflowName, setWorkflowName] = useState("");
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
        <Download size={16} color="#4F17DD" />
        Save
      </button>
    </div>
  );
}

export default NavBar;
