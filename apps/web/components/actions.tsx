"use client";

import { Brain, ChevronDown, LinkIcon, Plus, Square } from "lucide-react";
import TelegramIcon from "./icons/telegram";
import { GmailIcon } from "./icons/gamil";
import { useState } from "react";
import { createPortal } from "react-dom";
import { EdgeData, NodeData, useNodeStore } from "../stores/node-store";
import { useActionFormStore } from "../stores/action-form-store";
import { useCredentialsStore } from "../stores/credentials-store";
import axios from "axios";
import { Credentials } from "@repo/types/workflow";
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

// export const actionsData: any = {
//   telegram: {
//     label: "Telegram",
//     description: "Start run by sending a Telegram message",
//     icon: <TelegramIcon />,
//     fields: ["message"],
//     nodeType: "telegramNode",
//     formTitle: "Telegram Action",
//     formDescription: "Tell us who to send the email to and what it should say",
//     credentialType: "telegramNode",
//   },
//   gmail: {
//     label: "Gmail",
//     description: "Start run by sending an email",
//     icon: <GmailIcon />,
//     fields: ["sendTo", "subject", "message"],
//     nodeType: "gmailNode",
//     formTitle: "Gmail Action",
//     formDescription: "Enter the ID and the message you want to send",
//     credentialType: "gmailNode",
//   },
//   AI_Agent: {
//     label: "AI Agent",
//     description: "Start runs when by sending emails to a unique HTTP requests",
//     icon: <Brain size={18} color="#6E11B0" />,
//     fields: ["prompt"],
//     nodeType: "aiAgentNode",
//     formTitle: "AI Agent Action",
//     formDescription: "Enter the ID and the message you want to send",
//     credentialType: "aiAgentNode",
//   },
//   webhook: {
//     label: "Webhook Trigger",
//     description: "Triggers workflow when an external system hits this webhook",
//     icon: <LinkIcon size={18} color="#00A3FF" />,
//     fields: ["method", "path"], // path/UUID will be generated dynamically
//     nodeType: "webhookNode",
//     formTitle: "Webhook Trigger",
//     formDescription:
//       "Configure the HTTP method, optional secret, and copyable URL",
//     credentialType: "webhookNode",
//   },
// };

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

// type CredentialType = keyof typeof credentialsData;

// async function saveNewCredential(
//   formData: Record<string, string>,
//   choosenAction: any,
//   addCredentails: (newCredential: Credentials) => void,
// ) {
//   try {
//     let name;
//     if (formData.email) {
//       name = `${choosenAction.label} (${formData.email})`;
//     } else if (formData.email) {
//       name = `${choosenAction.label} (${formData.chatId})`;
//     } else if (formData.email) {
//       name = `${choosenAction.label} (${formData.model})`;
//     }
//     console.log("This is the name of the credData that we are sending: ", name);

//     const res = await axios.post(
//       "http://localhost:8080/api/v0/credentials",
//       {
//         name: formData.name,
//         platform: choosenAction.credentialType,
//         data: formData,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//     const data = await res.data;
//     addCredentails(data.addedCredentails);
//     console.log("New credential added: ", data);
//   } catch (error) {
//     console.error("Failed sending new credential data.", error);
//   }
// }

// // Helper function to get display label for a field
// const getFieldLabel = (fieldKey: string): string => {
//   return fieldDefinitions[fieldKey] || fieldKey;
// };

// // Helper function to check if field should be textarea
// const isTextareaField = (fieldKey: string): boolean => {
//   return fieldKey === "message" || fieldKey === "prompt";
// };

// Updated Modal Component
// function Modal({ choosenAction, onClose }: ModalProps) {
//   const [formValues, setFormValues] = useState<Record<string, string>>({});
//   const { fetchCredentails, addCredentails, credentialData } =
//     useCredentialsStore();
//   const [dropDown, setDropDown] = useState(false);
//   const [newCredential, setNewCredential] = useState(false);
//   const [credentialFormValues, setCredentialFormValues] = useState<
//     Record<string, string>
//   >({});

//   console.log(credentialData);

//   const handleChange = (field: string, value: string) => {
//     setFormValues((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleCredentialChange = (field: string, value: string) => {
//     setCredentialFormValues((prev) => ({ ...prev, [field]: value }));
//   };

