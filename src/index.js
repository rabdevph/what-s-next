import ProjectNavItems from './components/Projects';

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
const projectsNavList = document.getElementById('projects-nav-list');
ProjectNavItems(projectsNavList);

// this will create a PERSONAL default project for new users
PERSONALPROJECT();

// EVENT HANDLERS
clickNavListItems();
clickNewProject();
clickCancelProject();
sumbitNewProject(ProjectNavItems, projectsNavList);
clickNewProjectName();
inputNewProjectName();
