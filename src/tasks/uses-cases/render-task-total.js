import  taskStore , { Filters } from "../../store/task-store";

let element;

/**
 * 
 * @param {String} elementId 
 */
export const renderCountTotalTask = ( elementId ) => {
    if (!element)
        element = document.querySelector( elementId );

    if (!element)
        throw new Error(`Element ${ element } not found`);
    
    element.innerHTML = taskStore.getTasks( Filters.All ).length;
    console.log(element)
}