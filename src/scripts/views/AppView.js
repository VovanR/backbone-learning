(function (global) {

    global.App = global.App || {};

    global.App.AppView = Backbone.View.extend({
        el: '#todoapp',
        statsTemplate: _.template($('#stats-template').html()),
        /**
         */
        initialize: function () {
            console.info('AppView#initialize');

            this.allCheckbox = this.$('#toggle-all')[0];
            this.$input = this.$('#new-todo');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');

            this.listenTo(global.App.TodoCollection, 'add', this.addOne);
            this.listenTo(global.App.TodoCollection, 'reset', this.addAll);
            this.listenTo(global.App.TodoCollection, 'change:completed', this.filterOne);
            this.listenTo(global.App.TodoCollection, 'filter', this.filterAll);
            this.listenTo(global.App.TodoCollection, 'all', this.render);

            global.App.TodoCollection.fetch();
        },
        /**
         */
        render: function () {
            console.log('AppView#render');
            var completed = global.App.TodoCollection.completed().length;
            var remaining = global.App.TodoCollection.remaining().length;

            if (global.App.TodoCollection.length) {
                this.$main.show();
                this.$footer.show();
                this.$footer.html(
                    this.statsTemplate({
                        completed: completed,
                        remaining: remaining,
                    })
                );
                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (global.App.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },
        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplete',
        },

        /**
         * Добавление в список единственной задачи путем создания
         * представления для нее и добавления ееэоемента в `ul`
         *
         * @param {Object} todo
         */
        addOne: function (todo) {
            console.log('AppView#addOne', todo);
            var view = new global.App.TodoView({
                model: todo,
            });
            $('#todo-list').append(view.render().el);
        },

        /**
         * Одновременное добавление всех элементов в колекцию
         */
        addAll: function () {
            console.log('AppView#addAll');
            this.$('#todo-list').html('');
            global.App.TodoCollection.each(this.addOne, this);
        },

        /**
         * @param {Object} todo
         */
        filterOne: function (todo) {
            console.log('AppView#filterOne');
            todo.trigger('visible');
        },

        /**
         */
        filterAll: function () {
            console.log('AppView#filterAll');
            global.App.TodoCollection.each(this.filterOne, this);
        },

        /**
         * @return {Object}
         */
        newAttributes: function () {
            console.log('AppView#newAttributes');
            return {
                title: this.$input.val().trim(),
                order: global.App.TodoCollection.nextOrder(),
                completed: false,
            };
        },

        /**
         * @param {Event} event
         */
        createOnEnter: function (event) {
            console.log('AppView#createOnEnter', event);
            if (event.which !== global.ENTER_KEY || !this.$input.val().trim()) {
                return;
            }

            global.App.TodoCollection.create(this.newAttributes());
            this.$input.val('');
        },

        /**
         * Удаляет все завершенные задачи, уничтожая их модели
         *
         * @return {Boolean} false
         */
        clearCompleted: function () {
            console.log('AppView#clearCompleted');
            _.invoke(global.App.TodoCollection.completed(), 'destroy');

            return false;
        },

        /**
         */
        toggleAllComplete: function () {
            console.log('AppView#toggleAllComplete');
            var completed = this.allCheckbox.checked;
            global.App.TodoCollection.each(function (todo) {
                todo.save({
                    'completed': completed,
                });
            });
        },
    });

})(window);
