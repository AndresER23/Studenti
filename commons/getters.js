import { GET_TASKS_URL, GET_SUBJECTS_URL, GET_PROGRESS_URL } from './contansts'

export function GetTasks() {
  return fetch(GET_TASKS_URL)
    .then(res => res.json())
    .then(data => {
      return data; // Aseguramos de retornar los datos
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
    });
}

export function GetSubjects() {
  return fetch(GET_SUBJECTS_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data; // Aseguramos de retornar los datos
    })
    .catch(error => {
      console.error('Error fetching subjects:', error);
    });
}

export function GetProgress() {
  return fetch(GET_PROGRESS_URL)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res
    })
}
