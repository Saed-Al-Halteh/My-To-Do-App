const inputBar = document.querySelector(".input-bar");
const tasksDiv = document.querySelector(".tasks");
const addButton = document.querySelector("#add-button");
const filter = document.querySelector("#filter");
const dateSort = document.querySelector("#sort");
const invalidInputMessage = document.querySelector(".invalid-input");
const plannedDate = document.querySelector("#date-button");
const motivationQuote = document.querySelector(".motivation");

inputBar.addEventListener('keydown',(e) =>{
  if (e.key === 'Enter'){
  checkInput();
  };
})
plannedDate.addEventListener('focus',(e)=>{
  e.target.type='date';
})
plannedDate.addEventListener('keydown',(e) =>{
  if (e.key === 'Enter'){
  checkInput();
  };
})
addButton.addEventListener('click', checkInput);

/**
 * Clear Error message and checks  the value of the inputBar if it is empty or duplicate,  
 *    
 */
function checkInput(){
  invalidInputMessage.innerHTML= "<span></span>"
  let plannedDateValue = checkDate(); 
  if(plannedDateValue === undefined ) return;
  const taskDescription = inputBar.value; 
  if(taskDescription.trim() === '' ){
    printErrorMessage("empty");
    return;
  }else{
    let x = document.querySelectorAll(".task-description");
    for (let i = 0; i<x.length; i++){
      if (taskDescription === x[i].innerText) {
        printErrorMessage("duplicate");
        return;
      }  
    }
    printTask(taskDescription, plannedDateValue);
    inputBar.value = "";
    plannedDate.value="";
    plannedDate.type='text';
  }
}
/**
 * Checks the date that inserted by the user, if it is empty then it will return today's date,
 * if it is in the past, then it will call the printErrorMessage function, and if it is valid then it
 * will return it as it is.
 * 
 * @returns (string) planned date value. 
 */
function checkDate() {
  if (plannedDate.value === "" ){
    let validDate = new Date();
    const month = validDate. getUTCMonth() + 1; 
    const day = validDate. getUTCDate();
    const year = validDate. getUTCFullYear();
    validDate = year + "-" + month + "-" + day;
    return validDate;
  } else { 
      let today = new Date();
      const month = today. getUTCMonth() + 1; 
      const day = today. getUTCDate();
      const year = today. getUTCFullYear();
      today = year + "-" + month + "-" + day;
      if (Date.parse(plannedDate.value) < Date.parse(today)) {
        printErrorMessage("InvalidDate");
      }
      else{
        return plannedDate.value;
      }
  }
}
/**
 * Determine what error message to print based on the error Type 
 * 
 * @param {string} errorType  Type of the error in the inputs, 
 */
function printErrorMessage(errorType) {
  if (errorType === "empty"){
    invalidInputMessage.innerHTML="<span class='material-icons'>error</span>Empty input, please insert valid text";
  } else if (errorType === "duplicate"){
    invalidInputMessage.innerHTML="<span class='material-icons'>error</span>This task has already been added to the list";
  } else if (errorType === "InvalidDate"){
    invalidInputMessage.innerHTML="<span class='material-icons'>error</span>Please enter a valid date";
  }
}
/**
 * create a new HTML div that includes the task description and date, and append it to the DOM. 
 * * 
 * @param {string} taskDescription  Task Description
 * @param {string} plannedDateValue planned Date to complete the task
 */
function printTask(taskDescription,plannedDateValue) {
  let newTaskDiv = document.createElement('div');
  newTaskDiv.classList.add("animated-insertion");
  
  newTaskDiv.innerHTML = 
    `<div class="task-box uncompleted">
      <div class="task-item "> 
        <input type="checkbox" value="${false}" class="task-check-box">
        <p class="task-description"> ${taskDescription}  </p>
      </div>
      <div class="date-delete"> 
        <button class="completion-date"> ${plannedDateValue} </button>
        <button class="delete-button pointer"> Delete </button>
      </div>
    </div>`;
  
  hideMotivationalQuoteSection();
  tasksDiv.append(newTaskDiv);
  addEventListenerToTheCheckBox();
  addEventListenerToTheDeleteButton();
}
/**
 * checks if there as any task added to the DOM, then it will hide the motivational quote section. 
 */
function hideMotivationalQuoteSection(){
  const classes = Array (motivationQuote.classList);
  if (classes.indexOf("hide") === -1 ){
    motivationQuote.classList.add("hide");
  }
}

function addEventListenerToTheCheckBox(){
  const checkBoxes = document.querySelectorAll(".task-check-box");
  const lastCheckBoxIndex = checkBoxes.length-1;
  (checkBoxes[lastCheckBoxIndex]).addEventListener('click',updateStatus);
}

