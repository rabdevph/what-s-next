import {
  toggleHiddenClass,
  addErrorBgClass,
  removeErrorBgClass,
  clearInput,
} from './controls';
import { saveToStorage } from './data';
import { isProjectExisting } from './helper';
import createProject from './todo';

// DEFAULT NAVIGATION LIST - TODAY, UPCOMING, PERSONAL
export function clickNavListItems() {
  const navListItems = document.querySelectorAll('.navList__item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', () => {
      //
      console.log(navListItem.id);
    });
  });
}

// PROJECTS NAVIGATION LIST
export function clickProjectItems(item) {
  item.addEventListener('click', () => {
    console.log(item.id);
  });
}

// NEW PROJECT BUTTON
export function clickNewProject() {
  const newProjectButton = document.getElementById('newProjectButton');
  const newProjectForm = document.getElementById('newProjectForm');

  newProjectButton.addEventListener('click', () => {
    toggleHiddenClass(newProjectForm); // hide new project form
    toggleHiddenClass(newProjectButton); // show new project button
  });
}

// CANCEL PROJECT BUTTON
export function clickCancelProject() {
  const cancelNewProject = document.getElementById('cancelNewProject');
  const newProjectButton = document.getElementById('newProjectButton');
  const newProjectForm = document.getElementById('newProjectForm');
  const newProjectName = document.getElementById('newProjectName');

  cancelNewProject.addEventListener('click', (e) => {
    e.preventDefault();

    toggleHiddenClass(newProjectForm); // hide new project form
    toggleHiddenClass(newProjectButton); // show new project button
    removeErrorBgClass(newProjectName); // remove bg error when closed
    clearInput(newProjectName); // clear text
  });
}

// NEW PROJECT FORM - SUBMIT
export function sumbitNewProject(component, targetList) {
  const newProjectName = document.getElementById('newProjectName');
  const newProjectButton = document.getElementById('newProjectButton');
  const newProjectForm = document.getElementById('newProjectForm');

  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const projectName = newProjectName.value;
    const isExisting = isProjectExisting(projectName.toUpperCase()); // return true if existing

    if (!projectName || isExisting) {
      addErrorBgClass(newProjectName); // if project name empty or existing already
    } else {
      const project = createProject(projectName.toUpperCase()); // create project
      saveToStorage(project.name, project); // save to localStorage
      toggleHiddenClass(newProjectForm); // hide new project form
      toggleHiddenClass(newProjectButton); // show new project button
      clearInput(newProjectName); // clear text
      component(targetList); // ProjectNavItems(projectsNavList) - load newly added project
    }
  });
}

// NEW PROJECT NAME - INPUT
export function clickNewProjectName() {
  const newProjectName = document.getElementById('newProjectName');

  newProjectName.addEventListener('click', () => {
    removeErrorBgClass(newProjectName);
  });
}
