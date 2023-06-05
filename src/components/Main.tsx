import React from 'react';
import Prefectures from './Prefectures';
import Graph from './Graph';
import useApi from '../hooks/useApi';

export default function Main() {
	const { chartData, getPrefectures, handleChange } = useApi();
	const { data: prefDatas } = getPrefectures;

	return (
		<main>
			<Prefectures chartData={chartData} prefDatas={prefDatas} handleChange={handleChange} />
			<Graph chartData={chartData} />
		</main>
	);
}