function addEventListenerToTheDeleteButton(){
  const deleteButton = document.querySelectorAll(".delete-button");
  const lastDeleteButton = deleteButton.length-1;
  (deleteButton[lastDeleteButton]).addEventListener('click', deleteTask)
}
/**
 * toggle the completed,uncompleted, line-through classes when the checkbox is clicked.
 */
function updateStatus(){
  this.parentElement.parentElement.classList.toggle("completed");
  this.parentElement.parentElement.classList.toggle("uncompleted");
  this.parentElement.parentElement.classList.toggle("line-through");
  filterTasks();
}
/**
 * Delete(remove) the deleted task Div from the DOM
 */
function deleteTask(){
  this.parentElement.parentElement.parentElement.remove();
  generateQuote();
}
/**
 * if all the tasks are deleted, then it will generate a random quote and show it in the motivation Div
 */
function generateQuote(){
  if (document.querySelectorAll(".task-box").length === 0){
    const motivationalQuotes = ['<q> Setting goals is the first step in turning the invisible into the visible.</q> <br> – Tony Robbins',
      '<q> Success is the progressive realization of a worthy goal or ideal. </q> <br> —Earl Nightingale',
      '<q> The trouble with not having a goal is that you can spend your life running up and down the field and never score. </q> <br> —Bill Copeland ',
      '<q> It must be borne in mind that the tragedy of life doesn’t lie in not reaching your goal. The tragedy lies in having no goals to reach. </q> <br> —Benjamin E. Mays ',
      '<q> When it is obvious that the goals cannot be reached, don’t adjust the goals, adjust the action steps. </q> <br> – Confucius ',
      '<q> There’s nothing better than achieving your goals, whatever they might be. </q> <br> – Paloma Faith ',
      '<q> Without some goals and some efforts to reach it, no man can live.  </q> <br>  – John Dewey',
      '<q> Goals are not only absolutely necessary to motivate us. They are essential to really keep us alive.  </q> <br>– Robery H. Schuller',
      '<q> Set realistic goals, keep re-evaluating, and be consistent. </q> <br> – Venus Williams ',
      '<q> It’s an up and down thing, the human goals, because the human is always an explorer, an adventurist. </q> <br> – Cesar Millan ',
    ];
    motivationQuote.classList.remove("hide");
    let randomQuote = Math.floor(Math.random() * 10);
    motivationQuote.innerHTML = motivationalQuotes[randomQuote];
  };
  }
/**
 * toggle hide and view classes of each task div according to the value of the filter and the status of the task. 
 */
 filter.addEventListener('change',filterTasks)
 
 function filterTasks(){
  if(filter.value === "All"){
    allTasks = document.querySelectorAll(".task-box");
      for (const task of allTasks){
        task.classList.remove("hide");
        task.classList.add("view");
      }
  } else if (filter.value === "completed"){
    const completedTasks = (document.querySelectorAll(".completed"));
    for ( const completedTask of completedTasks){
      completedTask.classList.remove("hide");
      completedTask.classList.add("view");
    }
    const uncompletedTasks = document.querySelectorAll(".uncompleted");
    for ( const uncompletedTask of uncompletedTasks){
      uncompletedTask.classList.add("hide");
      uncompletedTask.classList.remove("view");
    }
  } else if (filter.value === "uncompleted"){
    const completedTasks = (document.querySelectorAll(".completed"));
    for ( const completedTask of completedTasks){
      completedTask.classList.remove("view");
      completedTask.classList.add("hide");
    }
    const uncompletedTasks = document.querySelectorAll(".uncompleted");
    for ( const uncompletedTask of uncompletedTasks){
      uncompletedTask.classList.remove("hide");
      uncompletedTask.classList.add("view");
    }
 }
};
/**
 * Sorts the tasks Div in the DOM by the planned date of completion.  
 */
dateSort.addEventListener('change',()=>{
  let elements =  (document.querySelectorAll(".animated-insertion"));
  let elementsArray = [...elements];
  if(dateSort.value == 2){
    elementsLength = elements.length; 
    tasksDiv.innerHTML = "<span> </span>";
    elementsArray.sort(function(a,b){
      return Date.parse(b.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerText)-Date.parse(a.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerText)
    })
    for(let i = 0; i<elementsLength; i++){
      tasksDiv.append(elementsArray[i]);
   }
  } else if( dateSort.value == 1){
    elementsLength = elements.length;
    tasksDiv.innerHTML = "<span> </span>";
    elementsArray.sort(function(a,b){
      return Date.parse(a.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerText)-Date.parse(b.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.innerText)
    })
    for(let i = 0; i<elementsLength; i++){
      tasksDiv.append(elementsArray[i]);
    }
  }
});
  


  


 


