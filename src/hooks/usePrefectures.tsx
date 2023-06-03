import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PrefResult, PrefType } from '../types/apiType';

export default function usePrefectures() {
	const [checkedPrefs, setCheckedPrefs] = useState<PrefType[]>([]);

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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { target } = e;
		const checkedId = Number(target.id);
		const checkedName = target.name;

		target.checked
			? setCheckedPrefs((prev) => [...prev, { prefCode: checkedId, prefName: checkedName }])
			: setCheckedPrefs((prev) => prev.filter((i) => i.prefCode !== checkedId));
	};

	return { checkedPrefs, getPrefectures, handleChange };
}
