import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../src/shared/components/button/Button';
import { ErrorNotification } from '../src/shared/components/error-notification/ErrorNotification';
import { Input } from '../src/shared/components/input/Input';
import { Colors } from '../src/shared/ui/colors';
import { Gaps } from '../src/shared/ui/gaps';
import { Link } from 'expo-router';
import { AppLink } from '../src/shared/components/app-link/AppLink';

export default function App() {
	const [error, setError] = useState<string>('');

	const showAlert = () => {
		setError('Incorrect login or password');
	};

	return (
		<View style={styles.container}>
			<ErrorNotification timeout={1500} error={error} />
			<View style={styles.logoContainer}>
				<Image style={styles.logo} resizeMode={'contain'} source={require('../assets/logo.png')} />
			</View>
			<View style={styles.content}>
				<Text style={styles.appTitle}>Beats Universe</Text>
				<View style={styles.form}>
					<Input placeholder={'Enter email'} />
					<Input isPassword placeholder={'Enter password'} />
					<Button text="Login" onPress={showAlert} />
				</View>
				<AppLink href={'/beat/type-beat'} text={'Restore password'} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.black,
		justifyContent: 'center',
		padding: 55,
		flex: 1,
	},
	logoContainer: {
		alignItems: 'center',
		width: '100%',
	},
	logo: {
		height: 150,
		width: 150,
	},
	content: {
		alignItems: 'center',
		gap: Gaps.gap16,
	},
	appTitle: {
		fontSize: 42,
		fontWeight: '600',
		color: Colors.white,
	},
	form: {
		alignSelf: 'stretch',
		gap: Gaps.gap16,
	},
});
