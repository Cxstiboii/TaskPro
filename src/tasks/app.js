    import { renderCountTotalTask } from "./uses-cases/render-task-total";
    import { renderHighPriorityTasks } from "./uses-cases/render-high-priority";
    import { renderPendingTasks , renderTasks, renderCountCompletedTask, } from "./uses-cases";
    import html from './app.html?raw'
    import taskStore , { Filters } from "../store/task-store";


    // 
    const ElementsIDs = {
        TaskList : '#task-list',
        inputTask : '#input-task',
        SelectPriority : '#select-priority',
        BtnAdd : '#btn-add',
        countTotalLabel   : '#count-total',
        countPendingLabel : '#count-pending',
        countDoneLabel    : '#count-done',
        countHighLabel    : '#count-high',
        TaskFilters       : '.btn-filter',
        ClearCompleted    : '#btn-clear-done',
        deleteAllTask     : '#btn-clear-all',
    }

    export const App = (elementId) => {


        // Actualizar Contador Tareas Pendientes
        const updatePendingCount = () => {
            renderPendingTasks( ElementsIDs.countPendingLabel );
        }

        // Actualizar Contador Tareas Totales
        const updateCountTotalTask = () => {
            renderCountTotalTask( ElementsIDs.countTotalLabel );
        }

        // Actualizar Contador Tareas Completadas
        const updateCountCompletedTask = () => {
            renderCountCompletedTask( ElementsIDs.countDoneLabel );
        }

        // Actualizar Contador Tareas Alta Prioridad

        const updateCountHighPriorityTasks = () => {
            renderHighPriorityTasks( ElementsIDs.countHighLabel );
        }

        const displayTasks = () => {
            const tasks = taskStore.getTasks( taskStore.getCurrentFilter() );
            renderTasks( ElementsIDs.TaskList, tasks );
            updatePendingCount();
            updateCountTotalTask(); 
            updateCountCompletedTask();
            updateCountHighPriorityTasks();
        }


        // Cuando la funcion app se llama
        (() => {
            const app = document.createElement('div');
            app.innerHTML = html;
            document.querySelector(elementId).append( app );

            displayTasks();
        })();


        // Referencia HTML
        const taskListArticle = document.querySelector( ElementsIDs.TaskList );
        const newTitleInput = document.querySelector( ElementsIDs.inputTask );
        const selectPriority = document.querySelector( ElementsIDs.SelectPriority );
        const btnAdd = document.querySelector( ElementsIDs.BtnAdd );
        const btnFilters = document.querySelectorAll( ElementsIDs.TaskFilters );
        const clearCompletedBtn = document.querySelector( ElementsIDs.ClearCompleted );
        const deleteAllTask = document.querySelector( ElementsIDs.deleteAllTask );

        // Añadir un task
        const handleAddTask = (event) => {

            if (event.type === 'keyup' && event.key !== 'Enter') return;

            // Usamos la referencia directa al input, no el target del evento
            const title = newTitleInput.value.trim();       

            if (title.length === 0) return;  

            const priority = selectPriority.value;      
            taskStore.addTask(title, priority);     

            // UI Updates
            displayTasks();
            newTitleInput.value = ''; // Limpiamos usando la referencia directa
        };

        btnAdd.addEventListener('click', handleAddTask);
        newTitleInput.addEventListener('keyup', handleAddTask);
        
        // Marcar completado un task
        taskListArticle.addEventListener('click', (event) => {
            const toggleBtn = event.target.closest('.btn-toggle')
            if(!toggleBtn) return;

            const article = toggleBtn.parentElement.parentElement;
            const taskId = article.getAttribute('data-id')

            taskStore.toggleTask(taskId);
            displayTasks();
        });

        // Eliminar un tasks
        taskListArticle.addEventListener('click' , (event) => {
            const isBtnDelete = event.target.className === 'btn-delete';
            const element = event.target.closest('[data-id]');

            if(!element || !isBtnDelete) return;

            taskStore.deleteTask(element.getAttribute('data-id'));
            displayTasks();
        })

        // Filtrar por categoriga
        btnFilters.forEach(element => {
            

            element.addEventListener('click' , (element) => {
                btnFilters.forEach( el => el.classList.remove('active'));
                element.target.classList.add('active');

                switch (element.target.dataset.filter) {
                    case 'all':
                        taskStore.setFilter( Filters.All );
                        break;

                    case 'pending':
                        taskStore.setFilter( Filters.Pending );
                        break;

                    case 'completed':
                        taskStore.setFilter( Filters.Completed );
                        break;

                    case 'high':
                        taskStore.setFilter( Filters.HighPriority );
                        break;
                }

            displayTasks();
            });
        });

        // Limpiar completadas
        clearCompletedBtn.addEventListener('click', () => {
            taskStore.clearCompleted();
            displayTasks();
        })

        // Limpiar todos
        deleteAllTask.addEventListener('click' , () => {
            taskStore.deleteAllTasks();
            displayTasks();
        })
    }