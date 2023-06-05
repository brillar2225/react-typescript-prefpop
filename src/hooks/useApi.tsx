import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChartData, PrefResult } from '../types/apiType';

const defaultColors = [
	'#f74720',
	'#70e570',
	'#c796f7',
	'#eab04b',
	'#f866ff',
	'#eaaa93',
	'#05b216',
	'#99ff26',
	'#a7ed04',
	'#f0f78c',
	'#eefca1',
	'#acd653',
	'#9c9efc',
	'#e56b67',
	'#a6f916',
	'#a960e5',
	'#e26177',
	'#fcb5e7',
	'#a8c9ea',
	'#78c0ed',
	'#f1abf2',
	'#047ef7',
	'#76f7f7',
	'#ace246',
	'#ffc1c2',
	'#dd354e',
	'#99fcd6',
	'#31778e',
	'#ff6098',
	'#ddccff',
	'#82e569',
	'#85addd',
	'#1fb75e',
	'#d37a4a',
	'#efb4a2',
	'#e28a4f',
	'#f9c2cc',
	'#c9f7a0',
	'#d702db',
	'#ef8bde',
	'#90f492',
	'#04398e',
	'#ccffb2',
	'#5e61f9',
	'#78f76f',
	'#36bc8d',
	'#fc4eb0',
];

let randomColor = '';

export default function useApi() {
	const [chartData, setChartData] = useState<ChartData[]>([]);

	const getPrefectures = useQuery<PrefResult>({
		queryKey: ['prefectures'],
		queryFn: async () => {
			const { data } = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
				headers: {
					'X-API-KEY': process.env.REACT_APP_RESAS_APIKEY,
				},
			});
			return data;
		},
	});

	const getPopulation = async (prefCode: number, prefName: string) => {
		const { data } = await axios.get(
			`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
			{
				headers: {
					'X-API-KEY': process.env.REACT_APP_RESAS_APIKEY,
				},
			}
		);

		const getRandomColor = (): string => {
			randomColor = defaultColors[Math.floor(Math.random() * defaultColors.length)];
			return randomColor;
		};

		getRandomColor();
		const usedColor = chartData.find((item) => defaultColors.includes(item.prefColor));
		if (usedColor) {
			getRandomColor();
		}

		return setChartData((prev) => [
			...prev,
			{ prefCode, prefName, prefColor: randomColor, data: data.result.data[0].data },
		]);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { target } = e;
		const checkedId = Number(target.id);
		const checkedName = target.name;

		target.checked
			? getPopulation(checkedId, checkedName)
			: setChartData((curr) => curr.filter((item) => item.prefCode !== checkedId));
	};

	return { chartData, getPrefectures, handleChange };
}
