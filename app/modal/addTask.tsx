import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import colors from "../../commons/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CalendarSheetModal from "../../components/calendarSheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { DateData } from "react-native-calendars";
import MembersSheetModal from "../../components/membersSheetModal";

const AddTask = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState<String>();
  const [priority, setPriority] = useState<String>("Medium");
  const [members, setMembers] = useState([]);
  const [membersLenght, setMembersLenght] = useState(0);
  const [location, setLocation] = useState();
  const [description, setDescription] = useState<String>();
  const [date, setDate] = useState<DateData>();
  const membersRef = useRef(null);
  const membersModal = useRef(null);
  const calendarRef = useRef<BottomSheetModal>();

  function handleMembers(member: string) {
    const reg = new RegExp(
      "^([A-Za-záéíóúñÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-záéíóúñÁÉÍÓÚñáéíóúÑ']+[s])+([A-Za-záéíóúñÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-záéíóúñÁÉÍÓÚñáéíóúÑ'])+[s]?([A-Za-záéíóúñÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-záéíóúÁÉÍÓÚñáéíóúÑ'])?$"
    );
    if (member == "") {
      return;
    } else if (reg.test(member)) {
      Alert.alert(
        "El nombre no debe contener numeros ni caracteres especiales"
      );
    } else if (members.indexOf(member.trim()) != -1) {
      Alert.alert("Este miembro ya existe");
    } else {
      members.push(member);
    }

    setMembersLenght(members.length);
    membersRef.current.clear();
  }

  function handleCalendar() {
    calendarRef.current.present();
  }

  function handleMembersModal() {
    members.length > 0 && membersModal.current.present();
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
      extraHeight={200}
    >
      <View style={styles.section}>
        <Text style={styles.title}>Title</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTaskTitle(text)}
          />
          <Ionicons name="pencil-outline" size={18} style={styles.icon} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Due date</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="dd/mm/yyyy"
            placeholderTextColor={colors.placeHolderColor}
            value={date ? date.dateString : ""}
          />
          <Ionicons
            name="calendar-outline"
            size={18}
            style={styles.icon}
            onPress={handleCalendar}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Priority</Text>
        <View style={styles.priorityContainer}>
          <TouchableOpacity
            onPress={() => setPriority("Low")}
            style={
              priority == "Low"
                ? styles.activePriority
                : styles.inactivePriority
            }
          >
            <Text style={styles.priorityText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriority("Medium")}
            style={
              priority == "Medium"
                ? styles.activePriority
                : styles.inactivePriority
            }
          >
            <Text style={styles.priorityText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPriority("High")}
            style={
              priority == "High"
                ? styles.activePriority
                : styles.inactivePriority
            }
          >
            <Text style={styles.priorityText}>High</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Members</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            ref={membersRef}
            onEndEditing={(member) => handleMembers(member.nativeEvent.text)}
          />
          <Ionicons
            name="person-add-outline"
            size={18}
            style={styles.icon}
            onPress={handleMembersModal}
          />
          <Text style={styles.members}>{membersLenght}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Description</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <Ionicons name="receipt-outline" size={18} style={styles.icon} />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save task</Text>
        </TouchableOpacity>
      </View>
      <CalendarSheetModal
        ref={calendarRef}
        navigator={navigation}
        setDate={setDate}
      />
      <MembersSheetModal
        navigator={navigation}
        ref={membersModal}
        members={members}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 60,
    justifyContent: "space-between",
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
  icon: {
    right: 40,
    color: "#fff",
  },
  inputContainer: {
    justifyContent: "space-around",
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
  button: {
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    justifyContent: "center",
    padding: 15,
    marginTop: 5,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
  },
  members: {
    color: "#fff",
    right: 25,
    fontSize: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attachContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddTask;
