import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../src/shared/ui/colors';
import { useLocalSearchParams } from 'expo-router';

export default function BeatPage() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text style={styles.text}>{id}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: Colors.white,
	},
});
