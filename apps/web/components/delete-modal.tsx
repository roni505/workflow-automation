import axios from "axios";
import { createPortal } from "react-dom";
import { useAllWorkflowStore } from "../stores/workflow-store";

type DeleteModalType = {
  //   setModalDelete: (deleteModal: boolean) => void;
  //   deleteModal: boolean;
  id: number;
  deleteWorkflow: (id: number) => void;
  onClose: () => void;
};

const DELETE_URL: string = "http://localhost:8080/api/v0/workflow/delete";

async function removeWorkflow(
  id: number,
  deleteWorkflow: any,
  onClose: () => void,
) {
  try {
    console.log("control is inside the removeWorkflowFun");

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    const response = await axios.delete(DELETE_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: id,
      },
    });
    const data = response.data;
    deleteWorkflow(id);
    onClose();
  } catch (error) {
    console.error("Cannot delete workflow, error: ", error);
  }
}

function DeleteModal({
  //   setModalDelete,
  //   deleteModal,
  id,
  deleteWorkflow,
  onClose,
}: DeleteModalType) {
  const { savedWorkflow } = useAllWorkflowStore();
  console.log("This are the saved savedWorkflow", savedWorkflow);

  return createPortal(
    <div className="backdrop-blur-xs fixed inset-0 z-20 flex items-center justify-center">
      <div className="w-md rounded-sm border border-neutral-800 bg-black p-7">
        <div className="mb-4 flex flex-col gap-3">
          <span className="text-xl text-neutral-300">Are you sure ?</span>
          <span className="text-sm text-neutral-500">
            This action will permanently delete the workflow. Once removed, all
            its data will be lost and cannot be recovered.
          </span>
        </div>
        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-sm border border-neutral-800 px-8 py-2 text-neutral-300 hover:bg-neutral-950"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              removeWorkflow(id, deleteWorkflow, onClose);
            }}
            className="cursor-pointer rounded-sm bg-red-800 px-8 py-2 text-neutral-100 transition-all duration-200 ease-in-out hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default DeleteModal;
