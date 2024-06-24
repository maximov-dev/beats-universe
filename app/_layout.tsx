import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../src/shared/ui/colors';
import { Fonts } from '../src/shared/ui/fonts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		[Fonts.regular]: require('../assets/fonts/Roboto-Regular.ttf'),
		[Fonts.semibold]: require('../assets/fonts/Roboto-Regular.ttf'),
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
				<Stack.Screen name="index" />
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
