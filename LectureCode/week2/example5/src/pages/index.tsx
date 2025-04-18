import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="xl" py={8}>
      <VStack spacing={8}>
        <Heading>Task Manager</Heading>

        <Box as="form" w="100%">
          <HStack>
            <Input placeholder="Enter a new task..." size="lg" />
            <Button colorScheme="blue" size="lg">
              Add
            </Button>
          </HStack>
        </Box>

        <VStack spacing={4} w="100%" align="stretch">
          <Box
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            borderWidth={1}
          >
            <HStack justify="space-between">
              <Text cursor="pointer">Buy groceries</Text>
              <HStack spacing={2}>
                <Button size="sm" colorScheme="gray">
                  Mark Complete
                </Button>
                <IconButton
                  aria-label="Delete task"
                  icon={<span>🗑️</span>}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                />
              </HStack>
            </HStack>
          </Box>

          <Box
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            borderWidth={1}
          >
            <HStack justify="space-between">
              <Text
                cursor="pointer"
                textDecoration="line-through"
                color="gray.500"
              >
                Call mom
              </Text>
              <HStack spacing={2}>
                <Button size="sm" colorScheme="green">
                  Completed
                </Button>
                <IconButton
                  aria-label="Delete task"
                  icon={<span>🗑️</span>}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                />
              </HStack>
            </HStack>
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
}
