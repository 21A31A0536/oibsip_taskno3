let taskItems = []
const taskInput = document.querySelector('.task-input')
const finishedTasksDiv = document.querySelector('.finished-tasks')
const unfinishedTasksDiv = document.querySelector('.unfinished-tasks')


window.onload = () => {
    let storageTaskItems = localStorage.getItem('taskItem')
    if(storageTaskItems !== null){
        taskItems = JSON.parse(storageTaskItems)
    }
    render()
}

taskInput.onkeyup = ((e) => {
    let value = e.target.value.replace(/^\s+/, "")
    if(value && e.keyCode === 13){
        addTask(value)

        taskInput.value = ''
        taskInput.focus()
    }
})

//Add task
function addTask(text){
    taskItems.push({
        id: Date.now(),
        text,
        finished: false
    })
    saveAndRender();
}

//Remove task
function removeTask(id){
    taskItems = taskItems.filter(task => task.id !== Number(id))
    saveAndRender()
}

//Mark as finished
function markAsFinished(id){
    taskItems = taskItems.filter(task => {
        if(task.id === Number(id)){
            task.finished = true
        }
        return task
    })

    saveAndRender()
}

//Mark as unfinished
function markAsUnfinished(id){
    taskItems = taskItems.filter(task => {
        if(task.id === Number(id)){
            task.finished = false
        }
        return task
    })

    saveAndRender()
}

//Save in localStorage
function save(){
    localStorage.setItem('taskItems', JSON.stringify(taskItems))
}

//Render
function render(){
    let unFinishedTasks = taskItems.filter(item => !item.finished)
    let finishedTasks = taskItems.filter(item => item.finished)

    finishedTasksDiv.innerHTML = ''
    unfinishedTasksDiv.innerHTML = ''

    if(unFinishedTasks.length > 0){
        unFinishedTasks.forEach(task => {
            unfinishedTasksDiv.append(createTaskElement(task))
            
        });
    } else{
        unfinishedTasksDiv.innerHTML = "<div class = 'empty'>No Uncompleted Tasks</div>"

    }
    if(finishedTasks.length > 0){
        finishedTasksDiv.innerHTML = "<div class = 'finished-title'>Finished Tasks</div>"

        finishedTasks.forEach(task => {
            finishedTasksDiv.append(createTaskElement(task))
        })
    }
}

//Save and Render
function saveAndRender(){
    save()
    render()
}

//Create task list item
function createTaskElement(task){
    const taskDiv = document.createElement('div')
    taskDiv.setAttribute('data-id', task.id)
    taskDiv.className = 'task-item'

    const taskTextSpan = document.createElement('span')
    taskTextSpan.innerHTML = task.text

    const taskInputCheckbox = document.createElement('input')
    taskInputCheckbox.type = 'checkbox'
    taskInputCheckbox.checked = task.finished
    taskInputCheckbox.onclick = (e) => {
        let id = e.target.closest('.task-item').dataset.id
        e.target.checked ? markAsFinished(id) : markAsUnfinished(id)
    }

    //Delete tasks
    const taskRemoveBtn = document.createElement('a')
    taskRemoveBtn.href = '#'
    taskRemoveBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
        '<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>' +
        '<path d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3zm-9.387 6.21l.094 .083l2.293 2.292l2.293 -2.292a1 1 0 0 1 1.497 1.32l-.083 .094l-2.292 2.293l2.292 2.293a1 1 0 0 1 -1.32 1.497l-.094 -.083l-2.293 -2.292l-2.293 2.292a1 1 0 0 1 -1.497 -1.32l.083 -.094l2.292 -2.293l-2.292 -2.293a1 1 0 0 1 1.32 -1.497z" stroke-width="0" fill="currentColor"></path>' +
        '</svg>'
    taskRemoveBtn.onclick = (e) => {
        let id = e.target.closest('.task-item').dataset.id
        removeTask(id)
    }

    taskTextSpan.prepend(taskInputCheckbox)
    taskDiv.appendChild(taskTextSpan)
    taskDiv.appendChild(taskRemoveBtn)

    return taskDiv


}


