import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useAtomValue } from 'jotai';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { authAtom } from '../../src/entities/auth/model/auth.state';
import { AppDrawer } from '../../src/entities/layout/ui/AppDrawer/AppDrawer';
import { MenuButton } from '../../src/features/layout/ui/MenuButton/MenuButton';
import { Colors } from '../../src/shared/ui/colors';
import { Fonts } from '../../src/shared/ui/fonts';

export default function AppLayout() {
	const { accessToken } = useAtomValue(authAtom);

	if (!accessToken) {
		return <Redirect href={'/login'} />;
	}

	return (
		<GestureHandlerRootView style={style.gesture}>
			<Drawer
				drawerContent={(props) => <AppDrawer {...props} />}
				screenOptions={({ navigation }) => ({
					headerStyle: {
						backgroundColor: Colors.blackLight,
						shadowColor: Colors.blackLight,
					},
					headerLeft: () => {
						return <MenuButton navigation={navigation} />;
					},
					headerTitleStyle: {
						color: Colors.white,
						fontSize: Fonts.f21,
					},
					headerTitleAlign: 'center',
					sceneContainerStyle: {
						backgroundColor: Colors.black,
					},
				})}
			>
				<Drawer.Screen
					options={{
						title: 'Beats list',
					}}
					name="index"
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}

const style = StyleSheet.create({
	gesture: { flex: 1 },
});
