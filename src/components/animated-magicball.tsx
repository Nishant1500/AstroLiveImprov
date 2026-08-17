import { LinearGradient } from "expo-linear-gradient"; // or react-native-linear-gradient
import { StyleSheet, View } from "react-native";

export default function GradientBall() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#ff7e5f", "#feb47b"]} // gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ball}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    width: 200,
    height: 200,
    borderRadius: 100, // makes it a circle
  },
});
