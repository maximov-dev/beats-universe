import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../ui/colors';
import { Fonts } from '../../ui/fonts';

export const Chip = ({ text }: { text: string }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: Colors.white,
		borderRadius: 17,
		borderWidth: 1,
	},
	text: {
		fontFamily: Fonts.regular,
		fontSize: Fonts.f14,
		color: Colors.white,
	},
});
