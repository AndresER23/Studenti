import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import colors from "../commons/colors";

interface AgendaProps {
    items: { [date: string]: { name: string; height?: number }[] };
    selected: string;
    min: string;
    max: string;
}
// Componente separado del calendario
const MyAgenda: React.FC<AgendaProps> = ({ items, selected, min, max }) => {
    const priorityColors = {
        padding: 15,
        backgroundColor: '#3f2451',
        display: 'flex',
        flex: 0.4,
        marginHorizontal: 15,
        marginVertical: 18,
    }
    return (
        <Agenda
            items={items}
            selected={selected}
            minDate={min}
            maxDate={max}
            renderItem={(item) => {
                return (
                    <TouchableOpacity style={priorityColors}>
                        <Text style={{ color: '#fff', fontSize: 17 }}>{item.name}</Text>
                    </TouchableOpacity>
                );
            }}

            renderEmptyData={() =>
            (
                <View style={{ flex: 1, backgroundColor: colors.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require("../assets/peopleCelebrating.png")}
                        style={styles.image}
                    />
                    <Text style={styles.title}>There aren't activities for today</Text>
                </View>
            )}

            theme={{
                calendarBackground: '#3f2451', // Fondo oscuro para el calendario
                agendaBackgroundColor: 'red', // Fondo oscuro para la lista de eventos
                selectedDayBackgroundColor: '#1E90FF', // Color de selección
                todayTextColor: '#ffffff', // Color del texto del día actual
                dayTextColor: '#ffffff', // Color del texto de los días
                agendaKnobColor: '#1E90FF', // Color del botón deslizable
                reservationsBackgroundColor: colors.backgroundColor
            }}
            styles={{
                calendarBackground: '#121212', // Fondo oscuro para el calendario
                agendaBackgroundColor: '#121212', // F

            }}

        />
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
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
});

export default MyAgenda;
