// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {

    // DOM Load event - runs as soon as the DOM is loaded up
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear all tasks event
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);

}


// Get Tasks from local storage
function getTasks(){
    let tasks;
    // Checks if there is nothing in the local storage and then sets task to an empty array
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        // Local storage can only store strings so we need to parse it as JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Explaination of this loop: It loops through each task which is currenlty saved into the local storage
        // It then creates a li element, a tag, i tag and inputs it into the HTML
        // The getTasks function is a combination of the storeTaskinLocalStorage() function and addTasks() function.

        // Create li element
    const li = document.createElement('li');
    // Add a class to li
    li.className = 'collection-item'
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link
    const link = document.createElement('a');
    // Add the class to the new link
    link.className = 'delete-item secondary-content';

    // Create i tag for the graphical x Mark
    const redX = document.createElement('i');
    // Add classes to redX
    redX.className = 'fa fa-remove'

    // Add icon to the a tag
    link.appendChild(redX);

    // Add the link to the li
    li.appendChild(link);

    // Append the li to the ul
    taskList.appendChild(li);
    });

}



// Add task function
function addTask(e) {
    // Check for nil value
    if(taskInput.value === ''){
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add a class to li
    li.className = 'collection-item'
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link
    const link = document.createElement('a');
    // Add the class to the new link
    link.className = 'delete-item secondary-content';

    // Create i tag for the graphical x Mark
    const redX = document.createElement('i');
    // Add classes to redX
    redX.className = 'fa fa-remove'

    // Add icon to the a tag
    link.appendChild(redX);

    // Add the link to the li
    li.appendChild(link);

    // Append the li to the ul
    taskList.appendChild(li);


    //Store in local storage
    storeTaskinLocalStorage(taskInput.value);



    // Clear the input for further use
    taskInput.value = '';

    e.preventDefault();
}


// Local storage function
function storeTaskinLocalStorage(task){
    let tasks;
    // Checks if there is nothing in the local storage and then sets task to an empty array
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        // Local storage can only store strings so we need to parse it as JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Push onto the tasks variable the task that was passed through to the function as a parameter
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Remove task function
function removeTask(e){
    // Because of the structure of the HTML clicking the X gives us the i tag
    // but we want the 'a' tag 
    if (e.target.parentElement.classList.contains('delete-item')){
       if(confirm('Are you sure?')){
            // Parent of the 'a' tag is the li
            e.target.parentElement.parentElement.remove();

            // Remove it from the local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       }
    }
}


// Remove task from local storage function
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    // Checks if there is nothing in the local storage and then sets task to an empty array
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        // Local storage can only store strings so we need to parse it as JSON
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        // Check to see the task item textContent if that equals the curent taks in the interation.
        // If it does then thats the one we want to delete.
        if(taskItem.textContent === task){
            // We delete it with splice
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Clear all tasks function
function clearTasks(e){
    // While there is something in the list
   while(taskList.firstChild) {
       // Removes the first child if there is one
      taskList.removeChild(taskList.firstChild);
   }
   // Clear all tasks from Local storage
   clearTasksFromLocalStorage();

}

// Clear all tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear()
}


function filterTasks(e) {
    // This gives us what ever is being typed in.
    const text = e.target.value.toLowerCase();

    // querySelectorAll returns a node list so we can loop with forEach();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        // If there is a match then it will be item number 0 and it will display block
        console.log(item.toLowerCase().indexOf(text))
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else {
            // Otherwise it will hide it
            task.style.display = 'none';
        }
    });
}








// Adding the transform effect to task label

const focusTarget = document.querySelector('#task');
const blurTarget = document.querySelector('#task');
const focusEffect = document.querySelector('#task-label');

focusTarget.addEventListener('focus', addActive);
blurTarget.addEventListener('blur', removeActive);

function addActive () {
    focusEffect.className = 'active'

}

function removeActive () {
    focusEffect.classList.remove('active');

}

// Adding the transform effect to filter label

const focusTargetFilter = document.querySelector('#filter');
const blurTargetFilter = document.querySelector('#filter');
const focusEffectFilter = document.querySelector('#filter-label');

focusTargetFilter.addEventListener('focus', addActiveFilter);
blurTargetFilter.addEventListener('blur', removeActiveFilter);

function addActiveFilter () {
    focusEffectFilter.className = 'active'

}

function removeActiveFilter () {
        focusEffectFilter.classList.remove('active');


}