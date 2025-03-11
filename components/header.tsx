import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = ({ searching, setSearching }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titles}>
        <Text style={styles.subTitle}>Hi Andrés</Text>
        <Text style={styles.title}>Have a productive today</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Task"
          placeholderTextColor={"#828282"}
          onFocus={() => setSearching(true)}
          onBlur={() => setSearching(false)}
        />
        <Ionicons
          name="search-outline"
          size={20}
          style={styles.searchIcon}
          color={"#ACACAE"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#232229",
    borderRadius: 10,
    color: "#ACACAE",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
  },
  searchIcon: {
    color: "#fff",
  },
  title: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
  },
  subTitle: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 15,
  },
  container: {
    gap: 20,
  },
  titles: {
    gap: 5,
  },
});

export default Header;
