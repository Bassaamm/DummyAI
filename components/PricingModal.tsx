import { list } from "@/app/data/dashboardList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { cn } from "@/lib/utils";
import { TiTickOutline } from "react-icons/ti";
import { Button } from "./ui/button";
import { ModalContext } from "@/app/context/ModalContext";

export default function PricingModal() {
  const { isOpen, onClose } = ModalContext();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="   bg-gray-900  py-8 ">
        <DialogHeader>
          <DialogTitle className=" m-auto rounded-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-4  py-2 text-base font-bold  text-white transition-all md:text-lg">
            Become a PRO member
          </DialogTitle>
          <DialogDescription>
            {list.map((feature) => {
              if (feature === undefined) return;
              return (
                <>
                  {feature?.name === "Settings" ||
                  feature?.name === "Dashboard" ? null : (
                    <div
                      className={cn(
                        " mt-6 flex cursor-pointer items-center justify-between gap-4  rounded-2xl border-2 p-4 text-base font-semibold md:text-lg",
                        feature.color ? feature.color : "",
                        feature?.broderColor ? feature.broderColor : "",
                        feature?.bgColor ? `hover:${feature.bgColor}` : "",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {" "}
                        <span>
                          <feature.icon />
                        </span>
                        <span>{feature.name}</span>
                      </div>
                      <div>
                        <TiTickOutline size="2rem" />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {" "}
          <Button className="mx-auto mt-4 h-12 w-[60%] rounded-xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-base font-bold text-white">
            LEVEL UP
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
