import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";
import { GetTasks } from "../commons/getters";

interface Task {
    id: number,
    title: string,
    date: string,
    description: string,
    priority: number,
}

interface TaskContextType {
    taskStats: Task[]; // Es un array de objetos tipo Task
    setTaskStats: React.Dispatch<React.SetStateAction<Task[]>>;
    fetchTaks: () => void;
}

// Crear el contexto con el tiporr
export const TaskContext = createContext<TaskContextType | undefined>(undefined);


// Proveedor del contexto
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskStats, setTaskStats] = useState<Task[]>([]); // Estado inicial como un array vacío

    const fetchTaks = async () => {
        try {
            const data = await GetTasks();
            setTaskStats(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    useEffect(() => {
        fetchTaks(); // Se ejecuta al montar el contexto
    }, []);
    return (
        <TaskContext.Provider value={{ taskStats, fetchTaks, setTaskStats }}>
            {children}
        </TaskContext.Provider>
    );
};



