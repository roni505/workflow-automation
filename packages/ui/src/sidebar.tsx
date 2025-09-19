import { Icon, LayoutDashboard } from "lucide-react";
import { FolderOpen } from "lucide-react";

export default function SideBar() {
  return (
    <div className="w-3xs flex h-screen flex-col rounded-r-2xl px-4 py-6 text-black">
      <div className="mb-7 ml-3.5 text-3xl">
        <div>LOGO</div>
      </div>
      <div className="flex flex-col gap-1">
        <SidebarBtn text="Dashboard" icon={LayoutDashboard} />
        <SidebarBtn text="My projects" icon={FolderOpen} />
      </div>
    </div>
  );
}

const SidebarBtn = ({
  text,
  icon: Icon,
}: {
  text: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-[12px] px-4 py-2 hover:bg-neutral-800">
      <Icon size={18} />
      {text}
    </div>
  );
};
