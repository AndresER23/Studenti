import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import MyAgenda from "./agenda";
import { TaskContext } from "../context/taskContext";
import { format } from "date-fns";


const TodayTask = () => {
  const today = new Date().toISOString().split('T')[0]; // "2025-03-14"
  const { taskStats } = useContext(TaskContext)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "yyyy-MM-dd");
  };

  const formattedItems = taskStats.reduce((acc: any, task) => {

    const formattedDate = formatDate(task.date);

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }

    acc[formattedDate].push({
      name: task.title,
      id: task.id,
      priority: task.priority
    });

    return acc;
  }, {});
  
  console.log(formattedItems)
  return (
    <View style={{ flex: 1, }}>
      <MyAgenda
        items={formattedItems}
        selected={today}
        min={'2024-03-15'}
        max={'2026-03-15'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#232229",
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});


export default TodayTask;
