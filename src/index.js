import ProjectsNav from './components/ProjectsNav';
import Task from './components/TaskSection';
import TaskOverview from './components/TaskOverview';

import clickDefaultNavItem from './events/defaultNavEvents';

import {
  clickCancelProject,
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
ProjectsNav(projectsNavList); // load projects list

const taskSection = document.getElementById('task-section');
TaskOverview(taskSection, 'TODAY');

// EVENT HANDLERS
// DEFAULT NAV -  TODAY, UPCOMING, PERSONAL
clickDefaultNavItem(ProjectsNav, Task, TaskOverview);

clickNewProject(ProjectsNav);
clickCancelProject();
sumbitNewProject(ProjectsNav, projectsNavList);
clickNewProjectName();
inputNewProjectName();
