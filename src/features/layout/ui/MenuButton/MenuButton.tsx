import { useState } from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { MenuIcon } from '../../../../shared/icons/menu-icon';
import { Colors } from '../../../../shared/ui/colors';

export const MenuButton = ({
	navigation,
	...props
}: PressableProps & { navigation: { toggleDrawer: () => void } }) => {
	const [clicked, setClicked] = useState<boolean>(false);

	return (
		<Pressable
			{...props}
			onPress={navigation.toggleDrawer}
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
		>
			<View
				style={{
					...styles.root,
					backgroundColor: clicked ? Colors.primaryHover : Colors.blackLight,
				}}
			>
				<MenuIcon />
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	root: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 15,
		flex: 1,
	},
});
