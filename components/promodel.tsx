import { useProModelStore } from "@/hooks/show-pro-model"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Check, Code, ImageIcon, MessagesSquare, Music, Video, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


const tools = [
  {
    label: "Conversation",
    icon: MessagesSquare,
    color: "text-violet-500",
    bgcolor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgcolor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgcolor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Geneartion",
    icon: Video,
    color: "text-orange-500",
    bgcolor: "bg-orange-500/10",
    href: "/video",
  },
  {
    label: "Code Geneartion",
    icon: Code,
    color: "text-reen-500",
    bgcolor: "bg-green-500/10",
    href: "/code",
  },
];

const ProModel = ()=>{

  const promodel = useProModelStore()

  return (
    <Dialog open={promodel.isOpen} onOpenChange={promodel.onClose} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade Your Genius
              <Badge className="uppercase text-sm py-1" variant='premium'>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {
              tools.map((tool)=>(
                <Card
                  key={tool.label}
                  className="p-3 border-black/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md",tool.bgcolor)}>
                      <tool.icon className={cn("w-6 h-6",tool.color)}/>
                    </div>
                    <div className="font-semibold text-sm">
                      {tool.label}
                    </div>
                  </div>
                  <Check className="text-primary w-5 h-5"/>
                </Card>
              ))
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white"/>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProModel