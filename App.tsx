import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>Beat Univers</Text>
        <View style={styles.form}>
          <TextInput style={styles.input}></TextInput>
          <TextInput style={styles.input}></TextInput>
          <Button title='Login'/>
        </View>
        <Text>Restore password</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 55,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    gap: 50,
  },
  form: {
    alignSelf: 'stretch',
    gap: 16
  },
  input: {
    backgroundColor: 'gray'
  }
});
