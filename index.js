import { saveTask, getTasks, onGetTasks, deleteTask, getOneTask, updateTask } from './firebase.js'

const taskForm = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {
        tasksContainer.innerHTML  = "";
        querySnapshot.forEach(doc => { /* onSnapShot: para ver mas ejemplos y profundizar sobre esta funcion de firebase que permite leer dato ver documentacion de firebase asegurandose de su version en este caso la 9 lo cual puede verse en el siguiente enlace https://firebase.google.com/docs/firestore/query-data/listen y la ruta intuitiva en caso de que el enlace cambie seri firebase>documentacion>cloud firestore>leer datos>Detectar actualizaciones en tiempo real (viendo la pagina en español)*/
            const task = doc.data();
            tasksContainer.innerHTML += `
                <div class="card card-body mt-2 border-primary">
                    <h3 class="h5">${task.title}</h3>
                    <p>${task.description}</p>
                    <div>
                        <button class='btn btn-primary btn-delete' data-id="${doc.id}">Delete</button>
                        <button class='btn btn-secondary btn-edit' data-id="${doc.id}">Edit</button>
                    </div>
                </div>
            `;
        });

        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')

        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target: { dataset }}) => {
                deleteTask(dataset.id)
            })
        })

        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const doc = await getOneTask(e.target.dataset.id)
                const oneTask = doc.data()
                
                taskForm['task-title'].value = oneTask.title
                taskForm['task-description'].value = oneTask.description

                editStatus = true;
                id = doc.id;

                taskForm['btn-task-save'].innerText = 'Update'
            })
        })
    });
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = taskForm['task-title']
    const description = taskForm['task-description']

    if (!editStatus) {
        saveTask(title.value, description.value)
    } else {
        updateTask(id, {
            title: title.value,
            description: description.value
        });
        editStatus = false
        taskForm['btn-task-save'].innerText = 'Save'
    }
    taskForm.reset()
})
