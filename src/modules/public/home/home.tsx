"use client";

import useTasks from "@/shared/hooks/useTask";
import { containerMaxWidth } from "@/shared/lib/constants";
import FilterSelect from "@/shared/ui/components/filter-select";
import NewTaskModal from "@/shared/ui/components/new-task-modal";
import TaskCard from "@/shared/ui/components/task-card";
import {
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Stack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {
  const {
    open: isCreateTaskModal,
    onOpen: openCreateTaskModal,
    onClose: closeCreateTaskModal,
  } = useDisclosure();

  const { tasks, addTask, deleteTask, updateTask } = useTasks();

  return (
    <Container maxWidth={containerMaxWidth} paddingY={["50px", null, "100px"]}>
      <Center marginBottom={["50px", null, "80px"]}>
        <Heading size={["lg", null, "xl"]}>
          COURE TASK MANAGER APPLICATION
        </Heading>
      </Center>

      <VStack height="auto" width="full" gap={["40px", null, "60px"]}>
        <Stack direction={["column", "row", "row"]} alignItems="end">
          <FilterSelect />

          <NewTaskModal
            open={isCreateTaskModal}
            onOpen={openCreateTaskModal}
            onClose={closeCreateTaskModal}
          />
        </Stack>
        <HStack justifyContent="center" flexWrap="wrap" gap={"20px"}>
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </HStack>
      </VStack>
    </Container>
  );
}
