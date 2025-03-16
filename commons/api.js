import { CREATE_TASK_URL } from "./constans"

export async function createNewTask(data, fetchSubjects, navigation) {
    try {
        const res = await fetch(CREATE_TASK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        fetchSubjects();

        navigation.goBack();
        alert("Tarea guardada");

        return result;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

