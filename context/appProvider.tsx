import React, { ReactNode } from "react";
import { SubjectProvider } from "./subjectContext";
import { TaskProvider } from "./taskContext";

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <SubjectProvider>
            <TaskProvider>
                {children}
            </TaskProvider>
        </SubjectProvider>
    );
};
