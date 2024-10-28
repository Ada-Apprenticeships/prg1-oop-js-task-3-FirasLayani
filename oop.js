// Put back to single quotes
PRIORITY = { 'LOW': 1, 'MEDIUM': 3, 'HIGH': 5, 'URGENT': 7 };

function validInteger(value) {
  value = String(value);
  const intRegex = /^[0-9]+$/;
  return intRegex.test(value) && value % 1 === 0 && value >= 0 ? true : false;
}

function validatePriority(priority) {
  //return [1,3,5,7].includes(Number(priority)) || PRIORITY.hasOwnProperty(priority.toUpperCase()) ? Number(priority) : 1;
  if ([1, 3, 5, 7].includes(Number(priority))) {
    return Number(priority);
  } else if (PRIORITY.hasOwnProperty(String(priority).toUpperCase())) {
    return PRIORITY[String(priority).toUpperCase()];
  } else {
    return 1;
  }
}

// Return digits as '09' or '03' instead of '9' or '3' etc. if not already two-digit
function formatDatePart(part) {
  return part < 10 ? `0${part}` : part;
}

function todaysDate() {
  const now = new Date();
  const day = formatDatePart(now.getDate());
  const month = formatDatePart(now.getMonth() + 1);
  const year = now.getFullYear();
  const hour = formatDatePart(now.getHours());
  const minute = formatDatePart(now.getMinutes());
  const second = formatDatePart(now.getSeconds());
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

class Task {
  #added;
  #title;
  #priority;

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

  set priority(newPriority) {
    this.#priority = validatePriority(newPriority);
  }
}

class ToDo {
  tasks;

  constructor() {
    this.tasks = [];
  }

  add(task) {
    this.tasks.push(task);
    console.log(this.tasks);
    return this.tasks.length;
  }

  // Refactor to use forEach, use for now
  remove(taskName) {
    let itemRemoved = false;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].title === taskName) {
        this.tasks.splice(i, 1);
        itemRemoved = true;
      }
    }
    return itemRemoved;
  }

  // Return a list of tasks whose priority correlates with the argument entered
  list(priority = 0) {
    priority = priority === 0 ? 0 : validatePriority(priority); // Validate priority, unless it is a valid 0
    let returnList = [];
    for (let task of this.tasks) {
      if (priority === 0 || task.priority === priority) {
        returnList.push([task.added, task.title, task.priority]);
      }
    }
    return returnList;
  }
}

// Testing

const taskList = new ToDo();
console.log(taskList.add(new Task('Get Cappuccino', PRIORITY['HIGH'])));
taskList.add(new Task('Order Lunch', PRIORITY['MEDIUM']));
console.log(taskList.add(new Task('Complete Project Sprint', PRIORITY['MEDIUM'])));
console.log(taskList.list(0));

// Leave this code here for the automated tests
module.exports = {
  PRIORITY,
  validInteger,
  validatePriority,
  todaysDate,
  ToDo,
  Task,
};

// this.tasks.forEach(task => {
//     console.log(task.title, task);
//   });

// remove(taskName) {
// let itemRemoved = false;
// for (const task of this.tasks) {
//     if (task.title === taskName) {
//     tasks.remove(task);
//     itemRemoved = true;
//     }
// }
// return itemRemoved;
// }
