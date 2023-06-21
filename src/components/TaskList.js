import {
  clickDeleteTask,
  clickCancelDeleteTask,
  clickConfirmDeleteTask,
} from '../events/eventsTaskList';

import {
  addPriorityColorClass,
  checkTaskDueDate,
  checkTaskStatus,
} from '../utilities/controls';

export default function TaskList(project, taskSectionComponent, taskSection) {
  // TASK LIST
  const list = document.createElement('ul');
  list.classList.add('taskList', 'flex-column');

  // get task from project
  const projectTasks = project.tasks;

  if (projectTasks.length !== 0) {
    // if task is not empty, display the tasks.
    // sort task by due date
    projectTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

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
      clickConfirmDeleteTask(
        confirm,
        project,
        taskIndex,
        taskSectionComponent,
        taskSection
      );

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

      // check task status
      checkTaskStatus(taskStatus, checkBox, checkBoxIcon, description);

      // task due icon and date
      const due = document.createElement('div');
      due.classList.add('taskDue');

      const dueWrapper = document.createElement('div');
      dueWrapper.classList.add('taskDueWrapper', 'flex-row-d');
      // add prioriry color here
      addPriorityColorClass(dueWrapper, projectTask.priority);

      const icon = document.createElement('img');
      icon.classList.add('taskDue__icon');
      icon.src = '../src/assets/date.svg';

      const date = document.createElement('p');
      date.classList.add('taskDue__date');
      date.textContent = projectTask.dueDate.toUpperCase();

      // check task due date
      checkTaskDueDate(projectTask.dueDate, item, dueWrapper, icon, taskStatus);

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

  return list;
}
