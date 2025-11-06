"use client";

import { useAllWorkflowStore } from "../../stores/workflow-store";
import { useEffect, useState } from "react";
import TriggerBtn from "../../components/trigger-btn";
import AddTrigger from "../../components/add-trigger";
import { Trash } from "lucide-react";
import DeleteModal from "../../components/delete-modal";
import { useRouter } from "next/navigation";

function AllWorkflows() {
  const [isOpen, setIsOpen] = useState(false);
  const [workflowIdToDelete, setWorkflowIdToDelete] = useState<number | null>();
  const { savedWorkflow, deleteWorkflow } = useAllWorkflowStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setIsAuthenticated(true);
      } else {
        router.replace("/login");
      }
    }
    console.log("This is all the saved workflow: ", savedWorkflow);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="mx-auto flex h-screen w-full justify-center gap-4 bg-black pt-36">
      <div className="flex w-full max-w-4xl flex-col gap-3 text-white">
        <div className="flex w-full justify-between">
          <span className="text-2xl">Workflows</span>
          <TriggerBtn size="small" isOpen={isOpen} setIsOpen={setIsOpen} />
          {isOpen ? <AddTrigger /> : ""}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {savedWorkflow.map((workflow) => (
            <div
              key={workflow.id}
              className="flex w-full cursor-pointer items-center justify-between rounded-sm border border-neutral-700 px-3 py-6 hover:bg-neutral-950"
            >
              <div className="flex flex-col justify-between text-sm text-neutral-400">
                {workflow.name}
              </div>
              <Trash
                size={16}
                className="cursor-pointer text-red-800"
                onClick={() => setWorkflowIdToDelete(workflow.id)}
              />
            </div>
          ))}
        </div>
      </div>
      {workflowIdToDelete && (
        <DeleteModal
          onClose={() => setWorkflowIdToDelete(null)}
          id={workflowIdToDelete}
          deleteWorkflow={deleteWorkflow}
        />
      )}
    </div>
  );
}

export default AllWorkflows;
