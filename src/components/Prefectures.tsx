import React, { ChangeEvent } from 'react';
import { PrefResult, PrefType } from '../types/apiType';

interface Props {
	chartData: PrefType[];
	prefDatas: PrefResult | undefined;
	handleClick(e: React.MouseEvent<HTMLButtonElement>): void;
	handleChange(e: ChangeEvent<HTMLInputElement>): void;
}

export default function Prefectures({ chartData, prefDatas, handleClick, handleChange }: Props) {
	return (
		<aside className="aside">
			<h1 className="sr-only">以下より気になる都道府県を選択して下さい</h1>
			<div className="aside__wrapper">
				<h1 className="aside__title">都道府県</h1>
				<div className="aside__btns">
					<h2>ご希望の情報を選択して下さい（デフォルトは総人口です）</h2>
					<button type="button" name="総人口" onClick={handleClick}>
						総人口
					</button>
					<button type="button" name="少年人口" onClick={handleClick}>
						少年人口
					</button>
					<button type="button" name="生産年齢人口" onClick={handleClick}>
						生産年齢人口
					</button>
					<button type="button" name="老人人口" onClick={handleClick}>
						老人人口
					</button>
				</div>
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
