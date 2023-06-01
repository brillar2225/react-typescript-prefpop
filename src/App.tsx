import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/Header';
import Main from './components/Main';

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 5 } },
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<Main />
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
}

export default App;
