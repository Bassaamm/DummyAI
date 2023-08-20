"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Header from "../../../../components/Header";
import ReactMarkdown from "react-markdown";
import { ModalContext } from "@/app/context/ModalContext";
import { Empty } from "@/components/Empty";
import { UserAvatar } from "@/components/UserAvatar";
import { AIAvatar } from "@/components/AIAvatar";
import { SubmitDataCodeAndCon } from "@/types/formTypes";
import { ChatCompletionRequestMessage } from "openai";
export default function CodePage() {
  const { onOpen } = ModalContext();

  const [prompts, setPrompt] = useState<ChatCompletionRequestMessage[]>([]);

  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: { promptInput: "" },
  });
  const router = useRouter();
  const isLoading = formState.isSubmitting;
  const { errors } = formState;
  async function onSubmit(data: SubmitDataCodeAndCon) {
    try {
      const userMessage = {
        role: "user",
        content: data.promptInput,
      };
      const newPrompt = [...prompts, userMessage];
      console.log("herror");
      const res = await axios.post("/api/code", {
        messages: newPrompt,
      });
      setPrompt((curr) => [...curr, userMessage, res.data]);
      reset();
    } catch (err: any) {
      if (err?.response?.status === 403) onOpen();
    } finally {
      router.refresh();
    }
  }
  return (
    <div className="mx-auto max-w-7xl ">
      <Header
        pageName="Code"
        description="Let yourMate helps you with coding"
      />
      <form
        className="mx-10 mt-6 flex flex-col gap-3 rounded-2xl border-2  px-8 py-4 focus-within:shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex  flex-wrap items-center justify-between px-2 md:flex-nowrap ">
          <input
            placeholder="Write the prompt here"
            {...register("promptInput", {
              required: "You can't prompt without an input :)",
            })}
            type="text"
            className={`flex-2 mr-4 w-full border-b-2 pb-2 pl-2 outline-none  default:text-[5px] default:text-gray-100 default:md:text-sm `}
          />
          <Button
            className="mt-4 w-full md:mt-0 md:w-auto md:px-10 "
            disabled={isLoading}
          >
            Prompt
          </Button>
        </div>
        {errors?.promptInput?.message && (
          <div className="transition-all ">
            <span className="cursor-default  rounded-full  bg-red-500 px-3   py-2 text-[12px] text-gray-100 ring-red-300 transition hover:bg-red-700 md:text-base ">
              {errors?.promptInput?.message}
            </span>
          </div>
        )}
      </form>
      <div className="mt-8  text-center  ">
        <div className="m-auto mb-3 flex max-w-5xl  flex-col-reverse gap-y-8 px-12 md:mx-0  ">
          {prompts.length === 0 && <Empty label="Happy Coding !" />}
          {prompts.map((message) => (
            <>
              {message.role === "user" && (
                <span
                  key={Math.random()}
                  className="flex w-full items-center gap-10 rounded-2xl  border-2 bg-slate-100 px-3 py-4  text-center shadow-md"
                >
                  <UserAvatar />
                  {message.content}
                </span>
              )}
              {message.role === "assistant" && (
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className=" my-4  w-full max-w-xl overflow-auto rounded-xl bg-black  p-6 text-left text-white shadow-md ">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="rounded-lg bg-black p-1 px-2 text-white"
                        {...props}
                      />
                    ),
                  }}
                  className="flex w-full flex-col items-center gap-10  rounded-2xl  border-2 bg-slate-100 px-14  py-4 text-center"
                >
                  {message.content || ""}
                </ReactMarkdown>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
