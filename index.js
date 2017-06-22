const app = new Vue({
  el: '#app',
  data: {
    query: null,
    todos: [{
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
    }],
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
    removeTodo: function(id) {
      this.todos = this.todos.filter(r => r.id !== id);
    },
  },
  computed: {
    filteredList: function() {
      if (!this.query) { return this.todos; }
      const regex = new RegExp(this.query, 'i');
      return this.todos.filter(todo => todo.task.match(regex));
    }
  },
});
