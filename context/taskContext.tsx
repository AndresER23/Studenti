import React, { createContext, useState, useEffect, ReactNode } from "react";
import { GetProgress } from "../commons/getters";


// Definir el tipo de cada tarea
interface Task {
    name: string;
    progress: number;
    subject_id: number;
}

// Definir el tipo del contexto
interface TaskContextType {
    taskStats: Task[]; // Es un array de objetos tipo Task
    setTaskStats: React.Dispatch<React.SetStateAction<Task[]>>;
    fetchTasks: () => void;
}

// Crear el contexto con el tipo
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Proveedor del contexto
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskStats, setTaskStats] = useState<Task[]>([]); // Estado inicial como un array vacío

    const fetchTasks = async () => {
        try {
            const data = await GetProgress();
            setTaskStats(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks(); // Se ejecuta al montar el contexto
    }, []);

    return (
        <TaskContext.Provider value={{ taskStats, fetchTasks, setTaskStats }}>
            {children}
        </TaskContext.Provider>
    );
};



