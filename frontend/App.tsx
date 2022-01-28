import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from 'react-query';
import Routes from './src/Pages/routes';



export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
    </QueryClientProvider>
  );

}
