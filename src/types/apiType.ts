interface PrefType {
	prefCode: number;
	prefName: string;
}

interface PopDataType {
	year: number;
	value: number;
	rate?: number;
}

interface PopType {
	boundaryYear: number;
	data: {
		label: string;
		data: PopDataType[];
	};
}

interface ApiResponce<T> {
	message: string | null;
	result: T;
}

export type PrefResult = ApiResponce<PrefType[]>;
export type PopResult = ApiResponce<PopType>;
