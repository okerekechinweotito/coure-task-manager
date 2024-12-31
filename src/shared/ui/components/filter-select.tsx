"use client";

import { Button, createListCollection, useDisclosure } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectItemGroup,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/shared/ui/base/chakra/select";
import { MdFilterList } from "react-icons/md";

const FilterSelect = () => {
  const { open, onClose, onOpen, onToggle } = useDisclosure();
  return (
    <SelectRoot
      open={open}
      onPointerDownOutside={() => onClose()}
      positioning={{ placement: "top", flip: true }}
      collection={frameworks}
      size="md"
      width={["300px", "350px"]}
      multiple>
      <SelectTrigger onClick={() => onToggle()}>
        <SelectValueText
          fontWeight="bold"
          placeholder="Sort By Priority and Status"
        />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItemGroup key={category.group} label={category.group}>
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
        <Button>
          <MdFilterList />
          Filter
        </Button>
      </SelectContent>
    </SelectRoot>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "High", value: "High", group: "Priority" },
    { label: "Medium", value: "Medium", group: "Priority" },
    { label: "Low", value: "Low", group: "Priority" },
    {
      label: "pending",
      value: "pending",
      group: "Status",
    },
    { label: "in progress", value: "in progress", group: "Status" },
    { label: "completed", value: "completed", group: "Status" },
  ],
});

const categories = frameworks.items.reduce((acc, item) => {
  const group = acc.find((group) => group.group === item.group);
  if (group) {
    group.items.push(item);
  } else {
    acc.push({ group: item.group, items: [item] });
  }
  return acc;
}, [] as { group: string; items: (typeof frameworks)["items"] }[]);

export default FilterSelect;
