import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ArticlesList } from "./components";

const queryClient = new QueryClient({
  defaultOptions: { queries: { placeholderData: keepPreviousData } },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col items-start h-full min-h-screen gap-8 p-2 bg-gray-800 md:p-4">
        <ArticlesList />
      </div>
    ),
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
