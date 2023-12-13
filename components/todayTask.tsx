import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";

const TodayTask = () => {
  const [todayTask, setTodayTask] = useState();

  return (
    <View style={styles.container}>
      {!todayTask ? (
        <View>
          <Image
            source={require("../assets/peopleCelebrating.png")}
            style={styles.image}
          />
          <Text style={styles.title}>There aren't activities for today</Text>
        </View>
      ) : (
        <Text>si hay</Text>
      )}
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
