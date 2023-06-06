import React, { ChangeEvent } from 'react';
import { PrefResult, PrefType } from '../types/apiType';

interface Props {
	chartData: PrefType[];
	prefDatas: PrefResult | undefined;
	handleChange(e: ChangeEvent<HTMLInputElement>): void;
}

export default function Prefectures({ chartData, prefDatas, handleChange }: Props) {
	return (
		<aside className="aside">
			<h1 className="sr-only">以下より気になる都道府県を選択して下さい</h1>
			<div className="aside__wrapper">
				<h1 className="aside__title">都道府県</h1>
				<ul className="aside__checkbox-list">
					{prefDatas?.result.map((info) => (
						<li key={info.prefCode} id={info.prefCode.toString()} className="aside__label">
							<input
								type="checkbox"
								name={info.prefName}
								id={info.prefCode.toString()}
								checked={chartData?.some((i) => i.prefCode === info.prefCode)}
								onChange={handleChange}
							/>
							<span>{info.prefName}</span>
						</li>
					))}
				</ul>
			</div>
		</aside>
	);
}
