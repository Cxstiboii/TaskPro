import './style.css'
import { App } from './tasks/app';
import taskStore from '../src/store/task-store.js';


taskStore.initStore();
App('#app');