import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { GetProgress } from "../commons/getters";
import colors from "../commons/colors";


const TasksProgress = () => {
  const [taskStats, setTaskStats] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetProgress()
      setTaskStats(data)
    }
    fetchData()
  }, []);

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

  interface data {
    subject_name: string;
    progress: any;
    completly_tasks: number;
    total_tasks: number;
  }

  const renderItem = (item: data) => {
    let { subject_name, completly_tasks, total_tasks, progress } = item;
    progress = Number(progress)

    let color: string;

    if (progress < 0.5) color = "#E86F6A";
    else if (progress >= 0.5 && progress < 0.75) color = "#DFD263";
    else color = "#85C86D";

    return (
      <View style={styles.renderContainer}>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.title}>{subject_name}</Text>
            {total_tasks != 0 ? <Text style={styles.subtitle}>{`${completly_tasks}/${total_tasks}`}</Text> : <Text style={{ color: colors.primaryColor, textAlign: 'center', fontWeight: 700, paddingTop: 5 }}>Sin tareas!</Text>}
          </View>
          {
            total_tasks != 0 && (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                  {monthNames[month].substring(0, 5)} {day}
                </Text>
              </TouchableOpacity>
            )
          }
        </View>
        {
          total_tasks != 0 ? (
            <View>
              <Progress.Circle
                size={100}
                indeterminate={false}
                progress={progress}
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
          ) : (<View>
            <Text style={{ fontSize: 20, right: 40 }}>🎉✨🎆</Text>
          </View>)
        }
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={taskStats} renderItem={({ item }) => renderItem(item)} />
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
