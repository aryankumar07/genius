import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismaDb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingUrl = absoluteUrl("/settings")

export async function GET() {
  try{
    const { userId } = await auth()
    const user = await currentUser()
    if(!userId || !user){
      return new NextResponse("Unauthorized", {status : 401});
    }

    const userSub = await prismadb.userSub.findUnique({
      where : {userId}
    });

    if(userSub && userSub.stripeCustomerId){
      const stripesession = await stripe.billingPortal.sessions.create({
        customer : userSub.stripeCustomerId,
        return_url : settingUrl
      });
      return new NextResponse(JSON.stringify({url : stripesession.url}));
    }

    const stripesession = await stripe.checkout.sessions.create({
      success_url : settingUrl,
      cancel_url : settingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email : user.emailAddresses[0].emailAddress,
      line_items : [
        {
          price_data: {
            currency : "USD",
            product_data : {
              name :"Genius Pro",
              description : "Unlimited AI generations",
            },
            unit_amount : 2000,
            recurring : {
              interval : 'month'
            }
          },
          quantity : 1
        }
      ],
      metadata : {
        userId,
      }
    });

    return new NextResponse(JSON.stringify({url : stripesession.url}))
  }catch(e){
    console.log('[stripe Error]', e)
    return new NextResponse("internal Error", {status : 500})
  }
}
