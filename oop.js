PRIORITY = { 'LOW': 1, 'MEDIUM': 3, 'HIGH': 5, 'URGENT': 7 };

// Check if a value is a positive integer or not
function validInteger(value) {
  return /^[0-9]+$/.test(String(value));
}

// Check if a priority is valid, i.e. defined in the PRIORITY dictionary: 1, '1', 'medium' etc.
function validatePriority(priority) {
  const numPriority = Number(priority);
  if ([1, 3, 5, 7].includes(numPriority)) {
    return numPriority;
  }
  const capitalisedPriority = String(priority).toUpperCase();
  return PRIORITY[capitalisedPriority] || 1; // Return the priority word's numerical equivalent (e.g. 'low' = 1), otherwise return 1
}

// Ensure date part is two digits, e.g. '09' instead of '9'
function formatDatePart(part) {
  return part < 10 ? `0${part}` : part;
}

// Return current date and time as a formatted string: 'DD/MM/YYYY HH:MM:SS'
function todaysDate() {
  const now = new Date();
  const day = formatDatePart(now.getDate());
  const month = formatDatePart(now.getMonth() + 1); // Months are zero-indexed
  const year = now.getFullYear();
  const hour = formatDatePart(now.getHours());
  const minute = formatDatePart(now.getMinutes());
  const second = formatDatePart(now.getSeconds());
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

// Create a class representing a task with a title, priority level and creation date
class Task {
  // Declare private attributes
  #added; // Date and time of task creation
  #title; // Name of task
  #priority; // Priority level of task

  constructor(title, priority) {
    this.#title = title;
    this.#priority = validatePriority(priority);
    this.#added = todaysDate();
  }

  get added() {
    return this.#added;
  }

  get title() {
    return this.#title;
  }

  get priority() {
    return this.#priority;
  }

  // Validate new priority before updating it
  set priority(newPriority) {
    this.#priority = validatePriority(newPriority);
  }
}

// Create a ToDo class representing a container for storing and managing task objects
class ToDo {
  tasks;

  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push(task);
    return this.tasks.length;
  }

  // Remove a task from the list of tasks by its title
  // Returns true if a valid task was removed, otherwise false
  remove(taskName) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].title === taskName) {
        this.tasks.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  // Return a list of tasks whose priority matches the given argument.
  // Priority 0 returns all tasks
  list(priority = 0) {
    priority = priority === 0 ? 0 : validatePriority(priority); // Unless priority is a valid 0, validate it
    const returnList = [];
    for (const task of this.tasks) {
      if (priority === 0 || task.priority === priority) {
        returnList.push([task.added, task.title, task.priority]);
      }
    }
    return returnList;
  }

  // Return the task with the specified title
  // Throw an error if the task is not found
  task(title) {
    for (const task of this.tasks) {
      if (task.title === title) {
        return task;
      }
    }
    throw new Error(`Task '${title}' Not Found`);
  }
}

// Leave this code here for the automated tests
module.exports = {
  PRIORITY,
  validInteger,
  validatePriority,
  todaysDate,
  ToDo,
  Task,
};
