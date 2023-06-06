export interface PrefType {
	prefCode: number;
	prefName: string;
}

interface ApiResponce<T> {
	message: string | null;
	result: T;
}

export interface ChartData {
	prefCode: number;
	prefName: string;
	prefColor: string;
	data: {
		year: number;
		value: number;
		rate?: number;
	}[];
}

export type PrefResult = ApiResponce<PrefType[]>;
