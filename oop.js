PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };

// 'Broken'
function validInteger (value) { // value can be a string or a number (integer)
  return value%1===0 && value >= 0 ? true : false;
}  


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

  // (title, priority)
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