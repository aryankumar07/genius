import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server';
import Replicate from 'replicate'
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';



const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(
  req : Request
){
  try{
    const { userId } = await auth()
    const body = await req.json()
    const { prompt } = body

    if(!userId){
      return new NextResponse("Unauthorized", { status : 401 })
    }

    if(!prompt){
      return new NextResponse("prompt is reequired" , { status : 500 })
    }

    const freetrial = await checkApiLimit(userId);

    if (!freetrial) {
      return new NextResponse("Free Trial Expired", { status: 403 });
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",{
        input : { prompt_b : prompt}
      }
    );

    await increaseApiLimit(userId)

    return NextResponse.json(response)

  }catch(e : unknown){
    console.log("[converstion error]",e)
    return new NextResponse("internal error", {status : 500})
  }

}