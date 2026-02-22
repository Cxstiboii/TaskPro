import taskStore , { Filters } from "../../store/task-store";

let element;

/**
 * 
 * @param {String} elementId 
 */
export const renderPendingTasks = (elementId) => {

    if( !element )
        element = document.querySelector( elementId )

    if( !element )
        throw new Error(`Element ${elementId} not found`);
    
    element.innerHTML = taskStore.getTasks( Filters.Pending ).length
}