import { Card, HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Button } from "@/shared/ui/base/chakra/button";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { Tag } from "@/shared/ui/base/chakra/tag";
import { Status } from "@/shared/ui/base/chakra/status";
import useTasks from "@/shared/hooks/useTask";
import TaskForm from "@/shared/ui/components/task-form/task-form";
import { useAtomValue } from "jotai";
import { selectedFiltersAtom } from "@/shared/ui/components/filter-select";

const TaskCard = (data: any) => {
  const selectedFilters = useAtomValue(selectedFiltersAtom);

  const {
    open: isTaskModal,
    onOpen: openTaskModal,
    onClose: closeTaskModal,
  } = useDisclosure();
  const { deleteTask } = useTasks();
  const task = data.task;

  const priorityColors: any = {
    High: "red",
    Medium: "orange",
    Low: "grey",
  };

  const statusColors: any = {
    Completed: "success",
    InProgress: "info",
    Pending: "warning",
  };

  const handleDeleteTask = (id: any) => {
    deleteTask(id);
    if (selectedFilters.length > 0) {
      window.location.reload();
    }
  };
  return (
    <Card.Root width={["300px", null, "320px"]} boxShadow="md">
      <Card.Header>
        <HStack width="full" justifyContent="space-between">
          <Tag colorPalette={priorityColors[task.priority]}>
            {task.priority}
          </Tag>
          <Text color="fg.muted" textStyle="sm">
            {task.dueDate}
          </Text>
          <Status value={statusColors[task.status]}>{task.status}</Status>
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack mb="4" gap="3">
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {task.title}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>{task.description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <TaskForm
          open={isTaskModal}
          onOpen={openTaskModal}
          onClose={closeTaskModal}
          taskId={task.id}
        />
        <Button
          onClick={() => {
            openTaskModal();
          }}
          variant="subtle"
          colorPalette="blue"
          flex="1">
          <MdEditSquare />
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteTask(task.id)}
          variant="subtle"
          colorPalette="red"
          flex="1">
          <MdDeleteForever />
          Delete
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default TaskCard;
