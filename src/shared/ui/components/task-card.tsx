import { Card, HStack, Stack, Strong, Text } from "@chakra-ui/react";
import { Button } from "@/shared/ui/base/chakra/button";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { Tag } from "@/shared/ui/base/chakra/tag";
import { Status } from "@/shared/ui/base/chakra/status";

const TaskCard = () => {
  return (
    <Card.Root width={["300px", null, "320px"]} boxShadow="md">
      <Card.Header>
        <HStack width="full" justifyContent="space-between">
          <Tag colorPalette="red">High</Tag>
          <Text color="fg.muted" textStyle="sm">
            12-02-2024
          </Text>
          <Status value="success">Completed</Status>
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack mb="4" gap="3">
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              Title
            </Text>
          </Stack>
        </HStack>
        <Card.Description>Description</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button variant="subtle" colorPalette="blue" flex="1">
          <MdEditSquare />
          Edit
        </Button>
        <Button variant="subtle" colorPalette="red" flex="1">
          <MdDeleteForever />
          Delete
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default TaskCard;
