import { Pressable, PressableProps, Text, View, StyleSheet } from "react-native";
import { Radius } from "../../ui/radius";
import { Colors } from "../../ui/colors";
import { Fonts } from "../../ui/fonts";

export const Button = ({
  text,
  ...props
}: PressableProps & { text: string }) => {
  return (
    <Pressable {...props}>
      <View style={styles.root}>
        <Text style={styles.text}>{text}</Text>
      </View>
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
    }
})
