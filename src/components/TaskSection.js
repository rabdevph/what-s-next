import TaskForm from './TaskForm';

import { clearContent } from '../utilities/controls';
import {
  submitTaskForm,
  clickTaskInput,
  clickPriority,
} from '../utilities/events';

// HEADER
function TaskHeader(projectName) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('taskHeaderWrapper');
  wrapper.setAttribute('id', 'taskHeaderWrapper');

  const header = document.createElement('h3');
  header.classList.add('taskHeader__text');
  header.textContent = projectName;

  wrapper.appendChild(header);

  return wrapper;
}

// ADD TASK BUTTON
function AddTask() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('addTaskWrapper', 'flex-row');

  const button = document.createElement('button');
  button.classList.add('addTask__button', 'flex-row');
  button.setAttribute('id', 'add-task');
  button.setAttribute('tabindex', '-1');

  const buttonIcon = document.createElement('img');
  buttonIcon.classList.add('addTask__icon');
  buttonIcon.src = '../src/assets/plus.svg';
  button.appendChild(buttonIcon);

  const buttonText = document.createElement('p');
  buttonText.classList.add('addTask__text');
  buttonText.textContent = 'Add task';
  button.appendChild(buttonText);

  wrapper.appendChild(button);

  return wrapper;
}

// TASK LIST
function TaskList() {}

export default function Task(taskSection, projectDataId) {
  // taskSection = <section> </section>
  clearContent(taskSection);

  taskSection.appendChild(TaskHeader(projectDataId));
  taskSection.appendChild(TaskForm());
  taskSection.appendChild(AddTask());

  // event handlers
  submitTaskForm();
  clickTaskInput();
  clickPriority();
}
