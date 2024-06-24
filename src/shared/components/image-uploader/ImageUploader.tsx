import { AntDesign } from '@expo/vector-icons';
import {
	MediaTypeOptions,
	PermissionStatus,
	launchImageLibraryAsync,
	useMediaLibraryPermissions,
} from 'expo-image-picker';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../ui/colors';
import { Fonts } from '../../ui/fonts';
import { Gaps } from '../../ui/gaps';
import { Radius } from '../../ui/radius';
import FormData from 'form-data';
import axios, { AxiosError } from 'axios';
import { FILE_API } from '../../api';
import { UploadResponse } from './imageUploader.interface';

interface ImageUploaderProps {
	onUpload: (uri: string) => void;
	onError: (errorMessage: string) => void;
}

export const ImageUploader = ({ onUpload, onError }: ImageUploaderProps) => {
	const [libraryPermissions, requestlibraryPermissions] = useMediaLibraryPermissions();

	const upload = async () => {
		const hasPermissions = await checkLibrayPermissions();
		if (!hasPermissions) {
			onError('Permission denied');
			return;
		}

		const asset = await pickImage();

		if (!asset) {
			onError('No image');
			return;
		}

		const url = await uploadFileToServer(asset.uri, asset.fileName ?? '');

		if (!url) {
			onError('couldn not upload image');
			return;
		}

		onUpload(url);
	};

	const pickImage = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});

		const assets = result?.assets;

		if (!assets) {
			return null;
		}

		return result.assets[0];
	};

	const checkLibrayPermissions = async () => {
		if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestlibraryPermissions();
			return res.granted;
		}

		if (libraryPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('You do not have permissions to use camera');
			return false;
		}

		return true;
	};

	const uploadFileToServer = async (uri: string, name: string) => {
		const formData = new FormData();
		formData.append('files', {
			uri,
			name,
			type: 'image/jpeg',
		});
		try {
			const { data } = await axios.post<UploadResponse>(FILE_API.uploadImage, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			onUpload(data.urls.original);
			return data.urls.original;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(error);
			}
			return null;
		}
	};

	return (
		<Pressable onPress={upload}>
			<View style={styles.container}>
				<AntDesign name="upload" size={24} color="white" />
				<Text style={styles.text}>Upload image</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: Fonts.f14,
		color: Colors.white,
	},
	container: {
		flexDirection: 'row',
		flexGrow: 1,
		gap: Gaps.gap8,
		backgroundColor: Colors.dark,
		borderRadius: Radius.round10,
		paddingHorizontal: 20,
		paddingVertical: 17,
		alignItems: 'center',
	},
});
