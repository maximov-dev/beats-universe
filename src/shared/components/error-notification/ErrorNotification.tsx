import { Animated, Dimensions, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../ui/colors';
import { Fonts } from '../../ui/fonts';

export interface ErrorNotificationProps {
	error: string;
	timeout?: number;
}

export const ErrorNotification = ({ error, timeout }: ErrorNotificationProps) => {
	const [displayStatus, setDisplayStatus] = useState<boolean>(false);
	const animatedValue = new Animated.Value(-100);

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		if (!error) {
			return;
		}

		setDisplayStatus(true);

		const timerId = setTimeout(() => {
			setDisplayStatus(false);
		}, timeout ?? 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [error]);

	if (!displayStatus) {
		return <></>;
	}

	return (
		<Animated.View
			onLayout={onEnter}
			style={{ ...styles.error, transform: [{ translateY: animatedValue }] }}
		>
			<Text style={styles.errorText}>{error}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		width: Dimensions.get('screen').width,
		backgroundColor: Colors.error,
		padding: 15,
		top: 50,
	},
	errorText: {
		fontSize: Fonts.f16,
		color: Colors.white,
		textAlign: 'center',
		fontFamily: Fonts.regular,
	},
});
