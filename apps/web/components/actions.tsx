"use client";

import { Brain } from "lucide-react";
import TelegramIcon from "./icons/telegram";
import { GmailIcon } from "./icons/gamil";
import { useState } from "react";
import { createPortal } from "react-dom";
import { DynamicNode } from "./dynamic-node";
import { EdgeData, NodeData, useNodeStore } from "../stores/node-store";
import { useActionFormStore } from "../stores/action-form-store";

export const actionsData: any = {
  telegram: {
    label: "Telegram",
    description: "Start run by sending a Telegram message",
    icon: <TelegramIcon />,
    feilds: ["ChatId", "Message"],
    nodeType: "telegramNode",
    formTitle: "Telegram Action",
    formDescription: "Tell us who to send the email to and what it should say",
  },
  gmail: {
    label: "Gmail",
    description: "Start run by sending an email",
    icon: <GmailIcon />,
    feilds: ["Send to", "Subject", "Message"],
    nodeType: "gmailNode",
    formTitle: "Gmail Action",
    formDescription: "Enter the ID and the message you want to send",
  },
  AI_Agent: {
    label: "AI Agent",
    description: "Start runs when by sending emails to a unique HTTP requests",
    icon: <Brain size={18} color="#6E11B0" />,
    feilds: ["Prompt", "Model"],
    nodeType: "aiAgentNode",
    formTitle: "AI Agent Action",
    formDescription: "Enter the ID and the message you want to send",
  },
};

type ModalProps = {
  // this works beacuse (telegram, whatsapp, ai) all has same structure
  choosenAction: (typeof actionsData)["email"];
  onClose: (fromData?: Record<string, string>) => void;
};

function Modal({ choosenAction, onClose }: ModalProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleChange = (field: string, vlaue: string) => {
    setFormValues((prev) => ({ ...prev, [field]: vlaue }));
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-md flex flex-col gap-5 rounded-xl border border-neutral-400 bg-white px-6 py-6 shadow-lg">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-medium">
            {choosenAction.formTitle}
          </span>
          <span className="text-sm text-neutral-600">
            {choosenAction.formDescription}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {choosenAction.feilds.map((field: any) => (
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-base font-medium">
                {field}
              </label>
              {field === "message" || field === "prompt" ? (
                <textarea
                  value={formValues[field] || ""}
                  placeholder="Type your message..."
                  className="h-36 rounded-lg border border-neutral-300 px-2 py-2 placeholder:text-sm"
                  required
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  value={formValues[field] || ""}
                  placeholder="recipient@gmail.com"
                  className="rounded-lg border border-neutral-300 px-2 py-2 placeholder:text-sm"
                  required
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={() => onClose()}
            className="rounded-lg border border-neutral-300 px-8 py-2 hover:bg-neutral-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onClose(formValues)}
            className="rounded-lg bg-neutral-200 px-8 py-2 hover:bg-neutral-300"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export interface AddStepClicked {
  onNodeCreated?: (config: any, formValues: { [key: string]: string }) => void;

  isAddStepClicked?: boolean;
  setIsAddStepClicked: (value: boolean) => void;
}

function Actions({
  isAddStepClicked,
  setIsAddStepClicked,
  onNodeCreated,
}: AddStepClicked) {
  const { isActionAdded, setIsActionAdded } = useActionFormStore();
  const [isOpen, setIsOpen] = useState(false);
  // store that contains the data of node and edges
  const { iNodes, iEdges, addNode, addEdge } = useNodeStore();
  const [added, setAdded] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  return (
    <div>
      {!added && (
        <div className="cursor-pointer divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white px-2 duration-200">
          <span className="flex w-full px-4 py-2 text-sm font-medium">
            Add a action
          </span>
          <div className="flex flex-col gap-2 py-5">
            {Object.keys(actionsData).map((key) => {
              const action = actionsData[key];
              return (
                <div
                  key={key}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setIsAddStepClicked(!isAddStepClicked);
                    setSelectedAction(key);
                    setAdded(!added);
                  }}
                  className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-sm border border-neutral-200 p-1 shadow-[0px_2px_0px_0px_rgba(0,0,0,0)]">
                      {action.icon}
                    </div>
                    <span>{action.label}</span>
                  </div>
                  <span className="text-sm text-neutral-500">
                    {action.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isOpen && (
        <Modal
          choosenAction={actionsData[selectedAction]}
          onClose={(formData) => {
            if (!formData) {
              return;
            }

            const actionData = actionsData[selectedAction];
            const newNode: NodeData<Record<string, string>> = {
              id: crypto.randomUUID(),
              type: "dynamicNode",
              position: { x: 0, y: iNodes.length * 100 + 20 },
              data: formData,
              actionData: actionData,
            };

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
    </div>
  );
}

export default Actions;

// shadow-[0px_-2px_0px_0px_rgba(255,255,255)] bg-gradient-to-b from-[rgb(0,114,255,100)] to-[rgb(0,25,96,100)] hover:from-[rgb(0,89,198)] hover:to-[rgb(0,19,71,100)]
