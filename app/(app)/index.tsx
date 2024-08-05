import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import {
	ActivityIndicator,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { logoutAtom } from '../../src/entities/auth/model/auth.state';
import { loadBeatAtom } from '../../src/entities/beat/model/beat.state';
import { BeatCard } from '../../src/entities/beat/ui/beat-card/BeatCard';
import { Button } from '../../src/shared/components/button/Button';
import { Colors } from '../../src/shared/ui/colors';
import { Gaps } from '../../src/shared/ui/gaps';

export default function BeatsList() {
	const { isLoading, error, beats } = useAtomValue(loadBeatAtom);
	const loadBeat = useSetAtom(loadBeatAtom);
	const logout = useAtomValue(logoutAtom);

	useEffect(() => {
		loadBeat();
	}, []);

	if (isLoading) {
		return <ActivityIndicator size={'large'} color={Colors.primary} />;
	}

	return (
		<View>
			<Text style={styles.title}>Beats List</Text>
			<ScrollView
				refreshControl={
					<RefreshControl titleColor={Colors.primary} refreshing={isLoading} onRefresh={loadBeat} />
				}
			>
				<View style={styles.container}>
					{beats.length > 0 ? (
						beats.map((beat) => (
							<BeatCard {...beat} id={beat.id} title={beat.title} tags={beat.tags} />
						))
					) : (
						<Text>No beats for now</Text>
					)}
				</View>
			</ScrollView>
			<Button text="Log out" isLoading={false} onPress={logout} />
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		color: Colors.white,
	},
	container: {
		flexDirection: 'column',
		gap: Gaps.gap20,
		padding: 20,
	},
});
