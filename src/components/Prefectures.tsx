import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PrefResult } from '../types/apiType';

export default function Prefectures() {
	const { data: prefData } = useQuery<PrefResult>({
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

	return (
		<aside>
			<h1 className="aside__title">都道府県</h1>
			<div className="aside__checkbox-list">
				{prefData?.result.map((info) => (
					<label htmlFor={info.prefName} key={info.prefCode} className="aside__label">
						<input type="checkbox" name={info.prefName} id={info.prefName} />
						<span>{info.prefName}</span>
					</label>
				))}
			</div>
		</aside>
	);
}
