import ReactDOM from "react-dom/client";
import App from "./App"
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient(); // react-query를 사용하기 위한 작업.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>

);