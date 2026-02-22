import { Task } from "../tasks/models/task-models";

export const Filters = {
    All : 'All',
    Pending : 'Pending',
    Completed : 'Completed',
    HighPriority : 'high'
}

const state = {
    tasks : [],
    filter: Filters.All 
}


const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTasks = ( filter = Filters.All ) => {

    // Hago un switch para filtar en que estado estan las tareas y asi obtenerlas
    switch (filter) {
        case Filters.All:
            return [...state.tasks];
        case Filters.Pending:
            return state.tasks.filter( task => !task.completed)

        case Filters.Completed:
            return state.tasks.filter( task => task.completed)
            
        case Filters.HighPriority:
            return state.tasks.filter( task => task.priority === Filters.HighPriority)

        default:
            throw new Error(`Option ${state.filter} is not valid`);
    }
}

const initStore = () => {

    // initStore() es la función que se llama una sola vez cuando la app inicia.
    loadStore();

    if( !localStorage.getItem('state')) saveStateToLocalStorage();
    console.log('InitSTORE')

    // Sincronizar el estado en memoria (state) con lo que está guardado en localStorage.
}

const loadStore = () => {

    // Lee el estado 
    const storageState = localStorage.getItem('state');
    if(!storageState) return;

    const { tasks= [], filter = Filters.All } = JSON.parse( storageState )

    // Remplaza el estado en memoria
    state.tasks = tasks;
    state.filter = filter;
}

const setFilter = ( newFilter = Filters.All) => {
    state.filter = newFilter
    saveStateToLocalStorage();
}

const addTask = ( title , priority = 'low') => {

    // Si el titulo no esta, lanza un error, de lo contrario se agregara al array, mediante la instancia del objeto
    if(!title) throw new Error('Title is required');
        state.tasks.push( new Task ( title, priority ));
    saveStateToLocalStorage();
}

const toggleTask = ( taskId ) => {
    state.tasks = state.tasks.map( task => {
        if(task.id === taskId){
            task.completed = !task.completed
        }

    return task;
    });
}
const deleteTask = ( taskId ) => {
    state.tasks = state.tasks.filter( task => task.id !== taskId);
    saveStateToLocalStorage();
}

const clearCompleted = () => {
    state.tasks = state.tasks.filter( task => !task.completed );
    saveStateToLocalStorage();
}

const deleteAllTasks = () => {
    state.tasks = [];
    saveStateToLocalStorage();
}


const getCurrentFilter = () => {
    return state.filter;
}

export default{
    addTask,
    clearCompleted,
    deleteAllTasks,
    deleteTask,
    getCurrentFilter,
    getTasks,
    initStore,
    loadStore,
    setFilter,
    toggleTask,
}