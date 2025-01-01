"use client";

import useTasks from "@/shared/hooks/useTask";
import { containerMaxWidth } from "@/shared/lib/constants";
import FilterSelect from "@/shared/ui/components/filter-select";
import TaskCard from "@/shared/ui/components/task-card";
import {
  Center,
  Container,
  For,
  Heading,
  HStack,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import TaskForm from "@/shared/ui/components/task-form/task-form";
import { Button } from "@/shared/ui/base/chakra/button";
import { MdAdd } from "react-icons/md";
import { atom, useAtom } from "jotai";

const sortedTasksAtom = atom<any[]>([]);

export default function Home() {
  const {
    open: isTaskModal,
    onOpen: openTaskModal,
    onClose: closeTaskModal,
  } = useDisclosure();

  const { tasks, filterTasks } = useTasks();
  const [sortedTasks, setSortedTasks] = useAtom(sortedTasksAtom);

  const handleTaskFilter = (filterOptions: any) => {
    const sortedTasks = filterTasks(filterOptions.parameter);
    setSortedTasks(sortedTasks);
  };

  return (
    <Container maxWidth={containerMaxWidth} paddingY={["50px", null, "100px"]}>
      <Center marginBottom={["50px", null, "80px"]}>
        <Heading size={["lg", null, "xl"]}>
          COURE TASK MANAGER APPLICATION
        </Heading>
      </Center>

      <VStack height="auto" width="full" gap={["40px", null, "60px"]}>
        <Stack direction={["column", "row", "row"]} alignItems="end">
          <FilterSelect handleTaskFilter={handleTaskFilter} />
          <Button onClick={() => openTaskModal()} width={["300px", "auto"]}>
            <MdAdd />
            New Task
          </Button>
          <TaskForm
            open={isTaskModal}
            onOpen={openTaskModal}
            onClose={closeTaskModal}
          />
        </Stack>
        <HStack justifyContent="center" flexWrap="wrap" gap={"20px"}>
          <For each={sortedTasks.length > 0 ? sortedTasks : tasks}>
            {(task) => <TaskCard key={task.id} task={task} />}
          </For>
        </HStack>
      </VStack>
    </Container>
  );
}
