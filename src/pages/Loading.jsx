import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";

export default function Loading() {
  return (
    <main className="h-screen overflow-hidden bg-gray-200">
      <Navbar />
      <Box px={4} py={6}>
        <Box className="h-40 w-full rounded-md bg-gray-100" mb={4}></Box>
        <Box className="h-4 w-[140px] rounded-md bg-gray-100"></Box>
        <Box className="flex items-center justify-center gap-4" mt={2}>
          <Box className="h-24 w-[50%] rounded-md bg-gray-100"></Box>
          <Box className="h-24 w-[50%] rounded-md bg-gray-100"></Box>
        </Box>
        <Box className="h-4 w-[140px] rounded-md bg-gray-100" mt={10}></Box>
        <Box className="flex items-center justify-center gap-4" mt={2}>
          <Box className="h-24 w-[50%] rounded-md bg-gray-100"></Box>
          <Box className="h-24 w-[50%] rounded-md bg-gray-100"></Box>
        </Box>
        <Box className="h-4 w-[140px] rounded-md bg-gray-100" mt={10}></Box>
        <Box className="flex items-center justify-center gap-4" mt={2}>
          <Box className="h-24 w-[50%] rounded-md bg-gray-100"></Box>
          <Box className="h-24 w-[50%] rounded-md bg-gray-100"></Box>
        </Box>
      </Box>
    </main>
  );
}
