
document.addEventListener('DOMContentLoaded', function() {
    let input = document.getElementById('new-task');
    let addButton = document.getElementById('add-task');
    let taskList = document.getElementById('task-list');
    let filterSelect = document.getElementById('filter-tasks');

    addButton.addEventListener('click', function() {
        let newTask = input.value;
        let li = document.createElement('li');
        let taskText = document.createElement('span');
        taskText.textContent = newTask;
        li.appendChild(taskText);

        let editButton = document.createElement('button');
        editButton.textContent = 'Modifier';

        editButton.addEventListener('click', function() {
            let editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = taskText.textContent;
            let validateButton = document.createElement('button');
            validateButton.textContent = 'Valider';

            taskText.innerHTML = '';
            taskText.appendChild(editInput);
            taskText.appendChild(validateButton);

            validateButton.addEventListener('click', function() {
                taskText.textContent = editInput.value;
                li.appendChild(editButton);
                li.appendChild(deleteButton);
            });
        });

        li.appendChild(editButton);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });
        li.appendChild(deleteButton);

        let doneButton = document.createElement('button');
        doneButton.textContent = 'Finished';
        doneButton.classList.add('done-button');
        doneButton.addEventListener('click', function() {
            li.classList.toggle('completed');
            updateDoneButtonColor(li);
        });
        li.appendChild(doneButton);

        taskList.appendChild(li);
        input.value = '';
    });

    filterSelect.addEventListener('change', function() {
        let selectedFilter = filterSelect.value;
        let tasks = taskList.getElementsByTagName('li');

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            if (selectedFilter === 'all') {
                task.style.display = '';
            } else if (selectedFilter === 'finished' && task.classList.contains('completed')) {
                task.style.display = '';
            } else if (selectedFilter === 'in-progress' && !task.classList.contains('completed')) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        }
    });

    document.addEventListener('click', function(event) {
        let target = event.target;
        if (target.tagName === 'LI') {
            target.classList.toggle('completed');
            updateDoneButtonColor(target);
        }
    });

    function updateDoneButtonColor(taskElement) {
        let doneButton = taskElement.querySelector('.done-button');
        if (taskElement.classList.contains('completed')) {
            doneButton.style.backgroundColor = 'red';
        } else {
            doneButton.style.backgroundColor = 'green';
        }
    }
});


