import { addHiddenClass, removeHiddenClass } from '../utilities/controls';

// ADD TASK BUTTON
export default function clickAddTask() {
  const FORM = document.getElementById('task-form');
  const ADD_TASK_WRAPPER = document.getElementById('add-task-wrapper');
  const ADD_TASK = document.getElementById('add-task');

  ADD_TASK.addEventListener('click', () => {
    removeHiddenClass([FORM]);
    addHiddenClass([ADD_TASK_WRAPPER]);
  });
}
