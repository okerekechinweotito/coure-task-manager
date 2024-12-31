import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.union([
    z.date(),
    z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Due date must be a valid date string",
    }),
  ]),
  priority: z.enum(["High", "Medium", "Low"], {
    message: "Priority must be either 'High', 'Medium', or 'Low'",
  }),
  status: z.enum(["Pending", "InProgress", "Completed"], {
    message: "Status must be either 'Pending', 'InProgress', or 'Completed'",
  }),
});
