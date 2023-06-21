import TaskHeader from './TaskHeader';

import { getTaskSchedule } from '../utilities/helper';
import { addPriorityColorClass } from '../utilities/controls';

export default function TaskOverview(scope) {
  const taskSection = document.getElementById('task-section');
  taskSection.appendChild(TaskHeader(scope));

  const tasks = getTaskSchedule(scope);

  // task list
  const list = document.createElement('ul');
  list.classList.add('upcomingList', 'flex-column');

  if (tasks.length !== 0) {
    tasks.forEach((task) => {
      const item = document.createElement('li');
      item.classList.add('upcomingItem');

      // bullet
      const bullet = document.createElement('div');
      bullet.classList.add('upcoming-bullet');

      // task description
      const description = document.createElement('p');
      description.classList.add('upcomingItem__description');
      description.textContent = task.task;

      // info: due and project name
      const info = document.createElement('div');
      info.classList.add('taskInfo', 'flex-row-ac');

      // due wrapper
      const dueWrapper = document.createElement('div');
      dueWrapper.classList.add('taskDueWrapper', 'flex-row-d');

      // add prioriry color here
      addPriorityColorClass(dueWrapper, task.priority);

      const dueIcon = document.createElement('img');
      dueIcon.classList.add('taskDue__icon');
      dueIcon.src = '../src/assets/date.svg';

      const dueDate = document.createElement('p');
      dueDate.textContent = task.dueDate.toUpperCase();

      dueWrapper.appendChild(dueIcon);
      dueWrapper.appendChild(dueDate);

      // project wrapper
      const projWrapper = document.createElement('div');
      projWrapper.classList.add('taskProjectWrapper', 'flex-row-d');

      const projIcon = document.createElement('img');
      projIcon.classList.add('taskProject__icon');
      projIcon.src = '../src/assets/project.svg';

      const proj = document.createElement('p');
      proj.textContent = task.projName.toUpperCase();

      projWrapper.appendChild(projIcon);
      projWrapper.appendChild(proj);

      info.appendChild(dueWrapper);
      info.appendChild(projWrapper);

      item.appendChild(bullet);
      item.appendChild(description);
      item.appendChild(info);

      list.appendChild(item);
    });
  }

  taskSection.appendChild(list);
}
