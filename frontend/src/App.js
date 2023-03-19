import { useState } from "react";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import Routes from "./components/Routes";

const queryClient = new QueryClient()

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <Routes />
  </QueryClientProvider>)
}

export default App;
