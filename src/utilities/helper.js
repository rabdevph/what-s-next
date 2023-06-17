import { addDays, isWithinInterval, parse } from 'date-fns';

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

export function getProjects() {
  const projectNames = getProjectNames();
  const projects = [];

  projectNames.forEach((projectName) => {
    const project = retrieveFromStorage(projectName);
    projects.push(project);
  });

  return projects;
}

// factory function for formatted tasks
function createIsolatedTasks(projName, task, dueDate, priority, status) {
  return {
    projName,
    task,
    dueDate,
    priority,
    status,
  };
}

// isolate task and compile into object
function getIsolatedTasks() {
  const projects = getProjects();
  const isolatedTasks = [];

  projects.forEach((project) => {
    const projectTasks = project.tasks;
    projectTasks.forEach((projectTask) => {
      const formattedTask = createIsolatedTasks(
        project.name,
        projectTask.description,
        projectTask.dueDate,
        projectTask.priority,
        projectTask.status
      );
      isolatedTasks.push(formattedTask);
    });
  });

  return isolatedTasks;
}

export function getUpcomingTasks() {
  const isolatedTasks = getIsolatedTasks();

  const startDate = new Date();
  const endDate = addDays(startDate, 7);

  // use filter method to store the items in array(upComingTasks)
  const upComingTasks = isolatedTasks.filter((task) => {
    const dueDate = parse(task.dueDate, 'MMMM d, yyyy', new Date());
    return isWithinInterval(dueDate, { start: startDate, end: endDate });
  });

  upComingTasks.sort((a, b) => {
    const dateA = parse(a.dueDate, 'MMMM d, yyyy', new Date());
    const dateB = parse(b.dueDate, 'MMMM d, yyyy', new Date());
    return dateA - dateB;
  });

  return upComingTasks;
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
