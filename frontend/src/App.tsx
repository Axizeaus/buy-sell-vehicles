import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./PlaceHolder";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
