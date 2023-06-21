export default function TaskHeader(projectName) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('taskHeaderWrapper');
  wrapper.setAttribute('id', 'taskHeaderWrapper');

  const header = document.createElement('h3');
  header.classList.add('taskHeader__text');
  header.textContent = projectName;

  wrapper.appendChild(header);

  return wrapper;
}
