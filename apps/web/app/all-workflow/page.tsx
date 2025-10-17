"use client";

import { useAllWorkflowStore } from "../../stores/workflow-store";

function AllWorkflows() {
  const { savedWorkflow } = useAllWorkflowStore();
  return (
    <div>
      {savedWorkflow.map((workflow) => (
        <div key={workflow.id}>{workflow.name}</div>
      ))}
    </div>
  );
}

export default AllWorkflows;
