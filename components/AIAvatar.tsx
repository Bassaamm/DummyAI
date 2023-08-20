import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function AIAvatar() {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage className="rounded-full" src="/download.png" />
    </Avatar>
  );
}
