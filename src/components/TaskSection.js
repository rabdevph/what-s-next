import TaskForm from './TaskForm';

import {
  clearContent,
  addPriorityColorClass,
  checkTaskStatus,
} from '../utilities/controls';
import {
  submitTaskForm,
  clickTaskInput,
  clickPriority,
  clickCancelTask,
  clickAddTask,
  checkTask,
  clickDeleteTask,
  clickCancelDeleteTask,
  clickConfirmDeleteTask,
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

export default function Task(taskSection, projectName) {
  // taskSection = <section> </section>
  clearContent(taskSection);

  // re-create project object
  const project = deserializedProject(projectName);

  taskSection.appendChild(TaskHeader(projectName));
  taskSection.appendChild(TaskForm());
  taskSection.appendChild(AddTask());

  // task list
  const list = document.createElement('ul');
  list.classList.add('taskList', 'flex-column');

  // get task from project
  const projectTasks = project.tasks;

  if (projectTasks.length !== 0) {
    // if task is not empty, display the tasks.
    projectTasks.forEach((projectTask, taskIndex) => {
      const item = document.createElement('li');
      item.classList.add('taskItem', `taskItem${taskIndex}`);
      item.setAttribute('data-task-no', taskIndex);

      // task checkbox
      const checkBox = document.createElement('button');
      checkBox.classList.add('taskItem__checkbox');
      checkBox.setAttribute('id', `taskCheckBox${taskIndex}`);

      const checkBoxIcon = document.createElement('img');
      checkBoxIcon.src = '../src/assets/check-zinc.svg';

      checkBox.appendChild(checkBoxIcon);

      // task description
      const description = document.createElement('p');
      description.classList.add(
        'taskItem__description',
        `taskItem${taskIndex}__description`
      );
      description.textContent = projectTask.description;

      // delete task wrapper
      const deltaskWrapper = document.createElement('div');
      deltaskWrapper.classList.add('taskItemControl', 'flex-row');
      deltaskWrapper.setAttribute('id', `task-${taskIndex}-control-wrapper`);

      // delete
      const del = document.createElement('button');
      del.classList.add('taskControl__delete', 'task-item-button');
      del.setAttribute('data-task-delete-button', taskIndex);

      // click event
      clickDeleteTask(del, taskIndex);

      // confirm
      const confirm = document.createElement('button');
      confirm.classList.add(
        'taskControl__confirm',
        'task-item-button',
        'hidden'
      );
      confirm.setAttribute('data-task-confirm-button', taskIndex);

      // click event handler
      clickConfirmDeleteTask(confirm, project, taskIndex, Task);

      // cancel
      const cancel = document.createElement('button');
      cancel.classList.add('taskControl__cancel', 'task-item-button', 'hidden');
      cancel.setAttribute('data-task-cancel-button', taskIndex);

      // click event handler
      clickCancelDeleteTask(cancel, taskIndex);

      deltaskWrapper.appendChild(confirm);
      deltaskWrapper.appendChild(cancel);
      deltaskWrapper.appendChild(del);

      const taskStatus = project.getTaskStatus(taskIndex);
      console.log(taskStatus);

      checkTaskStatus(taskStatus, checkBox, checkBoxIcon, description);

      // task due icon and date
      const due = document.createElement('div');
      due.classList.add('taskDue');

      const dueWrapper = document.createElement('div');
      dueWrapper.classList.add('taskDueWrapper', 'flex-row');
      // add prioriry color here
      addPriorityColorClass(dueWrapper, projectTask.priority);

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
      item.appendChild(deltaskWrapper);
      item.appendChild(due);

      list.appendChild(item);
    });
  }

  taskSection.appendChild(list);

  // event handlers
  submitTaskForm(project, Task); //
  clickTaskInput();
  clickPriority();
  clickCancelTask();
  clickAddTask();
  checkTask(project, Task);
}
