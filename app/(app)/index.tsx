import { useAtomValue } from 'jotai';
import { StyleSheet, Text, View } from 'react-native';
import { logoutAtom } from '../../src/entities/auth/model/auth.state';
import { Button } from '../../src/shared/components/button/Button';
import { Colors } from '../../src/shared/ui/colors';

export const BeatsList = () => {
	const logout = useAtomValue(logoutAtom);

	return (
		<View>
			<Text style={styles.title}>Beats List</Text>
			<Button text="Log out" isLoading={false} onPress={logout} />
		</View>
	);
};

export const styles = StyleSheet.create({
	title: {
		color: Colors.white,
	},
});
