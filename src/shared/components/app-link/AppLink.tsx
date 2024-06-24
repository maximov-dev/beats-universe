import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { Fonts } from '../../ui/fonts';
import { Colors } from '../../ui/colors';
import { LinkProps } from 'expo-router/build/link/Link';

export const AppLink = ({ text, ...props }: LinkProps & { text: string }) => {
	return (
		<Link style={styles.link} {...props}>
			<Text>{text}</Text>
		</Link>
	);
};

const styles = StyleSheet.create({
	link: {
		fontSize: Fonts.f18,
		color: Colors.link,
		fontFamily: Fonts.regular,
	},
});
