import React, { createContext, useState, useEffect } from "react";
import { GetProgress } from "../commons/getters";

// Definir el tipo de cada tarea
interface Subject {
    name: string;
    progress: number;
    subject_id: number;
}
interface SubjectContextType {
    subjectStats: Subject[]; // Es un array de objetos tipo Task
    setSubjectStats: React.Dispatch<React.SetStateAction<Subject[]>>;
    fetchSubjects: () => void;
}

export const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const SubjectProvider = ({ children }) => {
    const [subjectStats, setSubjectStats] = useState<Subject[]>([]);

    const fetchSubjects = async () => {
        try {
            const data = await GetProgress();
            setSubjectStats(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchSubjects(); // Se ejecuta al montar el contexto
    }, []);


    return (
        <SubjectContext.Provider value={{ subjectStats, fetchSubjects, setSubjectStats }}>
            {children}
        </SubjectContext.Provider>
    );
}
