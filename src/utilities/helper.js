import { getProjectNames } from './data';

export function isProjectExisting(name) {
  const projectNames = getProjectNames();
  const isExisting = projectNames.some((projectName) => projectName === name);

  if (isExisting) {
    return true;
  }
  return false;
}

export function ttt() {
  //
}
