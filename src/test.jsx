import { Box, Center, ChakraProvider } from "@chakra-ui/react";
import React from "react";

function App() {
  return (
    <ChakraProvider>
      <Box height="100vh">
      <b><p className='inverted'>"</p></b>
        <center><b><p className='tagline'>YOUR PROFIT IS OUR PROMISE</p></b></center>
        <Center h="33%" bg="green.200">
          Section 2
        </Center>
        <Center h="33%" bg="blue.200">
          Section 3
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default App;
