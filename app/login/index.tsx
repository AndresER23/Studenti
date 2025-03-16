import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Header from "../../components/header";
import TasksProgress from "../../components/tasksProgress";
import Ionicons from "@expo/vector-icons/Ionicons";
import TodayTask from "../../components/todayTask";
import AddOptionsSheet from "../../components/addOptions";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useState, useContext } from "react";
import { TaskContext } from "../../context/taskContext";

const Index = ({ navigation }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRef.current.present();
  };
  const [searching, setSearching] = useState(false);
  const { taskStats } = useContext(TaskContext);

  return (
    <View style={styles.container}>
      <SafeAreaView style={!searching ? styles.customHeader : styles.searching}>
        <Header searching={searching} setSearching={setSearching} />
      </SafeAreaView>
      <AddOptionsSheet ref={bottomSheetRef} navigator={navigation} />
      {!searching && <TasksProgress taskStats={taskStats} />}
      {!searching && <TodayTask />}
      <TouchableOpacity onPress={() => openModal()} style={styles.addButton}>
        <Ionicons name="add-circle-outline" color={"#3168e0"} size={65} />
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
  customHeader: {

  },
  searching: {
    width: '100%',
    position: 'absolute',
    top: 20,
    display: 'flex',
    left: 20
  },
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
