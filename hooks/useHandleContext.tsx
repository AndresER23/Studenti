import { useContext } from "react";
const useHandleContext = ({ contextParam }) => {
    const context = useContext(contextParam);
    if (!context) {
        throw new Error("useSubjects debe usarse dentro de un SubjectProvider");
    }
    return context;
}

export default useHandleContext;