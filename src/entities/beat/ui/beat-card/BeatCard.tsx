import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../../shared/components/button/Button';
import { Chip } from '../../../../shared/components/chip/Chip';
import { Colors } from '../../../../shared/ui/colors';
import { Fonts } from '../../../../shared/ui/fonts';
import { Radius } from '../../../../shared/ui/radius';
import { Beat } from '../../model/beat.model';

export const BeatCard = ({ title, description, tags }: Beat) => {
	return (
		<View style={styles.card}>
			<Image source={{ uri: '/' }} height={200} style={styles.image} />
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<ScrollView style={styles.chips}>
					<View>{tags.length > 0 ? tags.map((tag) => <Chip text={tag} />) : null}</View>
				</ScrollView>
			</View>
			<View style={styles.footer}>
				<Button
					isLoading={false}
					onPress={() => Linking.openURL(`https://www.beatstars.com/`)}
					text="Buy"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: 'column',
		borderRadius: Radius.round10,
		backgroundColor: Colors.blackLight,
	},
	image: {
		borderRadius: 10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	title: {
		fontSize: Fonts.f21,
		color: Colors.white,
		fontFamily: Fonts.semibold,
	},
	chips: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 12,
	},
	header: {
		paddingHorizontal: 24,
		paddingVertical: 18,
	},
	footer: {
		backgroundColor: Colors.primaryHover,
		paddingHorizontal: 24,
		paddingVertical: 20,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
});
