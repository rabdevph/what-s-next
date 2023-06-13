import createProject from './todo';
import { saveToStorage, retrieveFromStorage, getProjectNames } from './data';

export function isProjectExisting(name) {
  const projectNames = getProjectNames();
  const isExisting = projectNames.some((projectName) => projectName === name);

  if (isExisting) {
    return true;
  }
  return false;
}

export function getSelectedPriority(button) {
  const priorityValue = button.getAttribute('data-priority');
  return priorityValue;
}

export function deserializedProject(projectName) {
  // retrieve project from localStorage
  const project = retrieveFromStorage(projectName);
  // recreate project to use methods inside it
  const projectObject = Object.assign(createProject(), project);
  return projectObject;
}

// CREATE 'PERSONAL' PROJECT FOR NEW USERS
export function PERSONALPROJECT() {
  const projectName = 'PERSONAL';
  const isExisting = isProjectExisting(projectName);
  if (!isExisting) {
    const project = createProject(projectName);
    saveToStorage(project.name, project);
  } else {
    console.log('PERSONAL project already created by default.');
  }
}
