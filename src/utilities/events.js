import {
  addHiddenClass,
  addErrorBgClass,
  removeErrorBgClass,
  removeHiddenClass,
  clearInput,
} from './controls';
import { saveToStorage } from './data';
import { isProjectExisting } from './helper';
import createProject from './todo';

// DEFAULT NAVIGATION LIST - TODAY, UPCOMING, PERSONAL
export function clickNavListItems() {
  const newProjectButton = document.getElementById('new-project-button');
  const newProjectForm = document.getElementById('new-project-form');
  const newProjectName = document.getElementById('new-project-name');
  const navListItems = document.querySelectorAll('.navList__item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', () => {
      //
      console.log(navListItem.id);

      removeHiddenClass(newProjectButton);
      addHiddenClass(newProjectForm);
      removeErrorBgClass(newProjectName);
      clearInput(newProjectName);
    });
  });
}

// PROJECTS NAVIGATION LIST
export function clickProjectItems(projectItem, componentFunc) {
  const newProjectButton = document.getElementById('new-project-button');
  const newProjectForm = document.getElementById('new-project-form');
  const newProjectName = document.getElementById('new-project-name');

  projectItem.addEventListener('click', () => {
    const taskSection = document.getElementById('task-section');

    const projectDataId = projectItem.dataset.id;
    console.log(projectItem.id);
    console.log(projectDataId);

    componentFunc(taskSection, projectDataId);

    removeHiddenClass(newProjectButton); // if hidden, show new project button
    addHiddenClass(newProjectForm); // if not hidden, hide new project form
    removeErrorBgClass(newProjectName); // if there's error, remove error class
    clearInput(newProjectName); // clear input
  });
}

// NEW PROJECT BUTTON
export function clickNewProject() {
  const newProjectButton = document.getElementById('new-project-button');
  const newProjectForm = document.getElementById('new-project-form');

  newProjectButton.addEventListener('click', () => {
    addHiddenClass(newProjectButton); // hide new project form
    removeHiddenClass(newProjectForm); // show new project button
  });
}

// CANCEL PROJECT BUTTON
export function clickCancelProject() {
  const cancelNewProject = document.getElementById('cancel-new-project');
  const newProjectButton = document.getElementById('new-project-button');
  const newProjectForm = document.getElementById('new-project-form');
  const newProjectName = document.getElementById('new-project-name');

  cancelNewProject.addEventListener('click', (e) => {
    e.preventDefault();

    addHiddenClass(newProjectForm); // hide new project form
    removeHiddenClass(newProjectButton); // show new project button
    removeErrorBgClass(newProjectName); // remove bg error when closed
    clearInput(newProjectName); // clear text
  });
}

// NEW PROJECT FORM - SUBMIT
export function sumbitNewProject(component, targetList) {
  const newProjectName = document.getElementById('new-project-name');
  const newProjectButton = document.getElementById('new-project-button');
  const newProjectForm = document.getElementById('new-project-form');

  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const projectName = newProjectName.value;
    const isExisting = isProjectExisting(projectName.toUpperCase()); // return true if existing

    if (!projectName || isExisting) {
      addErrorBgClass(newProjectName); // if project name empty or existing already
    } else {
      const project = createProject(projectName.toUpperCase()); // create project
      saveToStorage(project.name, project); // save to localStorage
      addHiddenClass(newProjectForm); // hide new project form
      removeHiddenClass(newProjectButton); // show new project button
      clearInput(newProjectName); // clear text
      component(targetList); // ProjectNavItems(projectsNavList) - load newly added project
    }
  });
}

// NEW PROJECT NAME - INPUT - CLICK
export function clickNewProjectName() {
  const newProjectName = document.getElementById('new-project-name');

  newProjectName.addEventListener('click', () => {
    removeErrorBgClass(newProjectName);
  });
}

// NEW PROJECT NAME - INPUT - INPUT
export function inputNewProjectName() {
  const newProjectName = document.getElementById('new-project-name');

  newProjectName.addEventListener('input', () => {
    removeErrorBgClass(newProjectName);
  });
}
