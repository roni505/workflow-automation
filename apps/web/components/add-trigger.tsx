"use client";

import { MousePointerClick, Square, Webhook } from "lucide-react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { useState } from "react";
import Modal from "./modal";
import { actionsData } from "./modal";
import { useTriggerStore } from "../stores/trigger-store";

function AddTrigger() {
  const { trigger, setTrigger } = useTriggerStore();
  const [openModal, setOpenmodal] = useState(false);
  const router = useRouter();
  return createPortal(
    <div className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/70 px-2 duration-200">
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(20px)",
        }}
        whileInView={{
          opacity: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="border border-dashed border-neutral-800 bg-black p-2"
      >
        <div className="w-md relative divide-y divide-neutral-800 border border-neutral-800">
          <Square
            size={8}
            className="absolute -right-2 -top-2 bg-neutral-600"
          />
          <Square size={8} className="absolute -left-2 -top-2 bg-neutral-600" />
          <Square
            size={8}
            className="absolute -bottom-2 -right-2 bg-neutral-600"
          />
          <Square
            size={8}
            className="absolute -bottom-2 -left-2 bg-neutral-600"
          />
          <span className="flex w-full px-4 py-2 text-sm font-medium text-neutral-400">
            Add a trigger
          </span>
          <div className="flex flex-col gap-2 bg-black py-5">
            <div
              onClick={() => {
                router.push("/workflow");
                setTrigger("manual");
              }}
              className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-950"
            >
              <div className="flex items-center gap-2">
                <MousePointerClick size={20} className="text-white" />
                <span className="text-white">Manual</span>
              </div>
              <span className="text-sm text-neutral-500">
                Start runs by clicking the run button
              </span>
            </div>
            <div
              onClick={() => {
                router.push("/workflow");
                setTrigger("webhook");
                // alert(`Trigger clicked now ${trigger} `);
              }}
              className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-950"
            >
              <div className="flex items-center gap-2">
                <Webhook size={18} className="text-white" />
                <span className="text-white">Webhook</span>
              </div>
              <span className="text-sm text-neutral-500">
                Start runs when by sending emails to a unique HTTP requests
              </span>
            </div>
            {openModal && (
              <Modal
                choosenAction={actionsData["webhook"]}
                onClose={() => {
                  router.push("/workflow");
                }}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

export default AddTrigger;

// import { MousePointerClick, Webhook } from "lucide-react";
// import { useRouter } from "next/navigation";

// function AddTrigger() {
//   const router = useRouter();
//   return (
//     <div className="cursor-pointer divide-y divide-neutral-800 border border-neutral-800 px-2 duration-200">
//       <span className="flex w-full px-4 py-2 text-sm font-medium text-neutral-400">
//         Add a trigger
//       </span>
//       <div className="flex flex-col gap-2 py-5">
//         <div
//           onClick={() => router.push("/workflow")}
//           className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-950"
//         >
//           <div className="flex items-center gap-2">
//             <MousePointerClick size={20} className="text-white" />
//             <span className="text-white">Manual</span>
//           </div>
//           <span className="text-sm text-neutral-500">
//             Start runs by clicking the run button
//           </span>
//         </div>
//         <div className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-950">
//           <div className="flex items-center gap-2">
//             <Webhook size={18} className="text-white" />
//             <span className="text-white">Webhook</span>
//           </div>
//           <span className="text-sm text-neutral-500">
//             Start runs when by sending emails to a unique HTTP requests
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddTrigger;
