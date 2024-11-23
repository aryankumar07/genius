"use client"
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";


const MobileSidebar = () => {

  const [isMounted, setisMounted] = useState(false)

  useEffect(()=>{
    setisMounted(true)
  },[]);

  if(!isMounted){
    return null
  }

  return (
    <Sheet>
      <SheetTrigger suppressHydrationWarning asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'  className="p-0" >
        <Sidebar/>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;