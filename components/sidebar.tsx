"use client"
import Image from "next/image"
import Link from "next/link"
import { Montserrat } from 'next/font/google'
import { cn } from "@/lib/utils"
import { Code, ImageIcon, LayoutDashboard, MessagesSquare, Music, Settings, VideoIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react"
import FreeCounter from "./free-counter"


const montserrat = Montserrat({
  weight : "600",
  subsets : ["latin"]
})

const routes = [
  {
    label : 'DashBoard',
    icon : LayoutDashboard,
    href : '/dashboard',
    color : 'text-sky-500'
  },
  {
    label : 'Conversation',
    icon : MessagesSquare,
    href : '/conversation',
    color : 'text-voilet-500'
  },
  {
    label : 'Image Generation',
    icon : ImageIcon,
    href : '/image',
    color : 'text-pink-700'
  },
  {
    label : 'Code Generation',
    icon : Code,
    href : '/code',
    color : 'text-green-700'
  },
  {
    label : 'Video Generation',
    icon : VideoIcon,
    href : '/video',
    color : 'text-orange-700'
  },
  {
    label : 'Music Generation',
    icon : Music,
    href : '/music',
    color : 'text-emerald-700'
  },
  {
    label : 'Settings',
    icon : Settings,
    href : '/settings',
  },
]

interface SidebarProps {
  apiLimitCount : number
}


const Sidebar : React.FC<SidebarProps> = ({
  apiLimitCount
}) => {
  const pathname = usePathname()
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white ">
      <div className="px-3 py-2 flex-1">
        <Link href='/dashboard' className="flex items-center pl-3 mb-14">
        <div className="relative w-8 h-8 mr-4">
          <Image
           src={'/logo.png'}
           alt=""
           fill
          />
        </div>
        <div className={cn('text-2xl font-bold', montserrat.className)}>
          GENIUS
        </div>
        </Link>
        <div className="space-y-1">
           {
            routes.map((route)=>(
              <Link
                href={route.href}
                key={route.href}
                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-500'
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn('h-5 w-5 mr-5', route.color )}/>
                  {route.label}
                </div>
              </Link>
            ))
           }
        </div>
      </div>
      <FreeCounter apiLimitCount = {apiLimitCount} />
    </div>
  )
}

export default Sidebar