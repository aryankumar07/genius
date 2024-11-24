import { Avatar, AvatarImage } from "./ui/avatar"

export const Botavatar = ()=>{
  return (
    <Avatar>
      <AvatarImage className="p-1" src={'/logo.png'}/>
    </Avatar>
  )
}