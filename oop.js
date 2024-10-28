PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

// 'Broken'
function validInteger (value) { // value can be a string or a number (integer)
  return value%1===0 && value >= 0 ? true : false;
}  

// Ask if input will be LOW or only numbers
function validatePriority(priority) { // value can be a string or a number (integer)
  return [1,3,5,7].includes(Number(priority)) ? Number(priority) : 1;
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

console.log(validInteger('4'))
console.log(todaysDate())



// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}