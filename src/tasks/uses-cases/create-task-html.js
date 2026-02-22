import { Task } from "../models/task-models";

/**
 * 
 * @param {Task} task 
 */
export const createTaskHTML = ( task ) => {
    if (!task) throw new Error('A task object is required');
    
    const{ completed, title, id, createdAt, priority } = task
    const html = `

            <div class="task-check">
                <button class="btn-toggle" data-id=" ${ id }"> </button>
            </div>
            <div class="task-body">
                <p class="task-title">${ title }</p>
                <div class="task-meta">
                    <span class="badge badge-[high|med|low]">${ priority }</span>
                    <span class="task-date">${ createdAt }</span>
                </div>
            </div>
            <button class="btn-delete">✕</button>
    
    `

    const articleTaskItem = document.createElement('article');
    articleTaskItem.innerHTML = html
    articleTaskItem.setAttribute('data-id', id, `${ completed ? 'checked' : ''}`)
    articleTaskItem.classList.add(`task-item`, `priority-${task.priority}`,  )

    
    // const divTaskList = document.querySelector('#task-list');
    // divTaskList.innerHTML = html


    if( task.completed )
        articleTaskItem.classList.add('completed');
    return articleTaskItem;
}