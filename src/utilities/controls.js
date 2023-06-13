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

export function togglePrioritySelectedClass(element, elementWrapper) {
  // remove 'priority__button--selected' class from previously selected button
  const prevSelectedButton = elementWrapper.querySelector(
    '.taskPriority__button--selected'
  );

  if (prevSelectedButton) {
    prevSelectedButton.classList.remove('taskPriority__button--selected');
  }

  // add 'priority__button--selected' class to current button
  element.classList.add('taskPriority__button--selected');
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
