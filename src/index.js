import {
  clickCancelProject,
  clickNavListItems,
  clickNewProject,
} from './utilities/events';

// temporary
// import createProject from './utilities/todo';
// import { saveToStorage } from './utilities/data';

console.log('Hello World!');

// EVENT HANDLERS
clickNavListItems();
clickNewProject();
clickCancelProject();

// const personal = createProject('Personal');
// saveToStorage(personal.name, personal);
