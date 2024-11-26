import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "./mobile-sidebar"
import React from "react"

interface NavbarProps {
  apiLimitCount : number
}

const Navbar : React.FC<NavbarProps> = ({
  apiLimitCount
})=>{
  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount}/>
      <div className="flex w-full justify-end">
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  )
}

export default Navbar