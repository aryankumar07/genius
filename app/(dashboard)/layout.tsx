import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { getApiLimitCount } from "@/lib/api-limit"
import { auth } from "@clerk/nextjs/server"

const DashBoardLayout = async ({
  children
} : {
  children : React.ReactNode
}) => {

  const { userId } = await auth()
  const apiLimitCount = await getApiLimitCount(userId!);


  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:insert-y-0 z-[80] bg-gray-900">
        <Sidebar apiLimitCount = {apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar apiLimitCount={apiLimitCount}/>
        {children}
      </main>
    </div>
  )
}

export default DashBoardLayout