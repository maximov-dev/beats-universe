import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Input } from './src/shared/components/input/Input';
import { Colors } from './src/shared/ui/colors';
import { Gaps } from './src/shared/ui/gaps';
import { Button } from './src/shared/components/button/Button';

export default function App() {
  return (
    <View style={styles.container}>
      <View  style={styles.logoContainer}>
      <Image style={styles.logo} resizeMode={'contain'} source={require('./assets/logo.png')}/>
      </View>
      <View style={styles.content}>
        <Text style={styles.appTitle}>Beats Universe</Text>
        <View style={styles.form}>
          <Input placeholder={'Enter email'}/>
          <Input isPassword placeholder={'Enter password'}/>
          <Button text='Login'/>
        </View>
        <Text>Restore password</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    padding: 55,
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    height: 150,
    width: 150,
  },
  content: {
    alignItems: 'center',
    gap: Gaps.gap16,
  },
  appTitle: {
    fontSize: 42,
    fontWeight: '600',
    color: Colors.white,
  },
  form: {
    alignSelf: 'stretch',
    gap: Gaps.gap16
  }
});
