import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//cache docs https://www.apollographql.com/docs/react/caching/cache-field-behavior/
const client = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache({
		typePolicies:{
			Query:{
				fields:{
					getTransactionByFilter: {
						keyArgs: false,
						merge(existing = [], incoming: any[]){
							return [...existing, ...incoming]
						}
					}
				}
			}
		}
	})
});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
