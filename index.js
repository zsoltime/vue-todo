const TodoStorage = {
  get: function() {
    const strItems = localStorage.getItem('zsVueTodos');
    let items;

    try {
      items = JSON.parse(strItems);
    } catch (e) {
      console.error(e.message);
    }

    return Array.isArray(items) ? items : [];
  },
  set: function(updatedItems) {
    if (Array.isArray(updatedItems)) {
      localStorage.setItem('zsVueTodos', JSON.stringify(updatedItems));
      return updatedItems;
    }
    return undefined;
  },
  wipe: function() {
    localStorage.removeItem('zsVueTodos');
  },
};

const defaultTodos = [{
  id: Math.random(),
  task: 'Learn Vue.js',
  done: false,
}, {
  id: Math.random(),
  task: 'Learn Vuex',
  done: false,
}, {
  id: Math.random(),
  task: 'Learn ES6',
  done: true,
}, {
  id: Math.random(),
  task: 'Finish this todo app',
  done: true,
}, {
  id: Math.random(),
  task: 'Make other awesome apps',
  done: false,
}];

const app = new Vue({
  el: '#app',
  data: {
    cachedTodo: null,
    editedTodo: null,
    query: null,
    todos: [],
  },
  mounted: function() {
    const todos = TodoStorage.get();
    this.todos = todos.length ? todos : defaultTodos;
  },
  watch: {
    todos: {
      deep: true,
      handler: function(val) {
        TodoStorage.set(val);
      }
    },
  },
  methods: {
    beforeEnter: function(el) {
      el.classList.add('todo__item--before-enter');
    },
    enter: function(el, done) {
      // should only delay on page load
      setTimeout(() => {
        el.classList.add('todo__item--enter');
        el.classList.remove('todo__item--before-enter');
        done();
      }, el.dataset.index * 100);
    },
    leave: function(el, done) {
      el.classList.add('todo__item--leave');
      el.classList.remove('todo__item--enter');
      setTimeout(() => {
        done();
      }, 300);
    },
    removeTodo: function(todo) {
      this.todos = this.todos.filter(r => r.id !== todo.id);
    },
    editTodo: function(todo) {
      this.editedTodo = todo.id;
      this.cachedTodo = todo.task;
    },
    handleEdit: function(todo) {
      if (!this.editedTodo) { return; }
      this.editedTodo = null;
    },
    cancelEdit: function(todo) {
      this.editedTodo = null;
      todo.task = this.cachedTodo;
    },
  },
  computed: {
    filteredList: function() {
      if (!this.query) { return this.todos; }
      const regex = new RegExp(this.query, 'i');
      return this.todos.filter(todo => todo.task.match(regex));
    }
  },
  directives: {
    focus: function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    },
  },
});
