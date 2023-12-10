import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import Header from "../../components/header";
import TasksProgress from "../../components/tasksProgress";
import Ionicons from "@expo/vector-icons/Ionicons";
import TodayTask from "../../components/todayTask";

const Index = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.customHeader}>
        <Header />
      </SafeAreaView>
      <TasksProgress />
      <TodayTask />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.buttonText}>Add new text</Text>
        <Ionicons name="add-outline" color={"#fff"} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171719",
    justifyContent: "space-around",
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  customHeader: {},
  addButton: {
    backgroundColor: "#3168e0",
    borderRadius: 5,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 70,
    gap: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Index;