//   const credentialType: CredentialType = choosenAction.credentialType;
//   const credentialConfig = credentialsData[credentialType];

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//       {!newCredential ? (
//         <motion.div
//           initial={{
//             opacity: 0,
//             filter: "blur(20px)",
//           }}
//           whileInView={{
//             opacity: 1,
//             filter: "blur(0px)",
//           }}
//           transition={{
//             duration: 0.3,
//             ease: "easeInOut",
//           }}
//           className="border border-dashed border-neutral-800 bg-black p-2"
//         >
//           <div className="w-md relative flex flex-col gap-5 border border-neutral-800 bg-black px-8 py-8 shadow-lg">
//             <Square
//               size={8}
//               className="absolute -right-2 -top-2 bg-neutral-600"
//             />
//             <Square
//               size={8}
//               className="absolute -left-2 -top-2 bg-neutral-600"
//             />
//             <Square
//               size={8}
//               className="absolute -bottom-2 -right-2 bg-neutral-600"
//             />
//             <Square
//               size={8}
//               className="absolute -bottom-2 -left-2 bg-neutral-600"
//             />
//             <div className="flex flex-col gap-2">
//               <span className="text-2xl font-medium text-neutral-300">
//                 {choosenAction.formTitle}
//               </span>
//               <span className="text-sm text-neutral-500">
//                 {choosenAction.formDescription}
//               </span>
//             </div>
//             <div className="flex flex-col gap-3">
//               <label
//                 htmlFor=""
//                 className="text-base font-medium text-neutral-300"
//               >
//                 Credential to connect with
//               </label>
//               <div className="relative flex w-full">
//                 <div
//                   id=""
//                   className="relative h-10 w-full cursor-pointer appearance-none rounded-sm border border-neutral-700 px-2"
//                   onClick={() => setDropDown(!dropDown)}
//                 >
//                   <span className="absolute top-2 w-full text-sm text-neutral-500">
//                     {credentialFormValues.selectedCredential
//                       ? credentialData.find(
//                           (c) =>
//                             c.id === credentialFormValues.selectedCredential,
//                         )?.name
//                       : "Choose credentials"}
//                   </span>
//                   {dropDown && (
//                     <div className="absolute -right-0.5 top-10 w-[calc(100%+3px)] rounded-sm border border-neutral-800 bg-black shadow-[0px_2px_12px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
//                       <div className="p-1">
//                         {credentialData.map((cred) => {
//                           return (
//                             <div
//                               onClick={() => {
//                                 console.log(
//                                   "This is the data of the credentialFormValues: ",
//                                   credentialFormValues,
//                                 );

