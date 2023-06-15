import Task from './TaskSection';

import { getProjectNames } from '../utilities/data';
import { clearContent } from '../utilities/controls';
import {
  clickProject,
  clickDeleteProject,
  clickCancelDeleteProject,
  clickConfirmDeleteProject,
} from '../utilities/events';

export default function ProjectNavItems(targetList) {
  clearContent(targetList); // clear list

  const projects = getProjectNames();

  // loop through each project name
  projects.forEach((project, projectIndex) => {
    if (projects && project !== 'PERSONAL') {
      // if projects is not empty and name is not PERSONAL
      // create a list element for each project
      const item = document.createElement('li');
      item.classList.add(
        `item${projectIndex}`,
        'list-item',
        'flex-row',
        'padding-box'
      );
      item.setAttribute('id', `${project.toLowerCase()}-list`);
      item.setAttribute('data-id', project);
      item.setAttribute('data-list-no', projectIndex);

      const icon = document.createElement('img');
      icon.classList.add(`item${projectIndex}__icon`, 'list-obj', 'list-icon');
      icon.src = '../src/assets/project.svg';

      const text = document.createElement('p');
      text.classList.add(`item${projectIndex}__text`, 'list-obj', 'list-text');
      text.textContent = project;

      // delete project wrapper
      const delProjectWrapper = document.createElement('div');
      delProjectWrapper.classList.add(
        'projectItemControl',
        'list-obj',
        'flex-row',
        'hidden'
      );
      delProjectWrapper.setAttribute(
        'id',
        `project-${projectIndex}-control-wrapper`
      );

      // delete
      const del = document.createElement('button');
      del.classList.add('itemControl__delete', 'project-item-button');
      del.setAttribute('data-project-delete-button', projectIndex);

      clickDeleteProject(del, projectIndex);

      // confirm
      const confirm = document.createElement('button');
      confirm.classList.add(
        'itemControl__confirm',
        'project-item-button',
        'hidden'
      );
      confirm.setAttribute('data-project-confirm-button', projectIndex);

      clickConfirmDeleteProject(confirm, project, ProjectNavItems);

      // cancel
      const cancel = document.createElement('button');
      cancel.classList.add(
        'itemControl__cancel',
        'project-item-button',
        'hidden'
      );
      cancel.setAttribute('data-project-cancel-button', projectIndex);
      clickCancelDeleteProject(cancel, projectIndex);

      delProjectWrapper.appendChild(confirm);
      delProjectWrapper.appendChild(cancel);
      delProjectWrapper.appendChild(del);

      item.appendChild(icon);
      item.appendChild(text);
      item.appendChild(delProjectWrapper);

      const listItem = item;

      // Projects click event handler
      clickProject(listItem, projectIndex, Task, ProjectNavItems);

      targetList.appendChild(item);
    }
  });
}
