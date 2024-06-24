import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageUploader } from '../../src/shared/components/image-uploader/ImageUploader';
import { Gaps } from '../../src/shared/ui/gaps';
import { Avatar } from '../../src/entities/user/ui/avatar/Avatar';
import { useAtom } from 'jotai';
import { updateProfileAtom } from '../../src/entities/user/model/user.state';
import { Button } from '../../src/shared/components/button/Button';
import * as Sharing from 'expo-sharing';

export default function Profile() {
	const [image, setImage] = useState<string | null>(null);
	const [profile, updateProfile] = useAtom(updateProfileAtom);

	useEffect(() => {
		if (profile.profile?.photo) {
			setImage(profile.profile?.photo);
		}
	}, [profile]);

	const submitProfile = () => {
		if (!image) return;

		updateProfile({ photo: image });
	};

	const shareProfile = async () => {
		const isSharingAvailable = await Sharing.isAvailableAsync();

		if (!isSharingAvailable) {
			return;
		}

		await Sharing.shareAsync('/', {
			dialogTitle: 'Share profile',
		});
	};

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<Avatar image={image} />
				<ImageUploader onUpload={setImage} onError={(error) => console.log(error)} />
				<Button isLoading={false} text="Save" onPress={submitProfile} />
				<Button isLoading={false} text="Share profile" onPress={shareProfile} />
			</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: Gaps.gap20,
		textAlign: 'center',
		paddingHorizontal: 16,
		paddingVertical: 20,
		flexGrow: 1,
	},
});
