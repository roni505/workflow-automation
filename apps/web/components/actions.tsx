"use client";

import { Brain } from "lucide-react";
import TelegramIcon from "./icons/telegram";
import { GmailIcon } from "./icons/gamil";
import { useState } from "react";
import { createPortal } from "react-dom";
import { GmailNode } from "./gmail-node";
import { useNodeStore } from "../stores/node-store";
import { useActionFormStore } from "../stores/action-form-store";

type ModalProps = {
  onClose: () => void;
};

function Modal({ onClose }: ModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-md flex flex-col gap-5 rounded-xl border border-neutral-400 bg-white px-6 py-6 shadow-lg">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-medium">Email Action</span>
          <span className="text-sm text-neutral-600">
            Tell us who to send the email to and what it should say
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-base font-medium">
              Send to
            </label>
            <input
              type="text"
              placeholder="recipient@gmail.com"
              className="rounded-lg border border-neutral-300 px-2 py-2 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-base font-medium">
              Subject
            </label>
            <input
              placeholder="What’s this email about?"
              type="text"
              className="rounded-lg border border-neutral-300 px-2 py-2 placeholder:text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-base font-medium">
              Message
            </label>
            <textarea
              placeholder="Type your message..."
              className="h-36 rounded-lg border border-neutral-300 px-2 py-2 placeholder:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-neutral-300 px-8 py-2 hover:bg-neutral-300"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
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

export interface ActionPropsTypes {
  isActionAddedProp?: boolean;
  setIsActionAddedProp?: (value: boolean) => void;
}

function Actions({
  isActionAddedProp,
  setIsActionAddedProp,
}: ActionPropsTypes) {
  const { isActionAdded, setIsActionAdded } = useActionFormStore();
  const [isOpen, setIsOpen] = useState(false);
  const { iNodes, addNode } = useNodeStore();
  const [added, setAdded] = useState(false);
  return (
    <div>
      {!added && (
        <div className="cursor-pointer divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white px-2 duration-200">
          <span className="flex w-full px-4 py-2 text-sm font-medium">
            Add a action
          </span>
          <div className="flex flex-col gap-2 py-5">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-100"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-sm border border-neutral-200 p-1 shadow-[0px_2px_0px_0px_rgba(0,0,0,0)]">
                  <TelegramIcon />
                </div>
                <span>Telegram</span>
              </div>
              <span className="text-sm text-neutral-500">
                Start runs by clicking the run button
              </span>
            </div>
            <div className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-100">
              <div className="flex items-center justify-center gap-2">
                <div className="rounded-sm border border-neutral-200 p-1">
                  <GmailIcon />
                </div>
                <span>Gmail</span>
              </div>
              <span className="text-sm text-neutral-500">
                Start runs when by sending emails to a unique HTTP requests
              </span>
            </div>
            <div className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-100">
              <div className="flex items-center gap-2">
                <div className="rounded-sm border border-neutral-200 p-1">
                  <Brain size={18} color="#6E11B0" />
                </div>
                <span>AI Agent</span>
              </div>
              <span className="text-sm text-neutral-500">
                Start runs when by sending emails to a unique HTTP requests
              </span>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <Modal
          onClose={() => {
            addNode({
              id: "123456",
              type: "gmailNode",
              position: { x: 100, y: 300 },
              data: { value: 300 },
            });
            setIsOpen(false);
            // if (setIsActionAddedProp) {
            //   setIsActionAddedProp(!isActionAddedProp);
            // }
            setIsActionAdded(!isActionAdded);
            setAdded(!added);
          }}
        />
      )}
    </div>
  );
}

export default Actions;

// shadow-[0px_-2px_0px_0px_rgba(255,255,255)] bg-gradient-to-b from-[rgb(0,114,255,100)] to-[rgb(0,25,96,100)] hover:from-[rgb(0,89,198)] hover:to-[rgb(0,19,71,100)]
