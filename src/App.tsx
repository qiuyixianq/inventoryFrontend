import React from 'react';
import { allItemDetails } from './graphQL/query';
import { useQuery } from '@apollo/client';
import { ItemsData, Items } from './graphQL/Types';

function App() {
	const { loading, data } = useQuery<ItemsData, Items>(allItemDetails);
	if (loading) return <p>Loading</p>;
	if (!data) return <p>Data Not Found</p>;
	console.log(data);

	return (
		<div className="App">
			<h1>Data from graphql</h1>
			{data.getAllItems.map((item) => (
				<div className="">
					<h1>Name: {item.name}</h1>
					<h1>ID: {item.id}</h1>
					<h1>quantity: {item.quantity}</h1>
				</div>
			))}
		</div>
	);
}

export default App;
