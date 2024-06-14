import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef } from "react";
import Header from "../../components/header";
import TasksProgress from "../../components/tasksProgress";
import Ionicons from "@expo/vector-icons/Ionicons";
import TodayTask from "../../components/todayTask";
import AddOptionsSheet from "../../components/addOptions";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Index = ({ navigation }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRef.current.present();
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.customHeader}>
        <Header />
      </SafeAreaView>
      <AddOptionsSheet ref={bottomSheetRef} navigator={navigation} />
      <TasksProgress />
      <TodayTask />
      <TouchableOpacity onPress={() => openModal()} style={styles.addButton}>
        <Ionicons name="add-circle-outline" color={"#3168e0"} size={80} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171719",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  customHeader: {},
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Index;
