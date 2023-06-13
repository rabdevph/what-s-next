import TaskForm from './TaskForm';

import { clearContent } from '../utilities/controls';
import {
  submitTaskForm,
  clickTaskInput,
  clickPriority,
  clickCancelTask,
  clickAddTask,
} from '../utilities/events';
import { deserializedProject } from '../utilities/helper';

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
  wrapper.classList.add('addTaskWrapper');
  wrapper.setAttribute('id', 'add-task-wrapper');

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
function TaskList(project) {
  const list = document.createElement('ul');
  list.classList.add('taskList');

  const projectTasks = project.tasks;

  if (projectTasks.length !== 0) {
    // if task is not empty, display the tasks.
    projectTasks.forEach((projectTask, projectTaskIndex) => {
      const item = document.createElement('li');
      item.classList.add('taskItem');

      // task checkbox
      const checkBox = document.createElement('input');
      checkBox.classList.add('taskItem__checkbox');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.setAttribute('id', `taskCheckBox${projectTaskIndex}`);

      // task description
      const description = document.createElement('p');
      description.classList.add('taskItem__description');
      description.textContent = projectTask.description;

      // task due icon and date
      const due = document.createElement('div');
      due.classList.add('taskDue');

      const dueWrapper = document.createElement('div');
      dueWrapper.classList.add('taskDueWrapper', 'flex-row');

      const icon = document.createElement('img');
      icon.classList.add('taskDue__icon');
      icon.src = '../src/assets/date.svg';

      const date = document.createElement('p');
      date.classList.add('taskDue__date');
      date.textContent = projectTask.dueDate.toUpperCase();

      dueWrapper.appendChild(icon);
      dueWrapper.appendChild(date);

      due.appendChild(dueWrapper);

      item.appendChild(checkBox);
      item.appendChild(description);
      item.appendChild(due);

      list.appendChild(item);
    });
  }

  return list;
}

export default function Task(taskSection, projectName) {
  // taskSection = <section> </section>
  clearContent(taskSection);

  // re-create project object
  const project = deserializedProject(projectName);
  console.log(project);

  taskSection.appendChild(TaskHeader(projectName));
  taskSection.appendChild(TaskForm());
  taskSection.appendChild(AddTask());
  taskSection.appendChild(TaskList(project)); // pass project object

  // event handlers
  submitTaskForm(project, Task, taskSection); // pass re-created project object here
  clickTaskInput();
  clickPriority();
  clickCancelTask();
  clickAddTask();
}
