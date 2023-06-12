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

export function clearInput(targetElement) {
  const element = targetElement;
  element.value = '';
}

export const clearContent = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
