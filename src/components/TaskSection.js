import TaskHeader from './TaskHeader';
import TaskForm from './TaskForm';
import AddTaskButton from './AddTask';
import TaskList from './TaskList';

import { clearContent } from '../utilities/controls';
import { submitTaskForm, clickCancel } from '../events/eventsTaskForm';
import clickAddTask from '../events/eventsAddTask';
import { clickTaskCheckBox } from '../events/eventsTaskList';
import { deserializedProject } from '../utilities/helper';

export default function TaskSection(projectName) {
  const taskSection = document.getElementById('task-section');
  // taskSection = <section> </section>
  clearContent(taskSection);

  // re-create project object
  const project = deserializedProject(projectName);

  taskSection.appendChild(TaskHeader(projectName));
  taskSection.appendChild(TaskForm());
  taskSection.appendChild(AddTaskButton());
  taskSection.appendChild(TaskList(project, TaskSection, taskSection));

  const FORM = document.getElementById('task-form');
  const INPUT = document.getElementById('task-input');
  const TASK_DATE = document.getElementById('task-date');
  const PRIORITY_WRAPPER = document.getElementById('priority-wrapper');
  const CANCEL = document.getElementById('cancel-task');
  const ADD_TASK_WRAPPER = document.getElementById('add-task-wrapper');
  const PRIORITY_BUTTONS = document.querySelectorAll('.taskPriority__button');

  const submitArgs = [FORM, INPUT, TASK_DATE, PRIORITY_WRAPPER];

  const cancelArgs = [
    FORM,
    INPUT,
    PRIORITY_WRAPPER,
    CANCEL,
    ADD_TASK_WRAPPER,
    PRIORITY_BUTTONS,
  ];

  // TASK FORM
  submitTaskForm(project, TaskSection, submitArgs);
  clickCancel(cancelArgs);

  // ADD TASK BUTTON
  // const taskCheckBoxes = document.querySelectorAll('.taskItem__checkbox');
  clickAddTask();

  const taskCheckBoxes = document.querySelectorAll('.taskItem__checkbox');
  // checkTask(project, Task);
  clickTaskCheckBox(taskCheckBoxes, project, TaskSection, taskSection);
}
