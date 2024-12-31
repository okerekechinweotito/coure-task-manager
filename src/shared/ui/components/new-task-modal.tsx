"use client";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/base/chakra/dialog";
import { Field } from "@/shared/ui/base/chakra/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/shared/ui/base/chakra/native-select";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/shared/ui/base/chakra/select";
import {
  Button,
  createListCollection,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

type Props = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const NewTaskModal = ({ open, onOpen, onClose }: Props) => {
  return (
    <DialogRoot size={["xs", null, "lg"]} lazyMount open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpen()} width={["300px", "auto"]}>
          <MdAdd />
          New Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap="20px">
            <Field label="Title">
              <Input placeholder="Task Title" />
            </Field>
            <Field label="Decription">
              <Textarea placeholder="Task Description" />
            </Field>
            <Field label="Due Date">
              <Input type="datetime-local" />
            </Field>

            <NativeSelectRoot>
              <NativeSelectField placeholder="Priority">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </NativeSelectField>
            </NativeSelectRoot>

            <NativeSelectRoot>
              <NativeSelectField placeholder="Status">
                <option value="High">Pending</option>
                <option value="Medium">In Progress</option>
                <option value="Low">Completed</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button onClick={() => onClose()} variant="outline">
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={() => onClose()} />
      </DialogContent>
    </DialogRoot>
  );
};

export default NewTaskModal;
