import { IconType } from "react-icons";
import {
  LuSettings,
  LuFileCode,
  LuImage,
  LuLayoutDashboard,
} from "react-icons/lu";
import { BsChatRightText } from "react-icons/bs";

export const list = [
  {
    name: "Dashboard",
    icon: LuLayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
    bgColor: "bg-sky-500",
    broderColor: "border-sky-500",
  },
  ,
  {
    name: "Conversation",
    icon: BsChatRightText,
    href: "/conversation",
    color: "text-green-500",
    bgColor: "bg-green-500",
    broderColor: "border-green-500",
  },
  {
    name: "Image Generation",
    icon: LuImage,
    href: "/image",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
    broderColor: "border-yellow-500",
  },

  {
    name: "code ",
    icon: LuFileCode,
    href: "/code",
    color: "text-red-500",
    broderColor: "border-red-500",
    bgColor: "bg-red-500",
  },
  {
    name: "Settings",
    icon: LuSettings,
    href: "/settings",
    color: "text-gray-500",
    bgColor: "bg-gray-500",
    broderColor: "border-gray-500",
  },
];
