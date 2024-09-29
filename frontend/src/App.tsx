import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Placeholder from "./PlaceHolder";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Placeholder />
    </QueryClientProvider>
  );
}
