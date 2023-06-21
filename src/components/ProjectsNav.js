import TaskSection from './TaskSection';

import { getProjectNames } from '../utilities/data';
import { clearContent } from '../utilities/controls';

import {
  clickProjectsNavItem,
  clickDeleteProject,
  clickCancelDeleteProject,
  clickConfirmDeleteProject,
} from '../events/eventsProjectsNav';

export default function ProjectsNav(projectsNavList) {
  clearContent(projectsNavList); // clear list before loading component

  const projectNames = getProjectNames(); // get project names

  // loop through each project name
  projectNames.forEach((projectName) => {
    if (projectNames && projectName !== 'PERSONAL') {
      // if project names is not empty and name is not PERSONAL
      // create a list element for each project
      const item = document.createElement('li');
      item.classList.add('list-item', 'flex-row-ac', 'padding-box');
      item.setAttribute('id', `${projectName.toLowerCase()}-list`);
      item.setAttribute('data-id', projectName);

      const icon = document.createElement('img');
      icon.classList.add('list-icon');
      icon.src = '../src/assets/project.svg';

      const text = document.createElement('p');
      text.classList.add('list-text');
      text.textContent = projectName;

      // delete project wrapper
      const controlWrapper = document.createElement('div');
      controlWrapper.classList.add(
        'projectItemControl',
        'flex-row-ac',
        'hidden'
      );
      controlWrapper.setAttribute(
        'id',
        `project-${projectName.toLowerCase()}-control-wrapper`
      );

      // DELETE
      const del = document.createElement('button');
      del.classList.add('projectsNavControl__delete', 'project-item-button');
      del.setAttribute('data-project-delete-button', projectName.toLowerCase());
      clickDeleteProject(del, projectName);

      // CANCEL
      const cancel = document.createElement('button');
      cancel.classList.add(
        'projectsNavControl__cancel',
        'project-item-button',
        'hidden'
      );
      cancel.setAttribute(
        'data-project-cancel-button',
        projectName.toLowerCase()
      );
      clickCancelDeleteProject(cancel, projectName);

      // CONFIRM
      const confirm = document.createElement('button');
      confirm.classList.add(
        'projectsNavControl__confirm',
        'project-item-button',
        'hidden'
      );
      confirm.setAttribute(
        'data-project-confirm-button',
        projectName.toLowerCase()
      );
      clickConfirmDeleteProject(confirm, projectName, ProjectsNav);

      controlWrapper.appendChild(confirm);
      controlWrapper.appendChild(cancel);
      controlWrapper.appendChild(del);

      item.appendChild(icon);
      item.appendChild(text);
      item.appendChild(controlWrapper);

      // Projects click event handler
      clickProjectsNavItem(item, TaskSection, ProjectsNav);

      projectsNavList.appendChild(item);
    }
  });
}
