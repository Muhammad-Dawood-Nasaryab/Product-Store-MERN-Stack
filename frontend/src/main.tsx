import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import CreatePage from "./pages/CreatePage.tsx";
import HomePage from "./pages/HomePage.tsx";
import { StrictMode } from "react";
import App from "./App.tsx";

const router = createBrowserRouter([
	{
		path: "/",
      element: <App />,
		children: [
         {
				path: "/",
				element: <HomePage />,
			},
			{
				path: "create/",
				element: <CreatePage />
			},
      ],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</StrictMode>,
);
