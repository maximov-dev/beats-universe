import { useEffect, useState } from 'react';
import {
	Orientation,
	getOrientationAsync,
	addOrientationChangeListener,
	removeOrientationChangeListeners,
} from 'expo-screen-orientation';

export function useScreenOrientation() {
	const [orientation, setOrientation] = useState<Orientation>();

	useEffect(() => {
		getOrientationAsync().then((orientation) => {
			setOrientation(orientation);
			addOrientationChangeListener((event) => {
				setOrientation(event.orientationInfo.orientation);
			});
		});
		return () => {
			removeOrientationChangeListeners();
		};
	}, []);

	return orientation;
}
