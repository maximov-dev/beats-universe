import { atom } from 'jotai';
import { User } from './user.model';
import { authAtom } from '../../auth/model/auth.state';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';

const DEFAULT_STATE = {
	profile: null,
	isLoading: false,
	error: null,
} as const;

export const profileAtom = atom<UserState>({
	profile: null,
	isLoading: false,
	error: null,
});

export const loadProfileAtom = atom(
	async (get) => {
		return get(profileAtom);
	},
	async (get, set) => {
		const { accessToken } = await get(authAtom);
		set(profileAtom, {
			isLoading: true,
			profile: null,
			error: null,
		});

		try {
			const { data } = await axios.get<User>(API.profile, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			set(profileAtom, {
				...DEFAULT_STATE,
				profile: data,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(profileAtom, {
					...DEFAULT_STATE,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export interface UserState {
	profile: User | null;
	isLoading: boolean;
	error: string | null;
}
