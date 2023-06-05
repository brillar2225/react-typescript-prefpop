import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../types/apiType';

interface Props {
	chartData: ChartData[];
}

interface Data {
	year: number;
	[prefectures: string]: number;
}

export default function Graph({ chartData }: Props) {
	const data: Data[] = [];

	chartData.forEach((item) => {
		item.data.forEach((dataItem) => {
			const existingData = data.find((d) => d.year === dataItem.year);
			if (existingData) {
				existingData[item.prefName] = dataItem.value;
			} else {
				const newData: Data = {
					year: dataItem.year,
					[item.prefName]: dataItem.value,
				};
				data.push(newData);
			}
		});
	});

	return (
		<article>
			<h1 className="graph__title">総人口推移グラフ</h1>
			<ResponsiveContainer width="100%" height={500}>
				<LineChart
					width={500}
					height={300}
					data={data}
					margin={{
						top: 30,
						right: 30,
						left: 15,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="year" label={{ value: '年度', position: 'insideBottomRight', offset: -20 }} angle={-25} />
					<YAxis
						label={{ value: '総人口(千)', position: 'insideTop', offset: -25 }}
						unit="人"
						domain={[0, (dataMax: number): number => Math.abs(dataMax * 1.1)]}
						tickFormatter={(tick: number): string =>
							tick === 0 ? '0' : `${Math.floor(tick).toLocaleString('ja-JP').slice(0, -4)}`
						}
						tickCount={7}
					/>
					<Tooltip />
					<Legend />
					{chartData.map((item) => (
						<Line
							key={item.prefCode}
							type="natural"
							strokeWidth={2}
							dataKey={item.prefName}
							stroke={item.prefColor}
							activeDot={{ r: 8 }}
							unit="人"
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</article>
	);
}
