import { format } from 'date-fns';

import {
  addErrorBgClass,
  addErrorBorderClass,
  addHiddenClass,
  addPrioritySelectedClass,
  removeErrorBgClass,
  removeErrorBorderClass,
  removeHiddenClass,
  removePrioritySelectedClass,
  clearInput,
} from './controls';
import { saveToStorage } from './data';
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
export function clickProjectItems(projectItem, componentFunc) {
  const newProjectButton = document.getElementById('new-project-button');
  const newProjectForm = document.getElementById('new-project-form');
  const newProjectName = document.getElementById('new-project-name');

  projectItem.addEventListener('click', () => {
    const taskSection = document.getElementById('task-section');

    const projectDataId = projectItem.dataset.id;
    console.log(projectItem.id);
    console.log(projectDataId);

    SELECTEDPRIORITY.splice(0);
    console.log(SELECTEDPRIORITY); //

    componentFunc(taskSection, projectDataId); // Task(taskSection, projectName)

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
export function submitTaskForm() {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const taskDate = document.getElementById('task-date');
  const priorityWrapper = document.getElementById('priority-wrapper');
  const priorityButtons = document.querySelectorAll('.taskPriority__button');

  form.addEventListener('submit', (e) => {
    const inputValue = input.value;
    const selectedDate = new Date(taskDate.value);
    const formattedDate = format(selectedDate, 'MMMM d, yyyy');

    e.preventDefault();

    console.log('Form submitted..');
    if (!inputValue || SELECTEDPRIORITY.length < 1) {
      console.log('Form submission failed!');
      if (!inputValue) {
        console.log('Task empty.');
        addErrorBorderClass(input);
      }

      if (SELECTEDPRIORITY.length < 1) {
        console.log('No selected priority.');
        addErrorBorderClass(priorityWrapper);
      }
    } else {
      // save task here
      console.log('Form submission successful!');
      console.log(`Task: ${inputValue}`);
      console.log(`Date: ${formattedDate}`);
      console.log(`Priority: ${SELECTEDPRIORITY[0]}`);

      // then clear elements class and value
      SELECTEDPRIORITY.splice(0);
      clearInput(input);
      removePrioritySelectedClass(priorityButtons);
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
  const addTask = document.getElementById('add-task');
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
    removeHiddenClass(addTask);
  });
}

// ADD TASK BUTTON
export function clickAddTask() {
  const form = document.getElementById('task-form');
  const addTask = document.getElementById('add-task');

  addTask.addEventListener('click', () => {
    removeHiddenClass(form);
    addHiddenClass(addTask);
  });
}
