import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const TasksProgress = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  let month = currentDate.getMonth();
  let day = currentDate.getDate();

  let data = [
    { subject: "Calculo 1", progress: 0.2, advance: "4/20" },
    {
      subject: "Programación 2",
      progress: 0.54,
      advance: "16/20",
    },
    {
      subject: "Estadistica",
      progress: 0.9,
      advance: "19/20",
    },
  ];

  interface data {
    subject: string;
    progress: number;
    advance: string;
  }

  const renderItem = (item: data) => {
    let { subject, advance, progress } = item;

    let color: string;

    if (progress < 0.5) color = "#E86F6A";
    else if (progress >= 0.5 && progress < 0.75) color = "#DFD263";
    else color = "#85C86D";

    return (
      <View style={styles.renderContainer}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.title}>{subject}</Text>
            <Text style={styles.subtitle}>{advance}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {monthNames[month].substring(0, 5)} {day}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Progress.Circle
            size={100}
            indeterminate={false}
            progress={item.progress}
            textStyle={styles.pieText}
            borderWidth={0}
            unfilledColor="#474747"
            thickness={9}
            strokeCap="round"
            color={color}
            showsText={true}
            animated={false}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={({ item }) => renderItem(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232229",
    borderRadius: 15,
    flexDirection: "row",
    padding: 30,
    height: 200,
  },
  renderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 150,
  },
  pieText: {
    color: "#fff",
    fontWeight: "600",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    color: "#898989",
    fontSize: 15,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#3168e0",
    borderRadius: 20,
    width: 100,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  textContainer: {
    gap: 20,
  },
});
export default TasksProgress;
