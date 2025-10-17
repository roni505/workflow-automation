// import { MousePointerClick, SquareMousePointer, Webhook } from "lucide-react";
// import { useRouter } from "next/navigation";

// function AddTrigger() {
//   const router = useRouter();
//   return (
//     <div className="cursor-pointer divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-red-500 px-2 duration-200">
//       <span className="flex w-full px-4 py-2 text-sm font-medium">
//         Add a trigger
//       </span>
//       <div className="flex flex-col gap-2 py-5">
//         <div
//           onClick={() => router.push("/workflow")}
//           className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-100"
//         >
//           <div className="flex items-center gap-2">
//             <MousePointerClick size={20} />
//             <span>Manual</span>
//           </div>
//           <span className="text-sm text-neutral-500">
//             Start runs by clicking the run button
//           </span>
//         </div>
//         <div className="flex flex-col items-start gap-2 rounded-xl px-3 py-3 hover:bg-neutral-100">
//           <div className="flex items-center gap-2">
//             <Webhook size={18} />
//             <span>Webhook</span>
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
