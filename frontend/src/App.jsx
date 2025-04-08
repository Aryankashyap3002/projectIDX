import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppRoutes } from '@/Routes';

import { AppContextProvider } from './context/AppContextProvider';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider  client={queryClient}>
      <AppContextProvider>
      <AppRoutes />
      </AppContextProvider>
    </QueryClientProvider>
    
  )
  
}

export default App
