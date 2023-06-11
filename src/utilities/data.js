export function getProjectNames() {
  // get keys(project names) from localStorage
  const names = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    names.push(localStorage.key(i));
  }
  return names;
}

export function saveToStorage(projectName, project) {
  // convert to json and save to localStorage
  localStorage.setItem(projectName, JSON.stringify(project));
}

export function retrieveFromStorage(projectName) {
  // get json from localStorage and convert to object
  const object = localStorage.getItem(projectName);
  return JSON.parse(object);
}

export function removeFromStorage(projectName) {
  // remove from localStorage
  localStorage.removeItem(projectName);
}
