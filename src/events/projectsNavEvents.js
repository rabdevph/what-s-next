import {
  addDeleteIcon,
  addDeleteWord,
  addHiddenClass,
  addSelectedNavClass,
  removeDeleteWord,
  removeDeleteIcon,
  removeErrorBgClass,
  removeHiddenClass,
  removeSelectedNavClass,
  clearInput,
  clearContent,
} from '../utilities/controls';

import { removeFromStorage } from '../utilities/data';

import { SELECTEDPRIORITY } from '../utilities/helper';

const todayList = document.getElementById('today-list');
const upcomingList = document.getElementById('upcoming-list');
const personalList = document.getElementById('personal-list');

const newProjectButton = document.getElementById('new-project-button');
const newProjectForm = document.getElementById('new-project-form');
const newProjectName = document.getElementById('new-project-name');

const projectsNavList = document.getElementById('projects-nav-list');

const taskSection = document.getElementById('task-section');

// PROJECTS NAVIGATION LIST
export function clickProjectsNavItem(
  projectsNavItem,
  componentFunc,
  reloadProjectsList
) {
  projectsNavItem.addEventListener('click', () => {
    const projectName = projectsNavItem.dataset.id;

    SELECTEDPRIORITY.splice(0); // clear priority array

    reloadProjectsList(projectsNavList); // reload Projects: ProjectNavItems(projectsNavList)

    // get elements here after reloading the list
    const item = document.querySelector(`[data-id="${projectName}"]`);

    const itemControlWrapper = document.getElementById(
      `project-${projectName.toLowerCase()}-control-wrapper`
    );

    removeSelectedNavClass([todayList, upcomingList, personalList]); // remove selected
    addSelectedNavClass(item); // change background of selected project
    removeHiddenClass([itemControlWrapper, newProjectButton]); // show delete and new project
    componentFunc(taskSection, projectName); // populate task section: Task(taskSection, projectName)
    addHiddenClass([newProjectForm]); // if not hidden, hide new project form
    removeErrorBgClass(newProjectName); // if there's error, remove error class
    clearInput(newProjectName); // clear input
  });
}

// DELETE PROJECT BUTTON
export function clickDeleteProject(element, projectName) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();

    const cancelDelete = document.querySelector(
      `[data-project-cancel-button="${projectName.toLowerCase()}"]`
    );
    const confirmDelete = document.querySelector(
      `[data-project-confirm-button="${projectName.toLowerCase()}"]`
    );
    const text = document.querySelector(`[data-id="${projectName}"] p`);
    const icon = document.querySelector(`[data-id="${projectName}"] img`);

    addDeleteWord(text);
    addDeleteIcon(icon);
    addHiddenClass([element]);
    removeHiddenClass([cancelDelete, confirmDelete]);
  });
}

// CANCEL DELETE PROJECT
export function clickCancelDeleteProject(element, projectName) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();

    const del = document.querySelector(
      `[data-project-delete-button="${projectName.toLowerCase()}"]`
    );
    const confirmDelete = document.querySelector(
      `[data-project-confirm-button="${projectName.toLowerCase()}"]`
    );
    const text = document.querySelector(`[data-id="${projectName}"] p`);
    const icon = document.querySelector(`[data-id="${projectName}"] img`);

    removeDeleteWord(text, projectName);
    removeDeleteIcon(icon);
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
    removeFromStorage(projectName); // delete project from localStorage
    reloadProjectsList(projectsNavList); // reload projects nav list
    clearContent(taskSection);
  });
}
