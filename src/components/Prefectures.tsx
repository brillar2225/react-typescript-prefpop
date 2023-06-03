import React from 'react';
import usePrefectures from '../hooks/usePrefectures';

export default function Prefectures() {
	const { getPrefectures, checkedPrefs, handleChange } = usePrefectures();
	const { data: prefDatas } = getPrefectures;

	return (
		<aside>
			<h1 className="aside__title">都道府県</h1>
			<div className="aside__checkbox-list">
				{prefDatas?.result.map((info) => (
					<label htmlFor={info.prefName} key={info.prefCode} className="aside__label">
						<input
							type="checkbox"
							name={info.prefName}
							id={info.prefCode.toString()}
							checked={checkedPrefs.some((i) => i.prefCode === info.prefCode)}
							onChange={handleChange}
						/>
						<span>{info.prefName}</span>
					</label>
				))}
			</div>
		</aside>
	);
}
