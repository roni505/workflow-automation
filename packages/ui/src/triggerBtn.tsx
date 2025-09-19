import { Plus } from "lucide-react";

export default function TriggerBtn() {
  return (
    <div className="flex flex-col justify-center rounded-xl border border-[#1111] bg-[#EFF0F2] p-9">
      <div className="flex items-center gap-2">
        <Plus color="black" size={20} />
        <div className="text-black">Add trigger</div>
      </div>
    </div>
  );
}
