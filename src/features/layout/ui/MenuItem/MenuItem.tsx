import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';
import React, { useState } from 'react';
import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../../shared/ui/colors';
import { Fonts } from '../../../../shared/ui/fonts';
import { Gaps } from '../../../../shared/ui/gaps';

interface MenuItemProps {
	drawer: DrawerContentComponentProps;
	icon: React.ReactNode;
	text: string;
	path: string;
}

export const MenuItem = ({
	drawer,
	icon,
	text,
	path,
	...props
}: MenuItemProps & PressableProps) => {
	const [clicked, setClicked] = useState(false);
	const isActive = drawer.state.routes[drawer.state.index].name === path;

	return (
		<Pressable
			{...props}
			onPress={() => drawer.navigation.navigate(path)}
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
		>
			<View
				style={{
					...styles.item,
					borderColor: isActive ? Colors.primary : Colors.black,
					backgroundColor: clicked || isActive ? Colors.primaryHover : Colors.black,
				}}
			>
				{icon}
				<Text style={styles.text}>{text}</Text>
			</View>
		</Pressable>
	);
};

export const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		gap: Gaps.gap20,
		paddingHorizontal: 24,
		paddingVertical: 16,
		alignItems: 'center',
		borderRightWidth: 5,
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f16,
	},
});
