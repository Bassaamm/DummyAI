"use client";

import Header from "../../../../components/Header";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, Fragment } from "react";
import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Image from "next/image";
import { ModalContext } from "@/app/context/ModalContext";
import { Empty } from "@/components/Empty";
import { SubmitDataImg } from "@/types/formTypes";
import { ChatCompletionRequestMessage } from "openai";
import { formSchema } from "./constants";

export default function ImagePage() {
  const [images, setImages] = useState<string[]>([]);
  const { onOpen } = ModalContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const options = [
    { value: "1", text: "1 Photo" },
    { value: "2", text: "2 Photos" },
    { value: "3", text: "3 Photos" },
    { value: "4", text: "4 Photos" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;
  const { errors } = form.formState;
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setImages([]);
    try {
      const res = await axios.post("/api/image", {
        promptInput: data.promptInput,
        imgAmount: +selectedOption.value,
      });
      console.log(res);
      const imageUrl = res.data.map((image: { url: string }) => image.url);
      setImages(imageUrl);
      form.reset();
    } catch (err: any) {
      if (err?.response?.status === 403) onOpen();
    } finally {
      router.refresh();
    }
  }
  return (
    <div className="m-auto max-w-7xl">
      <Header
        pageName="Image"
        description="AI can create the silly thoughts you might have like a cat flying in batman costume ?"
      />
      <form
        className=" mx-10   mt-6 flex flex-col   rounded-2xl  border-2 px-4 py-4 focus-within:shadow-sm"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap items-center justify-between gap-6  px-2 lg:flex-nowrap ">
          <input
            placeholder="Write the prompt here"
            {...form.register("promptInput", {
              required: "You can't prompt without an input :)",
            })}
            type="text"
            className={`flex-2 mt-4 w-full border-b-2 pb-2 pl-2 outline-none  default:text-[5px] default:text-gray-100 default:md:text-sm `}
          />
          <div className=" w-full  lg:w-96">
            <Listbox value={selectedOption} onChange={setSelectedOption}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-20 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selectedOption.text}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="x absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((image, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={image}
                      ></Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <Button
            className=" mt-0 w-full px-10 lg:w-auto  "
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
      <div className="m-auto mx-24 mt-12 h-52  ">
        <div className="  flex w-full flex-wrap  justify-center gap-8 rounded-lg border-2 px-8 py-5">
          {images.length === 0 && <Empty label="Start chating imagining" />}
          {images.map((imageUrl) => (
            <span className="cursor-pointer shadow-lg" key={Math.random()}>
              <Image
                alt="testmonail pic"
                key={Math.random()}
                onClick={() => window.open(imageUrl)}
                src={imageUrl}
                width={256}
                height={256}
                className="aspect-square overflow-hidden rounded-xl"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
