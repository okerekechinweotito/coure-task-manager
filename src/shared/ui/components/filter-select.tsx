"use client";

import {
  Button,
  Stack,
  createListCollection,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/shared/ui/base/chakra/field";
import {
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/shared/ui/base/chakra/select";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { MdFilterList } from "react-icons/md";
import { atom, useSetAtom } from "jotai";
import useTasks from "@/shared/hooks/useTask";

export const selectedFiltersAtom = atom<any[]>([]);
export const sortedTasksAtom = atom<any[] | null>(null);

const formSchema = z.object({
  parameter: z.array(
    z.enum(["Pending", "Completed", "InProgress", "High", "Medium", "Low"])
  ),
});

type FormValues = z.infer<typeof formSchema>;

const FilterSelect = () => {
  const setSortedTasks = useSetAtom(sortedTasksAtom);
  const setSelectedFilters = useSetAtom(selectedFiltersAtom);
  const { filterTasks, tasks } = useTasks();

  const { open, onClose, onToggle } = useDisclosure();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const filters = data.parameter;
    setSelectedFilters(filters); 

    if (filters.length === 0) {
      setSortedTasks(null);
    } else {
      const sortedTasks = filterTasks(filters);
      setSortedTasks(sortedTasks);
    }
    onClose();
  });

  return (
    <form id="filter-form">
      <Stack gap="4" align="flex-start">
        <Field
          invalid={!!errors.parameter}
          errorText={errors.parameter?.message}>
          <Controller
            control={control}
            name="parameter"
            render={({ field }) => (
              <SelectRoot
                open={open}
                size="md"
                width={["300px", "350px"]}
                name={field.name}
                value={field.value}
                onPointerDownOutside={() => onClose()}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={parameters}
                multiple>
                <SelectTrigger onClick={() => onToggle()}>
                  <SelectValueText
                    fontWeight="bold"
                    placeholder="Sort By Priority and/or Status"
                  />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItemGroup
                      key={category.group}
                      label={category.group}>
                      {category.items.map((item) => (
                        <SelectItem
                          fontWeight="light"
                          cursor="pointer"
                          item={item}
                          key={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectItemGroup>
                  ))}

                  <Button form="filter-form" onClick={() => onSubmit()}>
                    <MdFilterList />
                    Filter
                  </Button>
                </SelectContent>
              </SelectRoot>
            )}
          />
        </Field>
      </Stack>
    </form>
  );
};

const parameters = createListCollection({
  items: [
    { label: "High", value: "High", group: "Priority" },
    { label: "Medium", value: "Medium", group: "Priority" },
    { label: "Low", value: "Low", group: "Priority" },
    {
      label: "Pending",
      value: "Pending",
      group: "Status",
    },
    { label: "InProgress", value: "InProgress", group: "Status" },
    { label: "Completed", value: "Completed", group: "Status" },
  ],
});

const categories = parameters.items.reduce((acc, item) => {
  const group = acc.find((group) => group.group === item.group);
  if (group) {
    group.items.push(item);
  } else {
    acc.push({ group: item.group, items: [item] });
  }
  return acc;
}, [] as { group: string; items: (typeof parameters)["items"] }[]);

export default FilterSelect;
