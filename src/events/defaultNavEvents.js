import {
  addHiddenClass,
  addSelectedNavClass,
  removeErrorBgClass,
  removeHiddenClass,
  removeSelectedNavClass,
  clearContent,
  clearInput,
} from '../utilities/controls';

import { SELECTEDPRIORITY } from '../utilities/helper';

const defaultNavItems = document.querySelectorAll('.defaultNav__item');

const todayList = document.getElementById('today-list');
const upcomingList = document.getElementById('upcoming-list');
const personalList = document.getElementById('personal-list');

const newProjectButton = document.getElementById('new-project-button');
const newProjectForm = document.getElementById('new-project-form');
const newProjectName = document.getElementById('new-project-name');

const projectsNavList = document.getElementById('projects-nav-list');

const taskSection = document.getElementById('task-section');

// DEFAULT NAVIGATION LIST - TODAY, UPCOMING, PERSONAL
export default function clickDefaultNavItem(
  projectsNavComponent,
  taskComponent,
  taskOverviewComponent
) {
  defaultNavItems.forEach((defaultNavItem) => {
    defaultNavItem.addEventListener('click', () => {
      clearContent(taskSection);

      if (defaultNavItem.id === 'today-list') {
        addSelectedNavClass(todayList);
        removeSelectedNavClass([upcomingList, personalList]);
        taskOverviewComponent(taskSection, 'TODAY');
      }

      if (defaultNavItem.id === 'upcoming-list') {
        addSelectedNavClass(upcomingList);
        removeSelectedNavClass([todayList, personalList]);
        taskOverviewComponent(taskSection, 'UPCOMING');
      }

      if (defaultNavItem.id === 'personal-list') {
        const PERSONAL = personalList.getAttribute('data-id');
        addSelectedNavClass(personalList);
        removeSelectedNavClass([todayList, upcomingList]);
        taskComponent(taskSection, PERSONAL); // populate task section: Task(taskSection)
      }

      projectsNavComponent(projectsNavList); // reload projects list: ProjectNavItems(projectsNavList)

      SELECTEDPRIORITY.splice(0);

      removeHiddenClass([newProjectButton]);
      addHiddenClass([newProjectForm]);
      removeErrorBgClass(newProjectName);
      clearInput(newProjectName);
    });
  });
}
