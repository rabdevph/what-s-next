import { format } from 'date-fns';

import {
  addDeleteIcon,
  addDeleteWord,
  addErrorBgClass,
  addErrorBorderClass,
  addHiddenClass,
  addPrioritySelectedClass,
  addSelectedNavClass,
  removeDeleteIcon,
  removeErrorBgClass,
  removeErrorBorderClass,
  removeHiddenClass,
  removePrioritySelectedClass,
  clearInput,
  clearContent,
  removeDeleteWord,
  removeSelectedNavClass,
} from './controls';
import { saveToStorage, removeFromStorage } from './data';
import { isProjectExisting, getSelectedPriority } from './helper';
import createProject from './todo';

// CONSTANTS
const SELECTEDPRIORITY = []; // array for priority value

const todayList = document.getElementById('today-list');
const upcomingList = document.getElementById('upcoming-list');
const personalList = document.getElementById('personal-list');
const newProjectButton = document.getElementById('new-project-button');
const newProjectForm = document.getElementById('new-project-form');
const newProjectName = document.getElementById('new-project-name');
const navListItems = document.querySelectorAll('.navList__item');
const projectsNavList = document.getElementById('projects-nav-list');
const cancelNewProject = document.getElementById('cancel-new-project');
const taskSection = document.getElementById('task-section');

// DEFAULT NAVIGATION LIST - TODAY, UPCOMING, PERSONAL
export function clickNavListItems(
  projectComponent,
  taskComponent,
  taskOverviewComponent
) {
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', () => {
      clearContent(taskSection);

      if (navListItem.id === 'today-list') {
        addSelectedNavClass(todayList);
        removeSelectedNavClass([upcomingList, personalList]);

        taskOverviewComponent(taskSection, 'TODAY');
      }

      if (navListItem.id === 'upcoming-list') {
        console.log(navListItem.id);

        addSelectedNavClass(upcomingList);
        removeSelectedNavClass([todayList, personalList]);
        taskOverviewComponent(taskSection, 'UPCOMING');
      }

      if (navListItem.id === 'personal-list') {
        // PERSONAL NAV
        const PERSONAL = personalList.getAttribute('data-id');
        addSelectedNavClass(personalList);
        removeSelectedNavClass([todayList, upcomingList]);
        taskComponent(taskSection, PERSONAL); // populate task section: Task(taskSection)
      }

      projectComponent(projectsNavList); // reload projects list: ProjectNavItems(projectsNavList)

      SELECTEDPRIORITY.splice(0);

      removeHiddenClass([newProjectButton]);
      addHiddenClass([newProjectForm]);
      removeErrorBgClass(newProjectName);
      clearInput(newProjectName);
    });
  });
}

// PROJECTS NAVIGATION LIST
export function clickProject(
  listItem,
  projectIndex,
  componentFunc,
  reloadProjectsList
) {
  listItem.addEventListener('click', () => {
    const projectName = listItem.dataset.id;

    SELECTEDPRIORITY.splice(0); // clear priority array

    reloadProjectsList(projectsNavList); // reload Projects: ProjectNavItems(projectsNavList)

    // get elements here after reloading the list
    const projectsNavListItem = document.querySelector(
      `[data-list-no="${projectIndex}"]`
    );
    const itemControlWrapper = document.getElementById(
      `project-${projectIndex}-control-wrapper`
    );

    removeSelectedNavClass([todayList, upcomingList, personalList]); // remove selected
    addSelectedNavClass(projectsNavListItem); // change background of selected project
    removeHiddenClass([itemControlWrapper, newProjectButton]); // show delete and new project
    componentFunc(taskSection, projectName); // populate task section: Task(taskSection, projectName)
    addHiddenClass([newProjectForm]); // if not hidden, hide new project form
    removeErrorBgClass(newProjectName); // if there's error, remove error class
    clearInput(newProjectName); // clear input
  });
}

// DELETE PROJECT BUTTON
export function clickDeleteProject(element, dataIndex) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();

    const cancelDelete = document.querySelector(
      `[data-project-cancel-button="${dataIndex}"]`
    );
    const confirmDelete = document.querySelector(
      `[data-project-confirm-button="${dataIndex}"]`
    );
    const itemText = document.querySelector(`.item${dataIndex}__text`);
    const itemIcon = document.querySelector(`.item${dataIndex}__icon`);

    addDeleteWord(itemText);
    addDeleteIcon(itemIcon);
    addHiddenClass([element]);
    removeHiddenClass([cancelDelete, confirmDelete]);
  });
}

