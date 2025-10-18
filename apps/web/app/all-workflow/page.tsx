"use client";

import { WorkFlow } from "@repo/types/workflow";
import { useAllWorkflowStore } from "../../stores/workflow-store";
import { useState } from "react";
import TriggerBtn from "../../components/trigger-btn";
import AddTrigger from "../../components/add-trigger";

function AllWorkflows() {
  const [isOpen, setIsOpen] = useState(false);

  const { savedWorkflow } = useAllWorkflowStore();
  return (
    <div className="mx-auto flex h-screen w-full justify-center gap-4 bg-black pt-36">
      <div className="flex w-full max-w-4xl flex-col gap-3 text-white">
        <div className="flex w-full justify-between">
          <span className="text-2xl">Workflows</span>
          <TriggerBtn h="12" w="40" isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen ? <AddTrigger /> : ""}
        </div>
        <div className="flex justify-between gap-3">
          <div className="w-full rounded-sm border border-neutral-700 px-3 py-6">
            <div className="flex flex-col justify-between">Workflow name</div>
          </div>
          <div className="w-full rounded-sm border border-neutral-700 px-6 py-6">
            Workflow name
          </div>
          <div className="w-full rounded-sm border border-neutral-700 px-6 py-6">
            Workflow name
          </div>
        </div>
      </div>
      {/* {savedWorkflow.map((workflow: WorkFlow) => (
        <div className="flex items-start" key={workflow.id}>
          <div className="flex gap-3 border border-neutral-600 px-6 py-6 text-white">
            {workflow.name}
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default AllWorkflows;
