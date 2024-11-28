import { Box, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.200", "gray.900")}>
			<Navbar />
			<Outlet />
		</Box>
	);
};

export default App;