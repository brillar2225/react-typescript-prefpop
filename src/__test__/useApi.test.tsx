import axios from 'axios';
import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useApi from '../hooks/useApi';
import Prefectures from '../components/Prefectures';

const createQueryWrapper = () => {
	const testQueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				cacheTime: 0,
			},
		},
	});
	const wrapper = ({ children }: PropsWithChildren): JSX.Element => (
		<QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
	);
	return wrapper;
};

const mockPrefecturesData = {
	message: null,
	result: [
		{
			prefCode: 1,
			prefName: '北海道',
		},
		{
			prefCode: 2,
			prefName: '青森県',
		},
		{
			prefCode: 3,
			prefName: '岩手県',
		},
	],
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('データを取得してから画面にレンダリングし、ユーザーとのインタラクションを確認する', () => {
	test('都道府県一覧のデータを取得し、画面にレンダリングする。', async () => {
		mockedAxios.get.mockResolvedValueOnce({ data: mockPrefecturesData });

		const { result } = renderHook(() => useApi(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => expect(result.current.getPrefectures.data).toEqual(mockPrefecturesData));

		const { container } = render(
			<Prefectures
				chartData={result.current.chartData}
				prefDatas={result.current.getPrefectures.data}
				handleChange={result.current.handleChange}
				handleClick={result.current.handleClick}
			/>
		);

		await waitFor(() => {
			const checkboxEl = container.querySelectorAll('input[type="checkbox"]');
			expect(checkboxEl).toHaveLength(mockPrefecturesData.result.length);
		});
	});

	test('ユーザーがチェックを入れる際はターゲットのidとnameを取得し、外した際はchartDataからターゲットデータを除外する。', async () => {
		mockedAxios.get.mockResolvedValueOnce({ data: mockPrefecturesData });

		const { result } = renderHook(() => useApi(), {
			wrapper: createQueryWrapper(),
		});

		await waitFor(() => expect(result.current.getPrefectures.isSuccess).toBeTruthy());

		render(
			<Prefectures
				chartData={result.current.chartData}
				prefDatas={result.current.getPrefectures.data}
				handleChange={result.current.handleChange}
				handleClick={result.current.handleClick}
			/>
		);

		const checkbox = screen.getByTestId('北海道');
		expect(result.current.chartData).toHaveLength(0);

		act(() => {
			fireEvent.change(checkbox, { target: { id: '1', name: '北海道', checked: true } });
		});
		waitFor(() => {
			expect(result.current.chartData.length).toBe(1);
			expect(result.current.chartData[0].prefCode).toBe(1);
			expect(result.current.chartData[0].prefName).toBe('北海道');
		});

		act(() => {
			fireEvent.change(checkbox, { target: { id: '1', name: '北海道', checked: false } });
		});
		waitFor(() => {
			expect(result.current.chartData.length).toBe(0);
		});
	});
});
