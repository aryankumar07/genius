"use client";
import Heading from "@/components/heading";
import * as z from "zod";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { Botavatar } from "@/components/botavatar";
import ReactMakdown from "react-markdown"

const CodePageBody = ({children} : {children : React.ReactNode}) => {
  const router = useRouter();

  const [message, setMessage] = useState<ChatCompletionRequestMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...message, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessage((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (e: unknown) {
      console.log(e);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate Code using prompts"
        icon={Code}
        iconColor="text-violet-700"
        bgColor="bg-violet-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How to Write an if statment in C++"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2">Generate</Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {message.length == 0 && !isLoading && (
              <div>
                <Empty label="No Conersation started" />
              </div>
            )}
            {message.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full flex items-start",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role==='user' ? children : <Botavatar/>}
                <ReactMakdown
                  components={{
                    pre : ({...props})=>(
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre  {...props}/>
                      </div>
                    ),
                    code : ({...props})=>(
                      <code className="bg-black/10 rounded-lg p-1" {...props}/>
                    ) 
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content  || "" }
                </ReactMakdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePageBody;
