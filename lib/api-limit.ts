import prismadb from "./prismaDb";
import { MAX_FREE_COUNTS } from "@/constant";


export const increaseApiLimit = async ( userId : string)=>{
  try{
    if(!userId){
      return;
    }
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where : {
        userId
      }
    })
    if(userApiLimit){
      await prismadb.userApiLimit.update({
        where : {userId},
        data : {
          count : userApiLimit.count + 1
        }
      })
    }else{
      await prismadb.userApiLimit.create({
        data :{
          userId,
          count : 1
        }
      })
    }
  }catch(e){
    console.log('[increase Api Error]', e)
  }
}

export const checkApiLimit = async (userId : string)=>{
  // const {userId} = await auth();

  if(!userId) return false;

  const userApiLimit = await prismadb.userApiLimit.findUnique(
    {
      where : {userId}
    }
  )

  if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS){
    return true;
  }else{
    return false;
  }
}

export const getApiLimitCount = async (userId : string) => {
  try{
    // const { userId } =  await auth();

    if(!userId){
      return 0;
    }

    const userApi  = await prismadb.userApiLimit.findUnique({where : {userId}})

    if(userApi){
      return userApi.count
    }else{
      return 0;
    }

  }catch(e){
    console.log("[server error]", e)
    return 0;
  }
}