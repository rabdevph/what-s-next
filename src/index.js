import ProjectNavItems from './components/Projects';
import Task from './components/TaskSection';
import UpcomingTasks from './components/UpcomingTasks';

import {
  clickCancelProject,
  clickNavListItems,
  clickNewProject,
  clickNewProjectName,
  sumbitNewProject,
  inputNewProjectName,
} from './utilities/events';
import { PERSONALPROJECT } from './utilities/helper';

console.log('Hello World!');
// this will create a PERSONAL default project for new users
PERSONALPROJECT();

const projectsNavList = document.getElementById('projects-nav-list');
ProjectNavItems(projectsNavList); // load projects list

// EVENT HANDLERS
clickNavListItems(ProjectNavItems, Task, UpcomingTasks);
clickNewProject(ProjectNavItems);
clickCancelProject();
sumbitNewProject(ProjectNavItems, projectsNavList);
clickNewProjectName();
inputNewProjectName();
