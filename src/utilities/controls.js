export function addHiddenClass(element) {
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden');
  }
}

export function removeHiddenClass(element) {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  }
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

export function checkTaskStatus(status, checkBox, description) {
  if (status === 'completed') {
    // checkbox = checked
    const taskCheckbox = checkBox;
    taskCheckbox.checked = true;

    // task = line through
    const taskDescription = description;
    taskDescription.classList.add('completed-status');
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
