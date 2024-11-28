import { Container, Flex, Text, HStack, Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { CiSquarePlus } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const Navbar = () => {
   const { colorMode, toggleColorMode } = useColorMode();

   console.log("Navbar rendered");
   return (
      <Container maxW={"1140px"} px={4}>
         <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
               base: "column",
               sm: "row"
            }}
         >
            <Text
               fontSize={{ base: "22", sm: "28" }}
               fontWeight={"bold"}
               textTransform={"uppercase"}
               textAlign={"center"}
               bgGradient={"linear(to-r, cyan.400, blue.500)"}
               bgClip={"text"}
               cursor={"pointer"}
            >
               <Link to={"/"}>Product Store 🛒</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
               <Link to={"/create"}>
                  <Button>
                     <CiSquarePlus fontSize={"25px"} />
                  </Button>
               </Link>
               <Button onClick={toggleColorMode}>
                  { colorMode === "light" ? <FaMoon /> : <FiSun /> }
               </Button>
            </HStack>
         </Flex>
      </Container>
   );
};

export default Navbar;