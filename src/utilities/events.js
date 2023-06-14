import { format } from 'date-fns';

import {
  addDeleteIcon,
  addErrorBgClass,
  addErrorBorderClass,
  addHiddenClass,
  addPrioritySelectedClass,
  removeDeleteIcon,
  removeErrorBgClass,
  removeErrorBorderClass,
  removeHiddenClass,
  removePrioritySelectedClass,
  clearInput,
  addSelectedProjectClass,
  clearContent,
} from './controls';
import { saveToStorage, removeFromStorage } from './data';
import { isProjectExisting, getSelectedPriority } from './helper';
import createProject from './todo';

const SELECTEDPRIORITY = []; // array for priority value

// DEFAULT NAVIGATION LIST - TODAY, UPCOMING, PERSONAL
export function clickNavListItems() {
  const newProjectButton = document.getElementById('new-project-button');
  const newProjectForm = document.getElementById('new-project-form');
  const newProjectName = document.getElementById('new-project-name');
  const navListItems = document.querySelectorAll('.navList__item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', () => {
      console.log(navListItem.id); //

      SELECTEDPRIORITY.splice(0);
      console.log(SELECTEDPRIORITY); //

      removeHiddenClass(newProjectButton);
      addHiddenClass(newProjectForm);
      removeErrorBgClass(newProjectName);
      clearInput(newProjectName);
    });
  });
}

// PROJECTS NAVIGATION LIST
export function clickProject(
  projectItem,
  componentFunc,
  index,
  reloadProjectsList
) {
  const projectsNavList = document.getElementById('projects-nav-list');

  const newProjectButton = document.getElementById('new-project-button');
  const newProjectForm = document.getElementById('new-project-form');
  const newProjectName = document.getElementById('new-project-name');

  projectItem.addEventListener('click', () => {
    const taskSection = document.getElementById('task-section');

    const projectName = projectItem.dataset.id;
    console.log(projectItem.id);
    console.log(projectName);

    SELECTEDPRIORITY.splice(0);
    console.log(SELECTEDPRIORITY);

    // reload projectsNavList
    reloadProjectsList(projectsNavList); // ProjectNavItems(projectsNavList)

    // get elements here after reloading the list
    const projectsNavListItem = document.querySelector(
      `[data-list-no="${index}"]`
    );
    const itemControlWrapper = document.getElementById(
      `project-${index}-control-wrapper`
    );

    addSelectedProjectClass(projectsNavListItem); // change background of selected project
    // change icon of project item

    removeHiddenClass(itemControlWrapper); // show delete project wrapper - controls
    componentFunc(taskSection, projectName); // Task(taskSection, projectName)

    removeHiddenClass(newProjectButton); // if hidden, show new project button
    addHiddenClass(newProjectForm); // if not hidden, hide new project form
    removeErrorBgClass(newProjectName); // if there's error, remove error class
    clearInput(newProjectName); // clear input
  });
}

// DELETE PROJECT BUTTON
export function clickDeleteProject(element, dataIndex, icon) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();

    const cancelDelete = document.querySelector(
      `[data-project-cancel-button="${dataIndex}"]`
    );
    const confirmDelete = document.querySelector(
      `[data-project-confirm-button="${dataIndex}"]`
    );

    addDeleteIcon(icon);
    addHiddenClass(element);
    removeHiddenClass(cancelDelete);
    removeHiddenClass(confirmDelete);
  });
}

// CANCEL DELETE PROJECT
export function clickCancelDeleteProject(element, dataIndex, icon) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();

    const del = document.querySelector(
      `[data-project-delete-button="${dataIndex}"]`
    );
    const confirmDelete = document.querySelector(
      `[data-project-confirm-button="${dataIndex}"]`
    );

    removeDeleteIcon(icon);
    removeHiddenClass(del);
    addHiddenClass(element);
    addHiddenClass(confirmDelete);
  });
}

// CONFIRM DELETE PROJECT
export function clickConfirmDeleteProject(
  element,
  projectName,
  reloadProjectsList
) {
  const projectsNavList = document.getElementById('projects-nav-list');
  const taskSection = document.getElementById('task-section');

  element.addEventListener('click', (e) => {
    e.stopPropagation();
    removeFromStorage(projectName); // delete project
    console.log(`Project [${projectName}] deleted.`);
    reloadProjectsList(projectsNavList); // reload projects nav list
    clearContent(taskSection);
  });
}

