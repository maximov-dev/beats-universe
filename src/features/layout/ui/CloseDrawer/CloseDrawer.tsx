import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { Pressable, StyleSheet, View } from 'react-native';
import { CloseIcon } from '../../../../shared/icons/close-icon';

export const CloseDrawer = (navigation: DrawerNavigationHelpers) => {
	return (
		<Pressable onPress={() => navigation.closeDrawer()}>
			<View style={styles.root}>
				<CloseIcon />
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	root: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 20,
		right: 20,
	},
});
