import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppLink } from '../src/shared/components/app-link/AppLink';
import { Gaps } from '../src/shared/ui/gaps';
import { Colors } from '../src/shared/ui/colors';
import { Fonts } from '../src/shared/ui/fonts';

export default function UnmatchedRoute() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.description}>Something went wrong. Please get back or restart app</Text>
				<AppLink href={'/'} text="Get back" />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flex: 1,
		padding: 55,
	},
	description: {
		color: Colors.white,
		fontSize: Fonts.f18,
		fontFamily: 'RobotoThin',
		textAlign: 'center',
	},
	content: {
		alignItems: 'center',
		gap: Gaps.gap50,
	},
});
