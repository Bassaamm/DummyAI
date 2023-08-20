import * as z from "zod";

export const formSchema = z.object({
  promptInput: z.string().min(1, {
    message: "Photo prompt is required",
  }),
  imgAmount: z.string().min(1),
});