// NEW PROJECT BUTTON
export function clickNewProject(reloadProjects) {
  const projectsNavList = document.getElementById('projects-nav-list');
  const taskSection = document.getElementById('task-section');
  const newProjectButton = document.getElementById('new-project-button');
  const newProjectForm = document.getElementById('new-project-form');

  newProjectButton.addEventListener('click', () => {
    reloadProjects(projectsNavList); // ProjectNavItems(projectsNavList);
    clearContent(taskSection); // clear task section
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

// NEW PROJECT NAME - INPUT - CLICKname
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

// PRIORITY BUTTONS
export function clickPriority() {
  const priorityButtonWrapper = document.getElementById('priority-wrapper');
  const priorityButtons = document.querySelectorAll('.taskPriority__button');

  priorityButtons.forEach((priorityButton) => {
    priorityButton.addEventListener('click', () => {
      SELECTEDPRIORITY.splice(0); // clear array every click to store only one value
      SELECTEDPRIORITY.push(getSelectedPriority(priorityButton)); // get priority value then save to array
      console.log(`Priority: ${SELECTEDPRIORITY[0]}`);
      addPrioritySelectedClass(priorityButton, priorityButtonWrapper);
      removeErrorBorderClass(priorityButtonWrapper);
    });
  });
}

// TASK FORM - SUBMIT
export function submitTaskForm(project, reloadTaskComponent, taskSection) {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const taskDate = document.getElementById('task-date');
  const priorityWrapper = document.getElementById('priority-wrapper');
  // const priorityButtons = document.querySelectorAll('.taskPriority__button');

  form.addEventListener('submit', (e) => {
    const task = input.value;
    const selectedDate = new Date(taskDate.value);
    const dueDate = format(selectedDate, 'MMMM d, yyyy');
    const priority = SELECTEDPRIORITY[0];

    e.preventDefault();

    console.log('Form submitted..');
    if (!task || SELECTEDPRIORITY.length === 0) {
      console.log('Form submission failed!');
      if (!task) {
        console.log('Task empty.');
        addErrorBorderClass(input);
      }

      if (SELECTEDPRIORITY.length === 0) {
        console.log('No selected priority.');
        addErrorBorderClass(priorityWrapper);
      }
    } else {
      // save task here
      console.log('Form submission successful!');
      console.log(`Task: ${task}`);
      console.log(`Date: ${dueDate}`);
      console.log(`Priority: ${priority}`);

      // add task to project then save to localStorage
      project.addTask(task, dueDate, priority);
      saveToStorage(project.name, project);

      SELECTEDPRIORITY.splice(0);

      // reload task section - Task(taskSection, projectName)
      reloadTaskComponent(taskSection, project.name);
    }
  });
}

// TASK INPUT
export function clickTaskInput() {
  const input = document.getElementById('task-input');

  input.addEventListener('click', () => {
    removeErrorBorderClass(input);
  });
}

// CANCEL TASK BUTTON
export function clickCancelTask() {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const priorityWrapper = document.getElementById('priority-wrapper');
  const cancel = document.getElementById('cancel-task');
  const addTaskWrapper = document.getElementById('add-task-wrapper');
  const priorityButtons = document.querySelectorAll('.taskPriority__button');

  cancel.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked cancel, hide form');
    SELECTEDPRIORITY.splice(0);
    removePrioritySelectedClass(priorityButtons);
    clearInput(input);
    removeErrorBorderClass(input);
    removeErrorBorderClass(priorityWrapper);
    addHiddenClass(form);
    removeHiddenClass(addTaskWrapper);
  });
}

// ADD TASK BUTTON
export function clickAddTask() {
  const form = document.getElementById('task-form');
  const addTaskWrapper = document.getElementById('add-task-wrapper');
  const addTask = document.getElementById('add-task');

  addTask.addEventListener('click', () => {
    removeHiddenClass(form);
    addHiddenClass(addTaskWrapper);
  });
}

// TASK CHECK BOX
export function checkTask(project, reloadTaskComponent, taskSection) {
  const taskCheckBoxes = document.querySelectorAll('.taskItem__checkbox');

  taskCheckBoxes.forEach((taskCheckbox, taskIndex) => {
    // const taskItemDescription = document.querySelector(
    //   `.taskItem${taskIndex}__description`
    // );

    taskCheckbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        // change status to completed
        project.changeTaskStatus(taskIndex); // change status
        saveToStorage(project.name, project); // save or update localStorage
        // reload task section
        reloadTaskComponent(taskSection, project.name);
      } else {
        // change status to pending
        project.changeTaskStatus(taskIndex); // change status
        saveToStorage(project.name, project); // save or update localStorage
        // reload task section - Task(taskSection, projectName)
        reloadTaskComponent(taskSection, project.name);
      }
    });
  });
}
