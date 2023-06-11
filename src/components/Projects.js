import { getProjectNames } from '../utilities/data';
import { clearContent } from '../utilities/controls';
import { clickProjectItems } from '../utilities/events';

export default function ProjectNavItems(targetList) {
  clearContent(targetList); // clear list

  const projects = getProjectNames();

  // loop through each project name
  projects.forEach((project) => {
    if (projects && project !== 'PERSONAL') {
      // if projects is not empty and name is not PERSONAL
      // create a list element for each project
      const item = document.createElement('li');
      item.classList.add('list-item', 'flex-row', 'padding-box');
      item.setAttribute('id', `${project.toLowerCase()}List`);
      item.setAttribute('data-id', project);

      const icon = document.createElement('img');
      icon.classList.add('list-icon');
      icon.src = '../src/assets/project.svg';

      const text = document.createElement('p');
      text.classList.add('list-text');
      text.textContent = project;

      item.appendChild(icon);
      item.appendChild(text);

      clickProjectItems(item); // click event handler

      targetList.appendChild(item);
    }
  });
}
