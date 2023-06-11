import {
  clickCancelProject,
  clickNavListItems,
  clickNewProject,
  clickNewProjectName,
  sumbitNewProject,
} from './utilities/events';
import { PERSONALPROJECT } from './utilities/helper';

console.log('Hello World!');

// this will create a PERSONAL default project for new users
PERSONALPROJECT();

// EVENT HANDLERS
clickNavListItems();
clickNewProject();
clickCancelProject();
sumbitNewProject();
clickNewProjectName();
