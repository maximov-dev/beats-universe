import { Redirect, Stack } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useAtomValue } from 'jotai';
import { authAtom } from '../../src/entities/auth/model/auth.state';

export default function AppLayout() {
	const { accessToken } = useAtomValue(authAtom);

	if (!accessToken) {
		return <Redirect href={'/login'} />;
	}

	return (
		<Drawer>
			<Drawer.Screen name="index" />
		</Drawer>
	);
}
