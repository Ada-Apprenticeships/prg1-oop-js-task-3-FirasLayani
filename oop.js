PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

function validInteger (value) { // value can be a string or a number (integer)
  value = String(value)
  const intRegex = /^[0-9]+$/;
  return intRegex.test(value) && value%1===0 && value >= 0 ? true : false;
}  

//console.log(validInteger('1.0'))

function validatePriority(priority) { // value can be a string or a number (integer)
  //return [1,3,5,7].includes(Number(priority)) || PRIORITY.hasOwnProperty(priority.toUpperCase()) ? Number(priority) : 1;
  if ([1,3,5,7].includes(Number(priority))) {
    return Number(priority)
  } else if (PRIORITY.hasOwnProperty(String(priority).toUpperCase())) {
    return PRIORITY[String(priority).toUpperCase()]
  } else {
    return 1
  }
}

function formatDatePart(part) {
  return part < 10 ? `0${part}` : part;
}

function todaysDate () {
  const now = new Date();
  const day = formatDatePart(now.getDate());
  const month = formatDatePart(now.getMonth()+1);
  const year = now.getFullYear();
  const hour = formatDatePart(now.getHours());
  const minute = formatDatePart(now.getMinutes());
  const second = formatDatePart(now.getSeconds());
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`
}

class Task  {
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
    return this.#priority
  }

  set priority(newPriority) {
    this.#priority = validatePriority(newPriority);
  }
}


class ToDo {
    
}


// Testing
/*
task = new Task('Get Cappuccino', PRIORITY['MEDIUM'])  // Creates an instance of a Task (named task)
task.added -> '30/4/2023 12:26:26' // Checking the 'added' attribute of a Task instance returns the date/time it was added.
task.title -> 'Get Cappuccino' // Checking the 'title' attribute for a Task instance returns the title of the task.'
task.priority -> 3 // Checking the 'priority' attribute for a Task instance returns an integer 3 (Remember MEDIUM == 3).
task.priority = PRIORITY['URGENT'] // Setting the 'priority' attribute for a Task instance to URGENT (Remember URGENT == 7).
task.priority -> 7 // Checking the 'priority' attribute for a Task instance returns an integer 7 (Remember URGENT == 7).
task.priority = '10' // Setting the 'priority' attribute for a Task instance to the string '10' (an invalid priority).
task.priority -> 1 // Checking the 'priority attribute for a Task instance returns an integer 1 (because '10' was an invalid priority so it defaults to 1).
*/

// task = new Task('Get hot chocolate', PRIORITY['MEDIUM'])
// console.log(task.added)
// console.log(task.title)
// console.log(task.priority)
// task.priority = PRIORITY['URGENT']
// console.log(task.priority)
// task.priority = '5'
// console.log(task.priority)
// task.priority = '10'
// console.log(task.priority)

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}