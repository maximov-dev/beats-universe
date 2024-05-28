import { FontAwesome, Fontisto } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer/CloseDrawer';
import { MenuItem } from '../../../../features/layout/ui/MenuItem/MenuItem';
import { AppLink } from '../../../../shared/components/app-link/AppLink';
import { Colors } from '../../../../shared/ui/colors';
import { logoutAtom } from '../../../auth/model/auth.state';
import { loadProfileAtom } from '../../../user/model/user.state';

const MENU = [
	{
		text: 'Beats',
		icon: <Fontisto name="applemusic" size={32} color={Colors.white} />,
		path: 'index',
	},
	{
		text: 'Profile',
		icon: <FontAwesome name="user" size={32} color={Colors.white} />,
		path: '/',
	},
];

export const AppDrawer = (props: DrawerContentComponentProps) => {
	const logout = useSetAtom(logoutAtom);
	const [profile, loadProfie] = useAtom(loadProfileAtom);

	useEffect(() => {
		loadProfie();
	}, []);

	return (
		<DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
			<View style={styles.content}>
				<View style={styles.closeContainer}>
					<CloseDrawer {...props.navigation} />
				</View>
				<View style={styles.logoContainer}>
					<Image
						style={styles.logo}
						resizeMode={'contain'}
						source={require('../../../../../assets/logo.png')}
					/>
				</View>
				<View style={styles.nameContainer}>
					<Text style={styles.nameText}>{profile.profile?.name ?? 'No name'}</Text>
				</View>
				{MENU.map((item) => (
					<MenuItem key={item.path} {...item} drawer={props} />
				))}
			</View>
			<View style={styles.footer}>
				<AppLink onPress={logout} text={'Logout'} href={'/login'} />
			</View>
		</DrawerContentScrollView>
	);
};

const styles = StyleSheet.create({
	closeContainer: {
		height: 50,
	},
	scrollView: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	content: {
		flex: 1,
		height: 100,
	},
	nameContainer: {
		alignItems: 'center',
		marginBottom: 24,
	},
	nameText: {
		color: Colors.white,
		fontSize: 21,
		fontWeight: '800',
	},
	footer: {
		gap: 50,
		marginBottom: 40,
		alignItems: 'center',
	},
	logoContainer: {
		width: '100%',
		//flex: 1,
		alignItems: 'center',
		height: 100,
	},
	logo: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
		width: 100,
	},
});
