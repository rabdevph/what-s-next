export default function AddTaskButton() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('addTaskWrapper');
  wrapper.setAttribute('id', 'add-task-wrapper');

  const button = document.createElement('button');
  button.classList.add('addTask__button', 'flex-row-ac');
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
