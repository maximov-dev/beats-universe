import {
	Pressable,
	PressableProps,
	Text,
	StyleSheet,
	Animated,
	GestureResponderEvent,
} from 'react-native';
import { Radius } from '../../ui/radius';
import { Colors } from '../../ui/colors';
import { Fonts } from '../../ui/fonts';

export const Button = ({ text, ...props }: PressableProps & { text: string }) => {
	const animatedValue = new Animated.Value(100);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.primaryHover, Colors.primary],
	});

	const fadeIn = (event: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 200,
			useNativeDriver: false,
		}).start();

		if (props.onPressIn) {
			props.onPressIn(event);
		}
	};

	const fadeOut = (event: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 200,
			useNativeDriver: false,
		}).start();

		if (props.onPressOut) {
			props.onPressOut(event);
		}
	};

	return (
		<Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
			<Animated.View style={{ ...styles.root, backgroundColor: color }}>
				<Text style={styles.text}>{text}</Text>
			</Animated.View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	root: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Radius.round10,
		height: 58,
		backgroundColor: Colors.primary,
	},
	text: {
		fontSize: Fonts.f18,
		color: Colors.white,
		fontWeight: '500',
		fontFamily: 'Roboto',
	},
});
