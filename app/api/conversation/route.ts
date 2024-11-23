import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

export async function POST(
  req : Request
){
  try{
    const { userId } = await auth()
    const body = await req.json()
    const { messages } = body

    if(!userId){
      return new NextResponse("Unauthorized", { status : 401 })
    }

    if(!configuration.apiKey){
      return new NextResponse("Open Api key not configured" , { status : 500 })
    }

    if(!messages){
      return new NextResponse("Message are reequired" , { status : 500 })
    }

    console.log(configuration.apiKey)

    const response = await openai.createChatCompletion({
      model : "gpt-3.5-turbo",
      messages
    })
    
    return  NextResponse.json(response.data.choices[0].message)
  }catch(e : unknown){
    console.log("[converstion error]",e)
    return new NextResponse("internal error", {status : 500})
  }

}