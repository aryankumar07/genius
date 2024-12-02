'use Client'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name : "dharmesh",
    avatar : "D",
    title : 'Software Engineer',
    description : "This is the best Application for Ai generating Code"
  },
  {
    name : "Aman pratap",
    avatar : "A",
    title : 'Software Engineer',
    description : "Great App for free"
  },
  {
    name : "Aman Verma",
    avatar : "A",
    title : 'Product Engineer',
    description : "Works best"
  },
  {
    name : "Aryan",
    avatar : "D",
    title : 'Software Engineer',
    description : "It feels much more easy to use"
  },
]

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {
          testimonials.map((item)=>(
            <Card key={item.description} className="bg-[#192339] border-none text-white" >
              <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                  <div>
                    <p className="text-lg">{item.name}</p>
                    <p className="text-zinc-400 text-sm">{item.title}</p>
                  </div>
                </CardTitle>
                <CardContent className="pt-0 px-0">
                  {item.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))
        }
      </div>
    </div>
  )
};
