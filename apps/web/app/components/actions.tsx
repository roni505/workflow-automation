"use client";

import { Brain } from "lucide-react";
import TelegramIcon from "./icons/telegram";
import { GmailIcon } from "./icons/gamil";
import { useState } from "react";

function Actions() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {isOpen ? (
        <div className="flex flex-col gap-5 rounded-xl border border-neutral-400 px-5 py-4">
          <div className="flex w-96 flex-col gap-1">
            <label htmlFor="">Send to</label>
            <input
              type="text"
              className="rounded-lg border border-neutral-400 px-2 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Subject</label>
            <input
              type="text"
              className="rounded-lg border border-neutral-400 px-2 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-base">
              Message
            </label>
            <input
              type="text"
              className="rounded-lg border border-neutral-400 px-2 py-2"
            />
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg bg-neutral-200 px-1 py-2 hover:bg-neutral-300"
          >
            Done
          </button>
        </div>
      ) : (
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
    </div>
  );
}

export default Actions;

// shadow-[0px_-2px_0px_0px_rgba(255,255,255)] bg-gradient-to-b from-[rgb(0,114,255,100)] to-[rgb(0,25,96,100)] hover:from-[rgb(0,89,198)] hover:to-[rgb(0,19,71,100)]
