(function() { 
  // CONFIGURATION — Masukkan detail project Supabase kamu di sini
  const SUPABASE_URL = 'https://ybbmgrooqrxijvuysufz.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliYm1ncm9vcXJ4aWp2dXlzdWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMzA3NDIsImV4cCI6MjA5NDgwNjc0Mn0.JCSpHTwjFCROZcM6OQxX4h2CyflMIyD_RoRCrof4boA';

  // Inisialisasi Supabase Client
  console.log('Initializing Supabase with URL:', SUPABASE_URL);
  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // DOM Elements
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');
  const taskCount = document.getElementById('taskCount');
  const btnRefresh = document.getElementById('btnRefresh');
  const configAlert = document.getElementById('configAlert');

  // Sembunyikan alert jika config sudah diisi
  if (SUPABASE_URL && !SUPABASE_URL.includes('YOUR_SUPABASE_URL')) {
    configAlert.style.display = 'none';
  }

  /**
   * FETCH: Mengambil semua data dari table 'todos'
   */
  async function fetchTodos() {
    console.log('Fetching todos...');
    todoList.innerHTML = '<li class="loading">Memuat data...</li>';
    
    try {
      const { data, error } = await supabaseClient
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      console.log('Data received:', data);
      renderTodos(data);
    } catch (error) {
      console.error('Fetch Error:', error.message);
      todoList.innerHTML = `<li class="loading" style="color: red;">Error: ${error.message}</li>`;
    }
  }

  /**
   * RENDER: Menampilkan data ke UI
   */
  function renderTodos(todos) {
    todoList.innerHTML = '';
    taskCount.textContent = `${todos.length} Tugas`;

    if (todos.length === 0) {
      todoList.innerHTML = '<li class="loading">Belum ada tugas. Yuk tambah satu!</li>';
      return;
    }

    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.innerHTML = `
        <span class="todo-text">${todo.name || 'Tanpa Nama'}</span>
        <div class="todo-actions">
          <button class="btn-delete" data-id="${todo.id}" title="Hapus">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </div>
      `;
      
      // Add event listener to delete button
      li.querySelector('.btn-delete').addEventListener('click', function() {
        deleteTodo(this.getAttribute('data-id'));
      });
      
      todoList.appendChild(li);
    });
  }

  /**
   * CREATE: Menambah data baru ke table 'todos'
   */
  async function addTodo(taskName) {
    console.log('Adding todo:', taskName);
    try {
      const { data, error } = await supabaseClient
        .from('todos')
        .insert([{ name: taskName }]);

      if (error) {
        console.error('Insert Error:', error);
        throw error;
      }
      
      console.log('Insert success');
      todoInput.value = '';
      await fetchTodos();
    } catch (error) {
      console.error('Add Error:', error.message);
      alert('Gagal menambah tugas: ' + error.message);
    }
  }

  /**
   * DELETE: Menghapus data berdasarkan ID
   */
  async function deleteTodo(id) {
    if (!confirm('Yakin ingin menghapus tugas ini?')) return;

    try {
      const { error } = await supabaseClient
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTodos();
    } catch (error) {
      alert('Gagal menghapus: ' + error.message);
    }
  }

  // Event Listeners
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    if (task) addTodo(task);
  });

  btnRefresh.addEventListener('click', fetchTodos);

  // Initial Load
  if (SUPABASE_URL && !SUPABASE_URL.includes('YOUR_SUPABASE_URL')) {
    fetchTodos();
  }
})();
