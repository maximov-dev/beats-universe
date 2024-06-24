import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import {
	Dimensions,
	Image,
	KeyboardAvoidingView,
	Platform,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from 'react-native';
import { loginAtom } from '../src/entities/auth/model/auth.state';
import { AppLink } from '../src/shared/components/app-link/AppLink';
import { Button } from '../src/shared/components/button/Button';
import { ErrorNotification } from '../src/shared/components/error-notification/ErrorNotification';
import { Input } from '../src/shared/components/input/Input';
import { Colors } from '../src/shared/ui/colors';
import { Gaps } from '../src/shared/ui/gaps';
import { useScreenOrientation } from '../src/shared/hooks';
import { Orientation } from 'expo-screen-orientation';

export default function Login() {
	const [localError, setLocalError] = useState<string>('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [{ accessToken, isLoading, error }, loginAction] = useAtom(loginAtom);
	const orientation = useScreenOrientation();

	const login = () => {
		if (!email) {
			setLocalError('Please enter email');
			return;
		}

		if (!password) {
			setLocalError('Please enter password');
			return;
		}

		loginAction({ email, password });
	};

	useEffect(() => {
		if (error) {
			setLocalError(error);
		}
	}, [error]);

	useEffect(() => {
		if (accessToken) {
			router.replace('/(app)');
		}
	}, [accessToken]);

	const inputStyle: StyleProp<ViewStyle> = {
		width:
			orientation === Orientation.PORTRAIT_UP
				? 'auto'
				: Dimensions.get('window').width / 2 - 16 - 48,
	};

	const inputs: StyleProp<ViewStyle> = {
		...styles.inputs,
		flexDirection: orientation === Orientation.PORTRAIT_UP ? 'column' : 'row',
	};

	return (
		<View style={styles.container}>
			<ErrorNotification timeout={1500} error={localError} />
			<View style={styles.logoContainer}>
				<Image style={styles.logo} resizeMode={'contain'} source={require('../assets/logo.png')} />
			</View>
			<View style={styles.content}>
				<Text style={styles.appTitle}>Beats Universe</Text>
				<View style={styles.form}>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						style={inputs}
					>
						<Input style={inputStyle} placeholder={'Enter email'} onChangeText={setEmail} />
						<Input
							style={inputStyle}
							isPassword
							placeholder={'Enter password'}
							onChangeText={setPassword}
						/>
					</KeyboardAvoidingView>
					<Button isLoading={isLoading} text="Login" onPress={login} />
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
	inputs: {
		gap: Gaps.gap16,
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
