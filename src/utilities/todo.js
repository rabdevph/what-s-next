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

    addTask(description, dueDate, priority, status = 'pending') {
      const newTask = createTask(description, dueDate, priority, status);
      this.tasks.push(newTask);
    },

    removeTask(index) {
      this.tasks.splice(index, 1);
    },

    changeTaskStatus(index) {
      this.tasks[index].status =
        this.tasks[index].status === 'pending' ? 'completed' : 'pending';
    },

    getTaskStatus(index) {
      return this.tasks[index].status;
    },

    getTasks() {
      return this.tasks.map((task) => task);
    },
  };

  return project;
}
