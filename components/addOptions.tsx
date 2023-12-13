import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheet,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";

export type Ref = BottomSheetModal;
interface Navigator {
  navigator: any;
}
const AddOptionsSheet = forwardRef<Ref, Navigator>((props, reference) => {
  const snapPoints = useMemo(() => ["35%"], []);
  const renderBackDrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const { dismiss } = useBottomSheetModal();

  function handleAddTask() {
    dismiss();
    props.navigator.navigate("AddTask");
  }

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      backdropComponent={renderBackDrop}
      ref={reference}
      enableOverDrag={false}
      handleStyle={{
        backgroundColor: "#232229",
        borderTopStartRadius: 13,
        borderTopEndRadius: 13,
        height: 35,
      }}
    >
      <TouchableOpacity style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={() => handleAddTask()}>
          <Text style={styles.title}>Add a new task</Text>
          <Ionicons
            name="reader-outline"
            size={35}
            color={"#fff"}
            style={{ position: "absolute", right: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <View></View>
          <Text style={styles.title}>Add a new subject</Text>
          <Ionicons
            name="school-outline"
            size={35}
            color={"#fff"}
            style={{ position: "absolute", right: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.title}>See my calendar</Text>
          <Ionicons
            name="calendar-outline"
            size={35}
            color={"#fff"}
            style={{ position: "absolute", right: 20 }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171719",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingVertical: 25,
  },
  card: {
    backgroundColor: "#232229",
    flex: 1,
    paddingHorizontal: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
  },
});
export default AddOptionsSheet;
