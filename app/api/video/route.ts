import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server';
import Replicate from 'replicate'
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";



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

    const freetrial = await checkApiLimit(userId)

    if (!freetrial) {
      return new NextResponse("Free Trial Expired", { status: 403 });
    }

    const input = {
      fps: 24,
      width: 1024,
      height: 576,
      prompt: prompt,
      guidance_scale: 17.5,
      negative_prompt:
        "very blue, dust, noisy, washed out, ugly, distorted, broken",
    };

    const response = await await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      { input }
    );

    await increaseApiLimit(userId)

    return NextResponse.json(response)

  }catch(e : unknown){
    console.log("[video error]",e)
    return new NextResponse("internal error", {status : 500})
  }

}