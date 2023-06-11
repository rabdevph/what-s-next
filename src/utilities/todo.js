// factory function for creating new task
function createTask(description, priority, dueDate, status) {
  return {
    description,
    priority,
    dueDate,
    status,
  };
}

// factory function for creating new project
export default function createProject(name) {
  // project object
  const project = {
    name,
    tasks: [],

    addTask(description, priority, dueDate = 'None', status = 'Pending') {
      const newTask = createTask(description, priority, dueDate, status);
      this.tasks.push(newTask);
    },

    changeTaskStatus(index) {
      this.tasks[index].status =
        this.tasks[index].status === 'Pending' ? 'Completed' : 'Pending';
    },

    getTasks() {
      return this.tasks.map((task) => task);
    },
  };

  return project;
}
