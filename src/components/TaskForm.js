import { format } from 'date-fns';

// TEXT AREA
function TaskInput() {
  const textArea = document.createElement('textarea');
  textArea.classList.add('taskForm__input');
  textArea.setAttribute('id', 'task-input');
  textArea.setAttribute('placeholder', 'Enter your task here');
  textArea.setAttribute('tabindex', '-1');
  textArea.setAttribute('autocomplete', 'off');

  return textArea;
}

// CONTROLS
function TaskControls() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('taskFormControls');

  // date
  const dateWrapper = document.createElement('div');
  dateWrapper.classList.add('taskDateWrapper', 'flex-row');

  const dateError = document.createElement('span');
  dateError.setAttribute('id', 'date-error');

  const dateLabel = document.createElement('p');
  dateLabel.classList.add('taskDate__label');
  dateLabel.textContent = ' Due Date:';
  dateLabel.insertBefore(dateError, dateLabel.firstChild); // insert span before Due Date
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

  // priority
  const priorityWrapper = document.createElement('div');
  priorityWrapper.classList.add('taskPriorityWrapper', 'flex-row');

  const taskError = document.createElement('span');
  taskError.setAttribute('id', 'task-error');

  const taskLabel = document.createElement('p');
  taskLabel.classList.add('taskPriority__label');
  taskLabel.textContent = ' Priority:';
  taskLabel.insertBefore(taskError, taskLabel.firstChild); // insert span before Priority

  priorityWrapper.appendChild(taskLabel); // add to date wrapper

  const options = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  options.forEach((option) => {
    const button = document.createElement('input');
    button.classList.add(
      `taskPriority__button`,
      `taskPriority__button--${option.value}`,
      'button-common'
    );
    button.setAttribute('id', `${option.value}-priority-button`);
    button.setAttribute('type', 'button');
    button.setAttribute('value', `${option.label.toUpperCase()}`);
    button.setAttribute('tabindex', '-1');

    priorityWrapper.appendChild(button); // add to priority wrapper
  });

  // cancel and save
  const taskButtonWrapper = document.createElement('div');
  taskButtonWrapper.classList.add('taskButtonWrapper', 'flex-row');

  const cancel = document.createElement('input');
  cancel.classList.add('taskButton', 'taskButton__cancel', 'button-common');
  cancel.setAttribute('id', 'cancel-task');
  cancel.setAttribute('type', 'button');
  cancel.setAttribute('value', 'CANCEL');
  cancel.setAttribute('tabindex', '-1');
  taskButtonWrapper.appendChild(cancel); // add to button wrapper

  const save = document.createElement('input');
  save.classList.add('taskButton', 'taskButton__save', 'button-common');
  save.setAttribute('id', 'save-task');
  save.setAttribute('type', 'submit');
  save.setAttribute('value', 'SAVE');
  save.setAttribute('tabindex', '-1');
  taskButtonWrapper.appendChild(save); // add to button wrapper

  // add to main wrapper
  wrapper.appendChild(dateWrapper);
  wrapper.appendChild(priorityWrapper);
  wrapper.appendChild(taskButtonWrapper);

  return wrapper;
}

// FORM
export default function TaskForm() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('taskFormWrapper');

  const form = document.createElement('form');
  form.classList.add('taskForm');
  form.setAttribute('id', 'task-form');

  form.appendChild(TaskInput()); // add text area to form
  form.appendChild(TaskControls()); // add task controls - date, priority, buttons

  wrapper.appendChild(form); // add form to wrapper

  return wrapper;
}
