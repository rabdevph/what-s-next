import { format } from 'date-fns';

import { clickInput, clickPriority } from '../events/eventsTaskForm';

// INPUT
function TaskInput() {
  const input = document.createElement('input');
  input.classList.add('taskForm__input');
  input.setAttribute('id', 'task-input');
  input.setAttribute('typewrapper', 'text');
  input.setAttribute('placeholder', 'Enter your task here');
  input.setAttribute('tabindex', '-1');
  input.setAttribute('autocomplete', 'off');
  clickInput(input);

  return input;
}

// CONTROLS
function TaskControls() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('taskFormControls', 'flex-row-ac');

  // DATE
  const dateWrapper = document.createElement('div');
  dateWrapper.classList.add('taskDateWrapper', 'flex-row-ac');

  const dateLabel = document.createElement('p');
  dateLabel.classList.add('taskDate__label');
  dateLabel.textContent = ' Due Date:';

  dateWrapper.appendChild(dateLabel); // add to wrapper

  const today = new Date();
  const minDate = format(today, 'yyyy-MM-dd');

  const date = document.createElement('input');
  date.classList.add('taskDate__input');
  date.setAttribute('id', 'task-date');
  date.setAttribute('type', 'date');
  date.setAttribute('min', minDate);
  date.setAttribute('value', minDate);
  date.setAttribute('tabindex', '-1');

  dateWrapper.appendChild(date); // add to wrapper

  // PRIORITY
  const priorityWrapper = document.createElement('div');
  priorityWrapper.classList.add('taskPriorityWrapper', 'flex-row-ac');

  const priorityLabel = document.createElement('p');
  priorityLabel.classList.add('taskPriority__label');
  priorityLabel.textContent = ' Priority:';

  priorityWrapper.appendChild(priorityLabel); // add to date wrapper

  const priorityButtonWrapper = document.createElement('div');
  priorityButtonWrapper.classList.add(
    'taskPriorityButtonWrapper',
    'flex-row-ac'
  );
  priorityButtonWrapper.setAttribute('id', 'priority-wrapper');

  const options = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  options.forEach((option) => {
    const button = document.createElement('input');
    button.classList.add(
      `taskPriority__button`,
      `taskPriority__button--${option.value}`
    );
    button.setAttribute('id', `${option.value}-priority-button`);
    button.setAttribute('type', 'button');
    button.setAttribute('value', `${option.label.toUpperCase()}`);
    button.setAttribute('tabindex', '-1');
    button.setAttribute('data-priority', option.value);
    clickPriority(button, priorityButtonWrapper);

    priorityButtonWrapper.appendChild(button);
  });

  priorityWrapper.appendChild(priorityButtonWrapper);

  // CANCEL AND SAVE
  const taskButtonWrapper = document.createElement('div');
  taskButtonWrapper.classList.add('taskButtonWrapper', 'flex-row-ac');

  // CANCEL
  const cancel = document.createElement('input');
  cancel.classList.add('taskButton', 'taskButton__cancel', 'button-common');
  cancel.setAttribute('id', 'cancel-task');
  cancel.setAttribute('type', 'button');
  cancel.setAttribute('value', 'CANCEL');
  cancel.setAttribute('tabindex', '-1');
  taskButtonWrapper.appendChild(cancel);

  // SAVE
  const save = document.createElement('input');
  save.classList.add('taskButton', 'taskButton__save', 'button-common');
  save.setAttribute('id', 'save-task');
  save.setAttribute('type', 'submit');
  save.setAttribute('value', 'SAVE');
  save.setAttribute('tabindex', '-1');
  taskButtonWrapper.appendChild(save);

  // add to main wrapper
  wrapper.appendChild(dateWrapper);
  wrapper.appendChild(priorityWrapper);
  wrapper.appendChild(taskButtonWrapper);

  return wrapper;
}

// FORM
export default function TaskForm() {
  const form = document.createElement('form');
  form.classList.add('taskForm', 'flex-column', 'hidden');
  form.setAttribute('id', 'task-form');

  form.appendChild(TaskInput());
  form.appendChild(TaskControls());

  return form;
}
