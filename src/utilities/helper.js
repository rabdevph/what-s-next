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
function getCompiledTasks() {
  const projects = getProjects();
  const compiledTasks = [];

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
      compiledTasks.push(formattedTask);
    });
  });

  return compiledTasks;
}

export function getTaskSchedule(scope) {
  const compiledTasks = getCompiledTasks();

  const today = new Date().setHours(0, 0, 0, 0);
  const endDate = addDays(today, 7).setHours(0, 0, 0, 0);

  if (scope === 'TODAY') {
    // show today task
    console.log('show today tasks');

    const todayTasks = compiledTasks.filter((task) => {
      const taskDueDate = parse(
        task.dueDate,
        'MMMM d, yyyy',
        new Date()
      ).setHours(0, 0, 0, 0);

      return taskDueDate === today;
    });

    return todayTasks;
  }

  // show upcoming task
  const upComingTasks = compiledTasks.filter((task) => {
    const dueDate = parse(
      task.dueDate,
      'MMMM d, yyyy',
      new Date().setHours(0, 0, 0, 0)
    );
    return isWithinInterval(dueDate, { start: today, end: endDate });
  });

  upComingTasks.sort((a, b) => {
    const dateA = parse(
      a.dueDate,
      'MMMM d, yyyy',
      new Date().setHours(0, 0, 0, 0)
    );
    const dateB = parse(
      b.dueDate,
      'MMMM d, yyyy',
      new Date().setHours(0, 0, 0, 0)
    );
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
