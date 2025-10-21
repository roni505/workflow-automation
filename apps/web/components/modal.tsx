"use client";

import { Brain, ChevronDown, LinkIcon, Plus, Square } from "lucide-react";
import TelegramIcon from "./icons/telegram";
import { GmailIcon } from "./icons/gamil";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { EdgeData, NodeData, useNodeStore } from "../stores/node-store";
import { useActionFormStore } from "../stores/action-form-store";
import { useCredentialsStore } from "../stores/credentials-store";
import axios from "axios";
import { Credentials } from "@repo/types/workflow";
import { motion } from "motion/react";
import { randomUUID } from "crypto";

const BASE_URL = "http://localhost:8080/api/v0/webhook";

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

export const actionsData: any = {
  telegram: {
    label: "Telegram",
    description: "Start run by sending a Telegram message",
    icon: <TelegramIcon />,
    fields: ["message"],
    nodeType: "telegramNode",
    formTitle: "Telegram Action",
    formDescription: "Tell us who to send the email to and what it should say",
    credentialType: "telegramNode",
  },
  gmail: {
    label: "Gmail",
    description: "Start run by sending an email",
    icon: <GmailIcon />,
    fields: ["sendTo", "subject", "message"],
    nodeType: "gmailNode",
    formTitle: "Gmail Action",
    formDescription: "Enter the ID and the message you want to send",
    credentialType: "gmailNode",
  },
  AI_Agent: {
    label: "AI Agent",
    description: "Start runs when by sending emails to a unique HTTP requests",
    icon: <Brain size={18} color="#6E11B0" />,
    fields: ["prompt"],
    nodeType: "aiAgentNode",
    formTitle: "AI Agent Action",
    formDescription: "Enter the ID and the message you want to send",
    credentialType: "aiAgentNode",
  },
  webhook: {
    label: "Webhook Trigger",
    description:
      "Copy this link and use it in your service to trigger this workflow",
    icon: <LinkIcon size={18} color="#00A3FF" />,
    fields: [],
    nodeType: "webhookNode",
    formTitle: "Webhook",
    formDescription: "Copy this link and use to trigger the workflow",
    credentialType: "webhookNode",
  },
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

type ModalProps = {
  // this works beacuse (telegram, whatsapp, ai) all has same structure
  choosenAction: (typeof actionsData)["email"];
  onClose: (
    fromData?: Record<string, string>,
    selectedCredentialId?: string,
  ) => void;
};

type CredentialType = keyof typeof credentialsData;

async function registerWebhook(webhookURL: string) {
  try {
    const res = await axios.post(BASE_URL, {
      url: webhookURL,
    });
    console.log("Webhook registered successfully:", res.data);
  } catch (error) {
    console.error("Failed to register webhook:", error);
  }
}

async function saveNewCredential(
  formData: Record<string, string>,
  choosenAction: any,
  addCredentails: (newCredential: Credentials) => void,
) {
  alert("Control is inside saveNewCredential");
  try {
    let name;
    if (formData.email) {
      name = `${choosenAction.label} (${formData.email})`;
    } else if (formData.email) {
      name = `${choosenAction.label} (${formData.chatId})`;
    } else if (formData.email) {
      name = `${choosenAction.label} (${formData.model})`;
    }
    console.log("This is the name of the credData that we are sending: ", name);

    const res = await axios.post(
      "http://localhost:8080/api/v0/credentials",
      {
        name: formData.name,
        platform: choosenAction.credentialType,
        data: formData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await res.data;
    addCredentails(data.addedCredentails);
    console.log("New credential added: ", data);
  } catch (error) {
    console.error("Failed sending new credential data.", error);
  }
}

// Helper function to get display label for a field
const getFieldLabel = (fieldKey: string): string => {
  return fieldDefinitions[fieldKey] || fieldKey;
};

// Helper function to check if field should be textarea
const isTextareaField = (fieldKey: string): boolean => {
  return fieldKey === "message" || fieldKey === "prompt";
};

// Updated Modal Component
function Modal({ choosenAction, onClose }: ModalProps) {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const { fetchCredentails, addCredentails, credentialData } =
    useCredentialsStore();
  const [dropDown, setDropDown] = useState(false);
  const [newCredential, setNewCredential] = useState(false);
  const [credentialFormValues, setCredentialFormValues] = useState<
    Record<string, string>
  >({});
  //for webhook url
  const [webhookURL, setWebhookURL] = useState("");

  console.log(credentialData);

  // useEffect(() => {
  //   if (choosenAction.nodeType === "webhookNode") {
  //     const uuid = crypto.randomUUID();
  //     setWebhookURL(`${BASE_URL}/${uuid}`);
  //   }
  // }, []);

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleCredentialChange = (field: string, value: string) => {
    setCredentialFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const credentialType: CredentialType = choosenAction.credentialType;
  const credentialConfig = credentialsData[credentialType];
  console.log("This is the node type: ", choosenAction.nodeType);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {!newCredential ? (
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
          <div className="w-md relative flex flex-col gap-5 border border-neutral-800 bg-black px-8 py-8 shadow-lg">
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
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-medium text-neutral-300">
                {choosenAction.formTitle}
              </span>
              <span className="text-sm text-neutral-500">
                {choosenAction.formDescription}
              </span>
            </div>
            {/* //not visible if webhook choosen */}
            {choosenAction.nodeType !== "webhookNode" ? (
              <div className="flex flex-col gap-3">
                <label
                  htmlFor=""
                  className="text-base font-medium text-neutral-300"
                >
                  Credential to connect with
                </label>
                <div className="relative flex w-full">
                  <div
                    id=""
                    className="relative h-10 w-full cursor-pointer appearance-none rounded-sm border border-neutral-700 px-2"
                    onClick={() => setDropDown(!dropDown)}
                  >
                    <span className="absolute top-2 w-full text-sm text-neutral-500">
                      {credentialFormValues.selectedCredential
                        ? credentialData.find(
                            (c) =>
                              c.id === credentialFormValues.selectedCredential,
                          )?.name
                        : "Choose credentials"}
                    </span>
                    {dropDown && (
                      <div className="absolute -right-0.5 top-10 w-[calc(100%+3px)] rounded-sm border border-neutral-800 bg-black shadow-[0px_2px_12px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                        <div className="p-1">
                          {credentialData.map((cred) => {
                            return (
                              <div
                                onClick={() => {
                                  console.log(
                                    "This is the data of the credentialFormValues: ",
                                    credentialFormValues,
                                  );

                                  setCredentialFormValues({
                                    selectedCredential: cred.id,
                                  });
                                  setDropDown(false);
                                }}
                                key={cred.id}
                                className="cursor-pointer rounded-sm px-2 py-2 text-sm text-neutral-300 hover:bg-neutral-950"
                              >
                                {cred.name}
                              </div>
                            );
                          })}
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setNewCredential(!newCredential)}
                              className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm border border-neutral-700 py-2 text-sm text-neutral-300 transition-all duration-200 hover:bg-neutral-950"
                            >
                              <Plus size={16} />
                              Add New
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="absolute right-1 top-3 text-neutral-500">
                    <ChevronDown size={20} />
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 text-white">
                <p className="flex-1 truncate">{webhookURL}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(webhookURL)}
                  className="border border-neutral-800 px-3.5 py-1 text-sm"
                >
                  Copy
                </button>
              </div>
            )}
            <div className="flex flex-col gap-3">
              {choosenAction.fields.map((fieldKey: string) => (
                <div key={fieldKey} className="flex flex-col gap-1">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-neutral-300"
                  >
                    {getFieldLabel(fieldKey)}
                  </label>
                  {isTextareaField(fieldKey) ? (
                    <textarea
                      value={formValues[fieldKey] || ""}
                      placeholder="Type your message..."
                      className="h-36 rounded-sm border border-neutral-700 px-2 py-2 text-white placeholder:text-sm placeholder:text-neutral-500"
                      required
                      onChange={(e) => handleChange(fieldKey, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      value={formValues[fieldKey] || ""}
                      placeholder={
                        fieldKey === "email" || fieldKey === "sendTo"
                          ? "recipient@gmail.com"
                          : ""
                      }
                      className="rounded-sm border border-neutral-300 px-2 py-2 text-white placeholder:text-sm"
                      required
                      onChange={(e) => handleChange(fieldKey, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => onClose()}
                className="rounded-sm border border-neutral-800 px-8 py-2 text-neutral-300 hover:bg-neutral-950"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (choosenAction.nodeType === "webhookNode") {
                    registerWebhook(webhookURL);
                  }
                  onClose(formValues, credentialFormValues.selectedCredential);
                }}
                className="rounded-sm bg-neutral-900 px-8 py-2 text-neutral-200 hover:bg-neutral-800"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="border border-dashed border-neutral-800 bg-black p-2">
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
            className="w-md relative flex flex-col gap-5 border border-neutral-800 bg-black px-6 py-6 shadow-lg"
          >
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
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-medium text-neutral-300">
                Add new {credentialConfig.label} credentials
              </span>
              <span className="text-sm text-neutral-500">
                Enter details for your {credentialConfig.label} integration
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {credentialConfig.fields.map((fieldKey: string) => (
                <div key={fieldKey} className="flex flex-col gap-1">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-neutral-300"
                  >
                    {getFieldLabel(fieldKey)}
                  </label>
                  {isTextareaField(fieldKey) ? (
                    <textarea
                      value={credentialFormValues[fieldKey] || ""}
                      placeholder="Type your message..."
                      className="h-36 rounded-sm border border-neutral-300 px-2 py-2 placeholder:text-sm"
                      required
                      onChange={(e) =>
                        handleCredentialChange(fieldKey, e.target.value)
                      }
                    />
                  ) : (
                    <input
                      type={fieldKey === "appPassword" ? "password" : "text"}
                      value={credentialFormValues[fieldKey] || ""}
                      placeholder={
                        fieldKey === "email"
                          ? "your-email@gmail.com"
                          : fieldKey === "appPassword"
                            ? "Enter your app password"
                            : ""
                      }
                      className="rounded-sm border border-neutral-700 px-2 py-2 placeholder:text-sm placeholder:text-neutral-500"
                      required
                      onChange={(e) =>
                        handleCredentialChange(fieldKey, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => onClose()}
                className="rounded-sm border border-neutral-800 px-8 py-2 text-neutral-300 hover:bg-neutral-950"
              >
                Cancel
              </button>
              <button
                onClick={() => (
                  setNewCredential(!newCredential),
                  saveNewCredential(
                    credentialFormValues,
                    choosenAction,
                    addCredentails,
                  )
                )}
                className="rounded-sm bg-neutral-900 px-8 py-2 text-neutral-200 hover:bg-neutral-800"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>,
    document.body,
  );
}

export default Modal;
