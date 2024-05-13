import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { IAuthResponse, ILoginRequest } from './auth.interface';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

const DEFAULT_STATE = {
	accessToken: null,
	isLoading: false,
	error: null,
} as const;

export const authAtom = atomWithStorage<AuthState>('auth', DEFAULT_STATE, storage);

export const loginAtom = atom(
	(get) => get(authAtom),
	async (get, set, { email, password }: ILoginRequest) => {
		set(authAtom, {
			...DEFAULT_STATE,
			isLoading: true,
		});
		try {
			const { data } = await axios.post<IAuthResponse>(API.login, {
				email,
				password,
			});
			set(authAtom, {
				...DEFAULT_STATE,
				accessToken: data.accessToken,
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				set(authAtom, {
					...DEFAULT_STATE,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export const logoutAtom = atom(null, async (get, set) => {
	set(authAtom, DEFAULT_STATE);
});

export interface AuthState {
	accessToken: string | null;
	isLoading: boolean;
	error: string | null;
}
