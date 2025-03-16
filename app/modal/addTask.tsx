import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import colors from "../../commons/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CalendarSheetModal from "../../components/calendarSheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { DateData } from "react-native-calendars";
import MembersSheetModal from "../../components/membersSheetModal";
import SheetModal from "../../components/SheetModal";
import { FlatList } from "react-native-gesture-handler";
import { TaskContext } from "../../context/taskContext";
import { createNewTask } from "../../commons/api";


const AddTask = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [priority, setPriority] = useState<String>("Medium");
  const [members, setMembers] = useState([]);
  const [membersLenght, setMembersLenght] = useState(0);
  const [description, setDescription] = useState<String>("");
  const [date, setDate] = useState<DateData>(null);
  const membersRef = useRef(null);
  const membersModal = useRef(null);
  const calendarRef = useRef<BottomSheetModal>(null);
  const subjectsModal = useRef<BottomSheetModal>(null)
  const [selectedSubject, setSelectedSubject] = useState();
  const { taskStats, fetchTasks } = useContext(TaskContext);
  
  function handleMembers(member: string) {
    if (member == "") {
      return;
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

  function handleSubjectModal() {
    subjectsModal.current.present();
  }
  

  async function saveTask() {

    if (!taskTitle || !priority || !date || !selectedSubject) {
      return Alert.alert("Ingrese todos los datos")
    }


    let data = {
      title: taskTitle,
      description,
      members,
      priority,
      date,
      selectedSubject
    }

    console.log('cola');

    try {
      const result = await createNewTask(data, fetchTasks, navigation);
    } catch (error) {
      console.log(error);
    }
  }

  function renderSubject({ item }) {
    console.log(item);
    let { subject_name, subject_id } = item

    let icons = { "Cálculo": "calculator-outline", "Programación": "code-outline" }
    return (
      <TouchableOpacity key={subject_id} style={styles.subjectsContainer} onPress={() => {
        setSelectedSubject(subject_id)
        setTaskTitle(subject_name)
        subjectsModal.current.close()
      }}>
        <Ionicons name={icons[subject_name]} style={{ left: 10 }} size={20} />
        <Text style={{ fontWeight: "600" }}>{subject_name}</Text>
        <View></View>
      </TouchableOpacity>
    )
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      extraHeight={400}
      extraScrollHeight={50}
    >
      <View style={styles.section}>
        <Text style={styles.title}>Title</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={taskTitle ? taskTitle : ""}

            onChangeText={(text) => setTaskTitle(text)}
          />
          <TouchableOpacity
            onPress={handleSubjectModal}
          >
            <Ionicons name="pencil-outline" size={30} style={styles.icon} />
          </TouchableOpacity>
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
            size={30}
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
            size={30}
            style={{ right: 60, color: '#fff' }}
            onPress={handleMembersModal}
          />
          <Text style={styles.members}>{membersLenght}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Description</Text>
        <View style={styles.inputContainer}>
          <TextInput onEndEditing={(event) => setDescription(event.nativeEvent.text)} style={styles.input} />
          <Ionicons name="receipt-outline" size={30} style={styles.icon} />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => saveTask()}>
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
        setMembers={setMembers}
        setMembersLenght={setMembersLenght}
      />
      <SheetModal
        navigator={navigator}
        ref={subjectsModal}
        backgroundStyle={{ backgroundColor: colors.secondaryBackgroundColor }}
        style={{
          justifyContent: "center",
        }}

      >{
          <FlatList data={taskStats} renderItem={renderSubject} style={styles.flatListSubjects} />
        }</SheetModal>
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
    right: 50,
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
  subjectsContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginVertical: 13,
    backgroundColor: '#fff',
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    borderColor: colors.primaryColor,
    borderTopWidth: 4
  },
  flatListSubjects: {
    paddingHorizontal: 20
  }
});

export default AddTask;
