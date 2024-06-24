import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Colors } from '../../ui/colors';
import { Radius } from '../../ui/radius';
import { useState } from 'react';
import { EyeIcon } from '../../icons/eye';
import { EyeClosedIcon } from '../../icons/eye-closed';

export const Input = ({
	isPassword,
	style,
	...props
}: TextInputProps & { isPassword?: boolean }) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	return (
		<View style={style}>
			<TextInput
				secureTextEntry={isPassword && !isPasswordVisible}
				placeholderTextColor={Colors.gray}
				style={styles.input}
				{...props}
			/>
			{isPassword && (
				<Pressable onPress={() => setIsPasswordVisible((state) => !state)} style={styles.eyeIcon}>
					{isPasswordVisible ? <EyeIcon /> : <EyeClosedIcon />}
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 58,
		backgroundColor: Colors.dark,
		paddingHorizontal: 24,
		borderRadius: Radius.round10,
		fontSize: 16,
		color: Colors.gray,
	},
	eyeIcon: {
		position: 'absolute',
		right: 0,
		paddingHorizontal: 20,
		paddingVertical: 18,
	},
});
