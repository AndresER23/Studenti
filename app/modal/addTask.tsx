import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import colors from "../../commons/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const AddTask = () => {
  const [status, setStatus] = useState("Medium");

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Title</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <Ionicons name="pencil-outline" size={18} style={styles.icon} />
        </View>
      </View>
      <View style={styles.sectionDual}>
        <View style={styles.dualContainer}>
          <Text style={styles.title}>Due date</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} />
            <Ionicons name="calendar-outline" size={18} style={styles.icon} />
          </View>
        </View>
        <View style={styles.dualContainer}>
          <Text style={styles.title}>Due date</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} />
            <Ionicons name="timer-outline" size={18} style={styles.icon} />
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Priority</Text>
        <View style={styles.priorityContainer}>
          <TouchableOpacity
            onPress={() => setStatus("Low")}
            style={
              status == "Low" ? styles.activePriority : styles.inactivePriority
            }
          >
            <Text style={styles.priorityText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatus("Medium")}
            style={
              status == "Medium"
                ? styles.activePriority
                : styles.inactivePriority
            }
          >
            <Text style={styles.priorityText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatus("High")}
            style={
              status == "High" ? styles.activePriority : styles.inactivePriority
            }
          >
            <Text style={styles.priorityText}>High</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Members</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <Ionicons name="person-add-outline" size={18} style={styles.icon} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Location</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <Ionicons name="location-outline" size={18} style={styles.icon} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Description</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <Ionicons name="receipt-outline" size={18} style={styles.icon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 25,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  input: {
    backgroundColor: colors.secondaryBackgroundColor,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#fff",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    paddingLeft: 10,
  },
  section: {
    gap: 10,
  },
  sectionDual: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
  },
  dualContainer: {
    flex: 1,
  },
  icon: {
    right: 40,
    color: "#fff",
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  priorityContainer: {
    backgroundColor: colors.secondaryBackgroundColor,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activePriority: {
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    flex: 1,
  },
  priorityText: {
    color: "#fff",
    opacity: 0.6,
    paddingVertical: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  inactivePriority: {
    width: "auto",
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default AddTask;
