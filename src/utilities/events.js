import { toggleHiddenClass } from './controls';

export function clickNavListItems() {
  const navListItems = document.querySelectorAll('.navList__item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', () => {
      //
      console.log(navListItem);
    });
  });
}

export function clickNewProject() {
  const newProjectButton = document.getElementById('newProjectButton');
  const newProjectForm = document.getElementById('newProjectForm');

  newProjectButton.addEventListener('click', () => {
    // hide new project button
    toggleHiddenClass(newProjectButton);
    // show new project form
    toggleHiddenClass(newProjectForm);
  });
}

export function clickCancelProject() {
  const cancelNewProject = document.getElementById('cancelNewProject');
  const newProjectButton = document.getElementById('newProjectButton');
  const newProjectForm = document.getElementById('newProjectForm');

  cancelNewProject.addEventListener('click', (e) => {
    e.preventDefault();
    // hide new project form
    toggleHiddenClass(newProjectForm);
    // show new project button
    toggleHiddenClass(newProjectButton);
  });
}
