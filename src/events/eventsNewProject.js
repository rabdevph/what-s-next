import {
  addErrorBgClass,
  addHiddenClass,
  removeErrorBgClass,
  removeHiddenClass,
  removeSelectedNavClass,
  clearContent,
  clearInput,
} from '../utilities/controls';
import { isProjectExisting } from '../utilities/helper';
import { saveToStorage } from '../utilities/data';
import createProject from '../utilities/todo';

const todayList = document.getElementById('today-list');
const upcomingList = document.getElementById('upcoming-list');
const personalList = document.getElementById('personal-list');
const newProjectButton = document.getElementById('new-project-button');
const newProjectForm = document.getElementById('new-project-form');
const newProjectName = document.getElementById('new-project-name');
const cancelNewProject = document.getElementById('cancel-new-project');

const projectsNavList = document.getElementById('projects-nav-list');

const taskSection = document.getElementById('task-section');

export function clickNewProject(reloadProjects) {
  newProjectButton.addEventListener('click', () => {
    removeSelectedNavClass([todayList, upcomingList, personalList]); // remove selected
    reloadProjects(projectsNavList); // ProjectNavItems(projectsNavList);
    clearContent(taskSection); // clear task section
    addHiddenClass([newProjectButton]); // hide new project form
    removeHiddenClass([newProjectForm]); // show new project button
  });
}

// CANCEL PROJECT BUTTON
export function clickCancelProject() {
  cancelNewProject.addEventListener('click', (e) => {
    e.preventDefault();

    addHiddenClass([newProjectForm]); // hide new project form
    removeHiddenClass([newProjectButton]); // show new project button
    removeErrorBgClass(newProjectName); // remove bg error when closed
    clearInput(newProjectName); // clear text
  });
}

// NEW PROJECT FORM - SUBMIT
export function sumbitNewProject(component, targetList) {
  newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const projectName = newProjectName.value;
    const isExisting = isProjectExisting(projectName.toUpperCase()); // return true if existing

    if (!projectName || isExisting) {
      addErrorBgClass(newProjectName); // if project name empty or existing already
    } else {
      const project = createProject(projectName.toUpperCase()); // create project
      saveToStorage(project.name, project); // save to localStorage
      addHiddenClass([newProjectForm]); // hide new project form
      removeHiddenClass([newProjectButton]); // show new project button
      clearInput(newProjectName); // clear text
      component(targetList); // ProjectNavItems(projectsNavList) - load newly added project
    }
  });
}

// NEW PROJECT NAME - INPUT - CLICKname
export function clickNewProjectName() {
  newProjectName.addEventListener('click', () => {
    removeErrorBgClass(newProjectName);
  });
}

// NEW PROJECT NAME - INPUT - INPUT
export function inputNewProjectName() {
  newProjectName.addEventListener('input', () => {
    removeErrorBgClass(newProjectName);
  });
}
