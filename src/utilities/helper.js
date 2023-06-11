import createProject from './todo';
import { saveToStorage, getProjectNames } from './data';

export function isProjectExisting(name) {
  const projectNames = getProjectNames();
  const isExisting = projectNames.some((projectName) => projectName === name);

  if (isExisting) {
    return true;
  }
  return false;
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
