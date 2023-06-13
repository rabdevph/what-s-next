// factory function for creating new task
function createTask(description, dueDate, priority, status) {
  return {
    description,
    dueDate,
    priority,
    status,
  };
}

// factory function for creating new project
export default function createProject(name) {
  // project object
  const project = {
    name,
    tasks: [],

    addTask(description, dueDate, priority, status = 'Pending') {
      const newTask = createTask(description, dueDate, priority, status);
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