//                                 setCredentialFormValues({
//                                   selectedCredential: cred.id,
//                                 });
//                                 setDropDown(false);
//                               }}
//                               key={cred.id}
//                               className="cursor-pointer rounded-sm px-2 py-2 text-sm text-neutral-300 hover:bg-neutral-950"
//                             >
//                               {cred.name}
//                             </div>
//                           );
//                         })}
//                         <div className="flex items-center justify-center gap-2">
//                           <button
//                             onClick={() => setNewCredential(!newCredential)}
//                             className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-sm border border-neutral-700 py-2 text-sm text-neutral-300 transition-all duration-200 hover:bg-neutral-950"
//                           >
//                             <Plus size={16} />
//                             Add New
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <span className="absolute right-1 top-3 text-neutral-500">
//                   <ChevronDown size={20} />
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col gap-3">
//               {choosenAction.fields.map((fieldKey: string) => (
//                 <div key={fieldKey} className="flex flex-col gap-1">
//                   <label
//                     htmlFor=""
//                     className="text-base font-medium text-neutral-300"
//                   >
//                     {getFieldLabel(fieldKey)}
//                   </label>
//                   {isTextareaField(fieldKey) ? (
//                     <textarea
//                       value={formValues[fieldKey] || ""}
//                       placeholder="Type your message..."
//                       className="h-36 rounded-sm border border-neutral-700 px-2 py-2 text-white placeholder:text-sm placeholder:text-neutral-500"
//                       required
//                       onChange={(e) => handleChange(fieldKey, e.target.value)}
//                     />
//                   ) : (
//                     <input
//                       type="text"
//                       value={formValues[fieldKey] || ""}
//                       placeholder={
//                         fieldKey === "email" || fieldKey === "sendTo"
//                           ? "recipient@gmail.com"
//                           : ""
//                       }
//                       className="rounded-sm border border-neutral-300 px-2 py-2 text-white placeholder:text-sm"
//                       required
//                       onChange={(e) => handleChange(fieldKey, e.target.value)}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end gap-3 pt-3">
//               <button
//                 onClick={() => onClose()}
//                 className="rounded-sm border border-neutral-800 px-8 py-2 text-neutral-300 hover:bg-neutral-950"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() =>
//                   onClose(formValues, credentialFormValues.selectedCredential)
//                 }
//                 className="rounded-sm bg-neutral-900 px-8 py-2 text-neutral-200 hover:bg-neutral-800"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       ) : (
//         <div className="border border-dashed border-neutral-800 bg-black p-2">
//           <motion.div
//             initial={{
//               opacity: 0,
//               filter: "blur(20px)",
//             }}
//             whileInView={{
//               opacity: 1,
//               filter: "blur(0px)",
//             }}
//             transition={{
//               duration: 0.3,
//               ease: "easeInOut",
//             }}
//             className="w-md relative flex flex-col gap-5 border border-neutral-800 bg-black px-6 py-6 shadow-lg"
//           >
//             <Square
//               size={8}
//               className="absolute -right-2 -top-2 bg-neutral-600"
//             />
//             <Square
//               size={8}
//               className="absolute -left-2 -top-2 bg-neutral-600"
//             />
//             <Square
//               size={8}
//               className="absolute -bottom-2 -right-2 bg-neutral-600"
//             />
//             <Square
//               size={8}
//               className="absolute -bottom-2 -left-2 bg-neutral-600"
//             />
//             <div className="flex flex-col gap-2">
//               <span className="text-2xl font-medium text-neutral-300">
//                 Add new {credentialConfig.label} credentials
//               </span>
//               <span className="text-sm text-neutral-500">
//                 Enter details for your {credentialConfig.label} integration
//               </span>
//             </div>
//             <div className="flex flex-col gap-3">
//               {credentialConfig.fields.map((fieldKey: string) => (
//                 <div key={fieldKey} className="flex flex-col gap-1">
//                   <label
//                     htmlFor=""
//                     className="text-base font-medium text-neutral-300"
//                   >
//                     {getFieldLabel(fieldKey)}
//                   </label>
//                   {isTextareaField(fieldKey) ? (
//                     <textarea
//                       value={credentialFormValues[fieldKey] || ""}
//                       placeholder="Type your message..."
//                       className="h-36 rounded-sm border border-neutral-300 px-2 py-2 placeholder:text-sm"
//                       required
//                       onChange={(e) =>
//                         handleCredentialChange(fieldKey, e.target.value)
//                       }
//                     />
//                   ) : (
//                     <input
//                       type={fieldKey === "appPassword" ? "password" : "text"}
//                       value={credentialFormValues[fieldKey] || ""}
//                       placeholder={
//                         fieldKey === "email"
//                           ? "your-email@gmail.com"
//                           : fieldKey === "appPassword"
//                             ? "Enter your app password"
//                             : ""
//                       }
//                       className="rounded-sm border border-neutral-700 px-2 py-2 placeholder:text-sm placeholder:text-neutral-500"
//                       required
//                       onChange={(e) =>
//                         handleCredentialChange(fieldKey, e.target.value)
//                       }
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end gap-3 pt-3">
//               <button
//                 onClick={() => onClose()}
//                 className="rounded-sm border border-neutral-800 px-8 py-2 text-neutral-300 hover:bg-neutral-950"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => (
//                   setNewCredential(!newCredential),
//                   saveNewCredential(
//                     credentialFormValues,
//                     choosenAction,
//                     addCredentails,
//                   )
//                 )}
//                 className="rounded-sm bg-neutral-900 px-8 py-2 text-neutral-200 hover:bg-neutral-800"
//               >
//                 Done
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>,
//     document.body,
//   );
// }

export interface AddStepClicked {
  onNodeCreated?: (config: any, formValues: { [key: string]: string }) => void;

  isAddStepClicked?: boolean;
  setIsAddStepClicked?: (value: boolean) => void;
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

  return createPortal(
    <div>
      {!added && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
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
