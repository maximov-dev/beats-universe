import { atom } from 'jotai';
import { authAtom } from '../../auth/model/auth.state';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';
import { Beat } from './beat.model';

const beats: Beat[] = [
	{
		id: '0',
		title: 'Crunk beats',
		listenCount: 0,
		description: 'New beats',
		price: 0,
		genre: 'crunk',
		tags: ['new'],
	},
];

const DEFAULT_STATE: BeatState = {
	beats,
	isLoading: false,
	error: null,
} as const;

export const beatAtom = atom<BeatState>({
	beats: [],
	isLoading: false,
	error: null,
});

export const loadBeatAtom = atom(
	async (get) => {
		return get(beatAtom);
	},
	async (get, set) => {
		try {
			set(beatAtom, {
				...DEFAULT_STATE,
				isLoading: true,
			});
			const { accessToken } = await get(authAtom);
			const { data } = await axios.get<Beat[]>(API.beats, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			set(beatAtom, {
				...DEFAULT_STATE,
				//beats: data,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(beatAtom, {
					...DEFAULT_STATE,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export interface BeatState {
	beats: Beat[];
	isLoading: boolean;
	error: string | null;
}
