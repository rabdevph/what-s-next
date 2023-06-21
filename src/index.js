import ProjectsNav from './components/ProjectsNav';
import TaskSection from './components/TaskSection';
import TaskOverview from './components/TaskOverview';

import clickDefaultNavItem from './events/eventsDefaultNav';
import {
  clickNewProject,
  clickCancelProject,
  sumbitNewProject,
  clickNewProjectName,
  inputNewProjectName,
} from './events/eventsNewProject';

import { PERSONALPROJECT } from './utilities/helper';

console.log('Hello World!');
// create a PERSONAL project(default) for first time users
PERSONALPROJECT();

const projectsNavList = document.getElementById('projects-nav-list');
// load projects list
ProjectsNav(projectsNavList);

// const taskSection = document.getElementById('task-section');
TaskOverview('TODAY');

// EVENT HANDLERS
// DEFAULT NAV -  TODAY, UPCOMING, PERSONAL
clickDefaultNavItem(ProjectsNav, TaskSection, TaskOverview);

// NEW PROJECT
clickNewProject(ProjectsNav);
clickCancelProject();
sumbitNewProject(ProjectsNav, projectsNavList);
clickNewProjectName();
inputNewProjectName();
