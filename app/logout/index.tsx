import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const IndexLogOut = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Add subjects</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle" size={60} color={"#3168e0"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171719",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 30,
  },
});
export default IndexLogOut;
