import ReactDOM from "react-dom/client";
import App from "./App";
import {ThemeProvider} from "styled-components";
import theme from "./theme";
import { QueryClient, QueryClientProvider  } from "react-query";

const queryClient = new QueryClient(); // react-query를 사용하기 위한 작업.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>  
      <App />
    </ThemeProvider>
  </QueryClientProvider>

);