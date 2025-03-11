import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface searchingTasksProps { }

const searchingTasks = ({ tasks }) => {
    return (
        <View style={styles.container}>
            <Text>searchingTasks</Text>
        </View>
    );
};

export default searchingTasks;

const styles = StyleSheet.create({
    container: {}
});
