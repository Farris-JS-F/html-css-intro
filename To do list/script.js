const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

function addTask() {
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="task-item">
      <div class="task-icon"></div>
      <span class="task-text">${taskText}</span>
    </div>
    <button class="delete-btn" title="Delete task">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;
  taskList.appendChild(li);
  bindTaskEvents(li);
  input.value = '';
}

function bindTaskEvents(li) {
  const icon = li.querySelector('.task-icon');
  const deleteBtn = li.querySelector('.delete-btn');

  icon.addEventListener('click', () => {
    icon.classList.toggle('done');
    const currentText = li.querySelector('.task-text');
    if (currentText) {
      currentText.classList.toggle('done');
    }
  });

  deleteBtn.addEventListener('click', () => {
    li.classList.add('fade-out');
    setTimeout(() => li.remove(), 300);
  });

  function bindTextClick(span) {
    span.addEventListener('click', () => {
      const wasDone = span.classList.contains('done');
      const currentText = span.textContent;
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = currentText;
      inputEdit.className = 'task-text';

      span.replaceWith(inputEdit);
      inputEdit.focus();

      function saveEdit() {
        const newText = inputEdit.value.trim() || currentText;
        const newSpan = document.createElement('span');
        newSpan.className = 'task-text';
        newSpan.textContent = newText;
        if (wasDone) newSpan.classList.add('done');

        inputEdit.replaceWith(newSpan);
        bindTextClick(newSpan);
      }

      inputEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveEdit();
      });

      inputEdit.addEventListener('blur', saveEdit);
    });
  }

  const span = li.querySelector('.task-text');
  bindTextClick(span);
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});
