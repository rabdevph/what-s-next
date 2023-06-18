import { isBefore } from 'date-fns';

export function addHiddenClass(elements) {
  // elements -> array
  elements.forEach((element) => {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
    }
  });
}

export function removeHiddenClass(elements) {
  // elements -> array
  elements.forEach((element) => {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    }
  });
}

export function addErrorBgClass(element) {
  if (!element.classList.contains('error-bg')) {
    element.classList.add('error-bg');
  }
}

export function removeErrorBgClass(element) {
  if (element.classList.contains('error-bg')) {
    element.classList.remove('error-bg');
  }
}

export function addErrorBorderClass(element) {
  if (!element.classList.contains('error-border')) {
    element.classList.add('error-border');
  }
}

export function removeErrorBorderClass(element) {
  if (element.classList.contains('error-border')) {
    element.classList.remove('error-border');
  }
}

export function addPrioritySelectedClass(button, buttonWrapper) {
  // remove 'priority__button--selected' class from previously selected button
  const prevSelectedButton = buttonWrapper.querySelector(
    '.taskPriority__button--selected'
  );

  if (prevSelectedButton) {
    prevSelectedButton.classList.remove('taskPriority__button--selected');
  }

  // add 'priority__button--selected' class to current button
  button.classList.add('taskPriority__button--selected');
}

export function removePrioritySelectedClass(buttons) {
  //
  buttons.forEach((button) => {
    if (button.classList.contains('taskPriority__button--selected')) {
      button.classList.remove('taskPriority__button--selected');
    }
  });
}

export function addPriorityColorClass(wrapperElement, priority) {
  if (priority === 'low') {
    wrapperElement.classList.add('low-priority');
  }

  if (priority === 'medium') {
    wrapperElement.classList.add('medium-priority');
  }

  if (priority === 'high') {
    wrapperElement.classList.add('high-priority');
  }
}

// add selected-nav
export function addSelectedNavClass(element) {
  if (!element.classList.contains('selected-nav')) {
    element.classList.add('selected-nav');
  }
}

// remove selected-nav
export function removeSelectedNavClass(elements) {
  // elements -> array
  elements.forEach((element) => {
    if (element.classList.contains('selected-nav')) {
      element.classList.remove('selected-nav');
    }
  });
}

// add delete icon to selected project
export function addDeleteIcon(element) {
  const iconElement = element;
  iconElement.src = '../src/assets/delete.svg';
}

// remove delete icon to selected project
export function removeDeleteIcon(element) {
  const iconElement = element;
  iconElement.src = '../src/assets/project.svg';
}

export function addDeleteWord(element) {
  const textElement = element;
  const text = textElement.textContent;

  textElement.textContent = `DELETE "${text}"?`;
}

export function removeDeleteWord(element, projectName) {
  const textElement = element;

  textElement.textContent = projectName;
}

export function checkTaskStatus(status, checkBox, checBoxIcon, description) {
  if (status === 'completed') {
    const icon = checBoxIcon;

    // checkbox(button) = checked
    if (!checkBox.classList.contains('checked')) {
      checkBox.classList.add('checked');
    }

    icon.src = '../src/assets/check.svg';

    // task = line through
    const taskDescription = description;
    taskDescription.classList.add('completed-status');
  }
}

export function checkTaskDueDate(dueDate, item, dueWrapper, icon, taskStatus) {
  const today = new Date().setHours(0, 0, 0, 0);
  const due = new Date(dueDate).setHours(0, 0, 0, 0);

  const dueIcon = icon;

  if (isBefore(due, today)) {
    // change color of task due date and icon
    if (taskStatus === 'completed') {
      item.classList.add('past-due-completed');
    } else {
      item.classList.add('past-due-pending');
    }
    dueWrapper.classList.add('past-due-date');

    dueIcon.src = '../src/assets/warning.svg';
  }
}

export function clearInput(targetElement) {
  const element = targetElement;
  element.value = '';
}

export const clearContent = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
