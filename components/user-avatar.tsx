
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const UserAvatar = async () => {
  const { userId } = await auth();

  const client = await clerkClient();

  const user = await client.users.getUser(userId!);

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user.imageUrl}/>
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
