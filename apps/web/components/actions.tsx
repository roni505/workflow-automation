"use client";

import { Square } from "lucide-react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EdgeData, NodeData, useNodeStore } from "../stores/node-store";
import { useActionFormStore } from "../stores/action-form-store";
import { motion } from "motion/react";
import Modal from "./modal";
import { actionsData } from "./modal";

export const fieldDefinitions: Record<string, string> = {
  // Telegram fields
  chatId: "Chat ID",
  botToken: "Bot Token",

  // Gmail fields
  email: "Email",
  appPassword: "App Password",
  sendTo: "Send to",
  subject: "Subject",

  // AI Agent fields
  apiKey: "API Key",
  model: "Model",
  prompt: "Prompt",

  // Common fields
  message: "Message",
};

export const credentialsData = {
  telegramNode: {
    label: "Telegram",
    fields: ["name", "botToken", "chatId"],
  },
  gmailNode: {
    label: "Gmail",
    fields: ["name", "email", "appPassword"],
  },
  aiAgentNode: {
    label: "AI Agent",
    fields: ["name", "apiKey", "model"],
  },
};

export interface AddStepClicked {
  onNodeCreated?: (config: any, formValues: { [key: string]: string }) => void;
  isAddStepClicked?: boolean;
  setIsAddStepClicked?: (value: boolean) => void;
  modalClose?: (state: boolean) => void;
}

function Actions({
  isAddStepClicked,
  setIsAddStepClicked,
  modalClose,
}: AddStepClicked) {
  const { isActionAdded, setIsActionAdded } = useActionFormStore();
  const [isOpen, setIsOpen] = useState(false);
  // store that contains the data of node and edges
  const { iNodes, iEdges, addNode, addEdge } = useNodeStore();
  const [added, setAdded] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const innerModalRef = useRef<HTMLDivElement>(null);

  const handleOnClickOuter = (e: HTMLDivElement) => {
    const element = e;

    if (element === modalRef.current) {
      // alert("hey i have been clicked");
      // if (modalClose) {
      //   modalClose(!isOpen);
      // }
      // setIsOpen(!isOpen);
      // if (setIsAddStepClicked) {
      //   setIsAddStepClicked(!isAddStepClicked);
      // }
      // setSelectedAction(key);
      // setAdded(!added);
    }
  };

  return createPortal(
    <div>
      {!added && (
        <div
          ref={modalRef}
          onClick={(e) => handleOnClickOuter(e.currentTarget)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <motion.div
            ref={innerModalRef}
            onClick={(e) => e.stopPropagation()}
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
            <div className="w-md relative cursor-pointer divide-y divide-neutral-800 border border-neutral-800 bg-black px-2 duration-200">
              <Square
                size={8}
                className="absolute -right-2 -top-2 bg-neutral-600"
              />
              <Square
                size={8}
                className="absolute -left-2 -top-2 bg-neutral-600"
              />
              <Square
                size={8}
                className="absolute -bottom-2 -right-2 bg-neutral-600"
              />
              <Square
                size={8}
                className="absolute -bottom-2 -left-2 bg-neutral-600"
              />
              <span className="flex w-full px-4 py-2 text-sm font-medium text-neutral-400">
                Add a action
              </span>
              <div className="flex flex-col gap-2 py-5">
                {Object.keys(actionsData)
                  .filter((key) =>
                    ["telegram", "gmail", "AI_Agent"].includes(key),
                  )
                  .map((key) => {
                    const action = actionsData[key];
                    return (
                      <div
                        key={key}
                        onClick={() => {
                          setIsOpen(!isOpen);
                          if (setIsAddStepClicked) {
                            setIsAddStepClicked(!isAddStepClicked);
                          }
                          setSelectedAction(key);
                          setAdded(!added);
                        }}
                        className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-950"
                      >
                        <div className="flex items-center gap-2">
                          <div className="border border-neutral-800 p-1 shadow-[0px_2px_0px_0px_rgba(0,0,0,0)]">
                            {action.icon}
                          </div>
                          <span className="text-neutral-300">
                            {action.label}
                          </span>
                        </div>
                        <span className="text-sm text-neutral-500">
                          {action.description}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {isOpen && (
        <Modal
          modalClose={setIsOpen}
          choosenAction={actionsData[selectedAction]}
          onClose={(formData, selectedCredentialId) => {
            // return if any of the values are missing
            if (!formData || !selectedCredentialId) {
              return;
            }

            const actionData = actionsData[selectedAction];

            // Account for manual node position + its height + desired spacing
            const manualNodeHeight = 44; // Approximate height of the manual node
            const desiredSpacing = 82; // Consistent spacing you want between all nodes
            const dynamicNodeCount = iNodes.filter(
              (node) => node.type === "dynamicNode",
            ).length;

            const newNode: NodeData<Record<string, string>> = {
              id: crypto.randomUUID(),
              type: "dynamicNode",
              position: {
                x: 0,
                y: manualNodeHeight + (dynamicNodeCount + 1) * desiredSpacing,
              },
              data: formData,
              actionData: actionData,
              credentialId: selectedCredentialId,
            };

            console.log("This is the form data: ", formData);

            addNode(newNode);

            const currentNode: any = iNodes[iNodes.length - 1];

            const newEdge: EdgeData = {
              id: crypto.randomUUID(),
              source: currentNode.id,
              sourceHandle: "a", // must match Handle id on source
              target: newNode.id,
              targetHandle: "b",
              type: "smoothstep",
            };

            addEdge(newEdge);
            // console.log("This is the edge data:", newEdge);
            console.log("This is the data of edges:", iEdges);
            // console.log("This is the iNode data:", iNodes);
            // console.log("This is the data of the new node:", newNode);

            setIsOpen(false);

            setIsActionAdded(!isActionAdded);
          }}
        />
      )}
    </div>,
    document.body,
  );
}

export default Actions;

// shadow-[0px_-2px_0px_0px_rgba(255,255,255)] bg-gradient-to-b from-[rgb(0,114,255,100)] to-[rgb(0,25,96,100)] hover:from-[rgb(0,89,198)] hover:to-[rgb(0,19,71,100)]
