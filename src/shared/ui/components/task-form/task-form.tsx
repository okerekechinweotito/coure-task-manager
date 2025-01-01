"use client";

import useTasks, { Task } from "@/shared/hooks/useTask";
import { Button } from "@/shared/ui/base/chakra/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/shared/ui/base/chakra/dialog";
import { Field } from "@/shared/ui/base/chakra/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/shared/ui/base/chakra/native-select";
import { formSchema } from "@/shared/ui/components/task-form/model";
import { Input, Textarea, useDisclosure, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  taskId?: any;
};

type FormValues = z.infer<typeof formSchema>;

const TaskForm = ({ open, onClose, taskId }: Props) => {
  const { addTask, updateTask, getTaskById } = useTasks();
  const taskToEdit = taskId ? getTaskById(taskId) : null;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: taskToEdit || {
      title: "",
      description: "",
      dueDate: "",
      priority: "High",
      status: "Pending",
    },
  });

  const {
    open: loading,
    onOpen: onLoading,
    onClose: stopLoading,
  } = useDisclosure();

  const onSubmit = handleSubmit((data) => {
    if (taskToEdit) {
      const updatedTask: Task = {
        ...taskToEdit,
        ...data,
      };
      updateTask(taskId, updatedTask);
      onClose();
      return;
    }
    onLoading();
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const task = { ...data, id: id };
    addTask(task);
    reset();
    stopLoading();
    onClose();
  });

  return (
    <DialogRoot size={["xs", null, "lg"]} lazyMount open={open}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack gap="20px">
              <Field
                label="Title"
                invalid={!!errors.title}
                errorText={errors.title?.message}>
                <Input placeholder="Task Title" {...register("title")} />
              </Field>
              <Field
                label="Description"
                invalid={!!errors.description}
                errorText={errors.description?.message}>
                <Textarea
                  placeholder="Task Description"
                  {...register("description")}
                />
              </Field>
              <Field
                label="Due Date"
                invalid={!!errors.dueDate}
                errorText={errors.dueDate?.message}>
                <Input {...register("dueDate")} type="date" />
              </Field>

              <Field
                label="Priority"
                invalid={!!errors.priority}
                errorText={errors.priority?.message}>
                <NativeSelectRoot>
                  <NativeSelectField
                    placeholder="Priority"
                    {...register("priority")}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Field>

              <Field
                label="Status"
                invalid={!!errors.status}
                errorText={errors.status?.message}>
                <NativeSelectRoot>
                  <NativeSelectField
                    placeholder="Status"
                    {...register("status")}>
                    <option value="Pending">Pending</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Completed">Completed</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Field>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button onClick={() => onClose()} variant="outline">
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button loading={loading} type="submit">
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger onClick={() => onClose()} />
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default TaskForm;
