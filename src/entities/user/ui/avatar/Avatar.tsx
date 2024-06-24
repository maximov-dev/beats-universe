import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native';

interface AvatarProps {
	image: string | null;
}

export const Avatar = ({ image }: AvatarProps) => {
	return (
		<>
			{image ? (
				<Image
					source={{
						uri: image,
						height: 100,
						width: 100,
					}}
				/>
			) : (
				<FontAwesome name="user-circle-o" size={24} color="black" />
			)}
		</>
	);
};
