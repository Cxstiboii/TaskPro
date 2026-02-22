import { v4 as uuid } from 'uuid';


export class Task{

/**
 * 
 * @param {String} title 
 * @param {String} priority 
 */
    constructor( title , priority) {
        this.id = uuid();
        this.title = title
        this.completed = false
        this.priority = priority
        this.createdAt = new Date();
    }
}