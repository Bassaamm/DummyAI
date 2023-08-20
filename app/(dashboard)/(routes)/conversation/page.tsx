"use client";

import Header from "../../../../components/Header";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import PricingModal from "@/components/PricingModal";
import { ModalContext } from "@/app/context/ModalContext";
import Image from "next/image";
import { Empty } from "@/components/Empty";
import { UserAvatar } from "@/components/UserAvatar";
import { AIAvatar } from "@/components/AIAvatar";
import { SubmitDataCodeAndCon } from "@/types/formTypes";
import { ChatCompletionRequestMessage } from "openai";

export default function ConversationPage() {
  const [prompts, setPrompt] = useState<ChatCompletionRequestMessage[]>([]);
  const { onOpen } = ModalContext();
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
      const res = await axios.post("/api/conversation", {
        messages: newPrompt,
      });
      setPrompt((prompts) => [...prompts, userMessage, res.data]);
      reset();
    } catch (err: any) {
      if (err?.response?.status === 403) onOpen();
    } finally {
      router.refresh();
    }
  }
  return (
    <div className="mx-auto max-w-7xl">
      <Header pageName="Conversation" description="Start chating with the AI" />
      <form
        className="mx-10 mt-6 flex flex-col gap-3 rounded-2xl border-2  px-8 py-4 focus-within:shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap items-center justify-between  px-2 md:flex-nowrap ">
          <input
            placeholder="Write the prompt here"
            {...register("promptInput", {
              required: "You can't prompt without an input :)",
            })}
            type="text"
            className={`flex-2 mr-4 w-full border-b-2 pb-2 pl-2 outline-none  default:text-[5px] default:text-gray-100 default:md:text-sm  `}
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
      <div className="mt-8 max-w-5xl  px-8 text-center  ">
        <div className="ml-4  flex flex-col-reverse gap-y-8  ">
          {prompts.length === 0 && <Empty label="Start chating " />}
          {prompts.map((message) => (
            <>
              {message.role === "user" && (
                <span
                  key={Math.random()}
                  className="flex items-center gap-5 rounded-2xl border-2 bg-black/10 px-3  py-4 text-center shadow-md"
                >
                  <UserAvatar />
                  {message.content}
                </span>
              )}
              {message.role === "assistant" && (
                <span
                  key={Math.random()}
                  className=" flex items-center gap-5  rounded-2xl  border-2 bg-black/10 px-3  py-4 shadow-md "
                >
                  <AIAvatar />
                  {message.content}
                </span>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
