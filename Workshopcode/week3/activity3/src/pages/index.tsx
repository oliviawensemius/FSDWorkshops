import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Select,
  Code,
  HStack,
} from "@chakra-ui/react";
import { useState, FormEvent, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  age: string;
  occupation: string;
}

export default function Home() {
  const toast = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    occupation: "",
  });
  const [lastSubmission, setLastSubmission] = useState<FormData | null>(null);

  useEffect(() => {
    const savedSubmission = localStorage.getItem("lastFormSubmission");
    if (savedSubmission) {
      setLastSubmission(JSON.parse(savedSubmission));
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Save to localStorage
    const submissionData = JSON.stringify(formData);
    localStorage.setItem("lastFormSubmission", submissionData);
    setLastSubmission(formData);

    toast({
      title: "Form submitted!",
      description: "Thank you for your submission",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    console.log("Form data:", formData);
  };

  const handleClear = () => {
    localStorage.removeItem("lastFormSubmission");
    setLastSubmission(null);
    toast({
      title: "Cleared!",
      description: "Last submission has been cleared",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={8} maxW="500px" mx="auto">
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Registration Form</Heading>
        <Text textAlign="center" color="gray.600">
          Please fill out all the fields below
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="Enter your age"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Occupation</FormLabel>
              <Select
                placeholder="Select occupation"
                value={formData.occupation}
                onChange={(e) =>
                  setFormData({ ...formData, occupation: e.target.value })
                }
              >
                <option value="student">Student</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self Employed</option>
                <option value="unemployed">Unemployed</option>
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="blue" width="100%" mt={4}>
              Submit
            </Button>
          </VStack>
        </form>

        {lastSubmission && (
          <Box mt={8}>
            <HStack justify="space-between" mb={4}>
              <Heading size="md">Last Submission</Heading>
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                onClick={handleClear}
              >
                Clear Submission
              </Button>
            </HStack>
            <Code p={4} borderRadius="md" display="block" whiteSpace="pre">
              {JSON.stringify(lastSubmission, null, 2)}
            </Code>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
