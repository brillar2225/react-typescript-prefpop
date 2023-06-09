import React from 'react';
import Prefectures from './Prefectures';
import Graph from './Graph';
import useApi from '../hooks/useApi';

export default function Main() {
	const { btnName, chartData, getPrefectures, handleClick, handleChange } = useApi();
	const { data: prefDatas } = getPrefectures;

	return (
		<main>
			<h1 className="sr-only">各都道府県の総人口推移グラフサイト</h1>
			<div className="main__wrapper">
				<Prefectures
					chartData={chartData}
					prefDatas={prefDatas}
					handleClick={handleClick}
					handleChange={handleChange}
				/>
			</div>
			<div className="hr" />
			<div className="main__wrapper">
				<Graph btnName={btnName} chartData={chartData} />
			</div>
		</main>
	);
}