// CANCEL DELETE PROJECT
export function clickCancelDeleteProject(element, dataIndex) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();

    const del = document.querySelector(
      `[data-project-delete-button="${dataIndex}"]`
    );
    const confirmDelete = document.querySelector(
      `[data-project-confirm-button="${dataIndex}"]`
    );
    const itemText = document.querySelector(`.item${dataIndex}__text`);
    const itemIcon = document.querySelector(`.item${dataIndex}__icon`);
    const listItem = document.querySelector(`.item${dataIndex}`);
    const listItemId = listItem.getAttribute('data-id');

    removeDeleteWord(itemText, listItemId);
    removeDeleteIcon(itemIcon);
    removeHiddenClass([del]);
    addHiddenClass([element, confirmDelete]);
  });
}

// CONFIRM DELETE PROJECT
export function clickConfirmDeleteProject(
  element,
  projectName,
  reloadProjectsList
) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();
    removeFromStorage(projectName); // delete project
    reloadProjectsList(projectsNavList); // reload projects nav list
    clearContent(taskSection);
  });
}

// NEW PROJECT BUTTON
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

// PRIORITY BUTTONS
export function clickPriority() {
  const priorityButtonWrapper = document.getElementById('priority-wrapper');
  const priorityButtons = document.querySelectorAll('.taskPriority__button');

  priorityButtons.forEach((priorityButton) => {
    priorityButton.addEventListener('click', () => {
      SELECTEDPRIORITY.splice(0); // clear array every click to store only one value
      SELECTEDPRIORITY.push(getSelectedPriority(priorityButton)); // get priority value then save to array
      addPrioritySelectedClass(priorityButton, priorityButtonWrapper);
      removeErrorBorderClass(priorityButtonWrapper);
    });
  });
}

// TASK FORM - SUBMIT
export function submitTaskForm(project, reloadTaskComponent) {
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

    if (!task || SELECTEDPRIORITY.length === 0) {
      if (!task) {
        addErrorBorderClass(input);
      }

      if (SELECTEDPRIORITY.length === 0) {
        addErrorBorderClass(priorityWrapper);
      }
    } else {
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
    SELECTEDPRIORITY.splice(0);
    removePrioritySelectedClass(priorityButtons);
    clearInput(input);
    removeErrorBorderClass(input);
    removeErrorBorderClass(priorityWrapper);
    addHiddenClass([form]);
    removeHiddenClass([addTaskWrapper]);
  });
}

// ADD TASK BUTTON
export function clickAddTask() {
  const form = document.getElementById('task-form');
  const addTaskWrapper = document.getElementById('add-task-wrapper');
  const addTask = document.getElementById('add-task');

  addTask.addEventListener('click', () => {
    removeHiddenClass([form]);
    addHiddenClass([addTaskWrapper]);
  });
}

// TASK CHECK BOX
export function checkTask(project, reloadTaskComponent) {
  const taskCheckBoxes = document.querySelectorAll('.taskItem__checkbox');

  taskCheckBoxes.forEach((taskCheckbox, taskIndex) => {
    taskCheckbox.addEventListener('click', (e) => {
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

// DELETE TASK
export function clickDeleteTask(element, dataIndex) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();

    const cancelDelete = document.querySelector(
      `[data-task-cancel-button="${dataIndex}"]`
    );
    const confirmDelete = document.querySelector(
      `[data-task-confirm-button="${dataIndex}"]`
    );

    addHiddenClass([element]);
    removeHiddenClass([cancelDelete, confirmDelete]);
  });
}

// CANCEL DELETE TASK
export function clickCancelDeleteTask(element, dataIndex) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();

    const del = document.querySelector(
      `[data-task-delete-button="${dataIndex}"]`
    );
    const confirmDelete = document.querySelector(
      `[data-task-confirm-button="${dataIndex}"]`
    );

    removeHiddenClass([del]);
    addHiddenClass([element, confirmDelete]);
  });
}

// CONFIRM DELETE TASK
export function clickConfirmDeleteTask(
  element,
  project,
  taskIndex,
  reloadTaskSection
) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();
    project.removeTask(taskIndex); // delete task
    saveToStorage(project.name, project); // update localStorage
    reloadTaskSection(taskSection, project.name); // reload task section
  });
}
