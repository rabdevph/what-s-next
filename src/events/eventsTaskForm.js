import format from 'date-fns/format';

import {
  addErrorBorderClass,
  addHiddenClass,
  addPrioritySelectedClass,
  removeErrorBorderClass,
  removeHiddenClass,
  removePrioritySelectedClass,
  clearInput,
} from '../utilities/controls';

import { saveToStorage } from '../utilities/data';

import { SELECTEDPRIORITY, getSelectedPriority } from '../utilities/helper';

const TASK_SECTION = document.getElementById('task-section');

export function clickInput(element) {
  element.addEventListener('click', () => {
    removeErrorBorderClass(element);
  });
}

export function clickPriority(button, buttonWrapper) {
  button.addEventListener('click', () => {
    SELECTEDPRIORITY.splice(0); // clear array every click to store only one value
    SELECTEDPRIORITY.push(getSelectedPriority(button)); // get priority value then save to array
    console.log(SELECTEDPRIORITY[0]);
    addPrioritySelectedClass(button, buttonWrapper);
    removeErrorBorderClass(buttonWrapper);
  });
}

// SAVE BUTTON/FORM SUBMIT
export function submitTaskForm(project, reloadTaskComponent, submitArgs) {
  const [FORM, INPUT, TASK_DATE, PRIORITY_WRAPPER] = submitArgs;

  FORM.addEventListener('submit', (e) => {
    const task = INPUT.value;
    const selectedDate = new Date(TASK_DATE.value);
    const dueDate = format(selectedDate, 'MMMM d, yyyy');
    const priority = SELECTEDPRIORITY[0];

    e.preventDefault();

    if (!task || SELECTEDPRIORITY.length === 0) {
      if (!task) {
        addErrorBorderClass(INPUT);
      }

      if (SELECTEDPRIORITY.length === 0) {
        addErrorBorderClass(PRIORITY_WRAPPER);
      }
    } else {
      // add task to project then save to localStorage
      project.addTask(task, dueDate, priority);
      saveToStorage(project.name, project);

      SELECTEDPRIORITY.splice(0);

      // reload task section - Task(taskSection, projectName)
      reloadTaskComponent(TASK_SECTION, project.name);
    }
  });
}

// CANCEL BUTTON
export function clickCancel(cancelArgs) {
  const [
    FORM,
    INPUT,
    PRIORITY_WRAPPER,
    CANCEL,
    ADD_TASK_WRAPPER,
    PRIORITY_BUTTONS,
  ] = cancelArgs;

  CANCEL.addEventListener('click', (e) => {
    e.preventDefault();
    SELECTEDPRIORITY.splice(0);
    removePrioritySelectedClass(PRIORITY_BUTTONS);
    clearInput(INPUT);
    removeErrorBorderClass(INPUT);
    removeErrorBorderClass(PRIORITY_WRAPPER);
    addHiddenClass([FORM]);
    removeHiddenClass([ADD_TASK_WRAPPER]);
  });
}
