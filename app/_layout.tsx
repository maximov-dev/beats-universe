import { SplashScreen, Stack } from 'expo-router';
import { Colors } from '../src/shared/ui/colors';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
		RobotoThin: require('../assets/fonts/Roboto-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		if (error) {
			throw new Error('Can not load the app font');
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					statusBarColor: Colors.black,
					headerShown: false,
					contentStyle: {
						backgroundColor: Colors.black,
					},
				}}
			>
				<Stack.Screen name="login" />
				<Stack.Screen
					options={{
						presentation: 'modal',
					}}
					name="restore-user"
				/>
			</Stack>
		</SafeAreaProvider>
	);
}
