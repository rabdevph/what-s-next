import { addHiddenClass, removeHiddenClass } from '../utilities/controls';

import { saveToStorage } from '../utilities/data';

// TASK CHECK BOX
export function clickTaskCheckBox(
  checkBoxes,
  project,
  reloadTaskSectionComponent
) {
  checkBoxes.forEach((checkBox, taskIndex) => {
    checkBox.addEventListener('click', (e) => {
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
        reloadTaskSectionComponent(project.name);
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
  reloadTaskSection,
  taskSection
) {
  element.addEventListener('click', (e) => {
    e.stopPropagation();
    project.removeTask(taskIndex); // delete task
    saveToStorage(project.name, project); // update localStorage
    reloadTaskSection(taskSection, project.name); // reload task section
  });
}
