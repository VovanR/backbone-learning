(function (global) {

    global.App = global.App || {};

    global.App.TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#item-template').html()),
        /**
         */
        initialize: function () {
            console.info('TodoView#initialize');
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },
        /**
         */
        render: function () {
            console.log('TodoView#render');
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.toggleVisible();
            this.$input = this.$('.edit');

            return this;
        },
        events: {
            'click .toggle': 'toggleCompleted',
            'dblclick label': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close',
        },

        /**
         * Переключает видимость элемента
         */
        toggleVisible: function () {
            console.log('TodoView#toggleVisible');
            this.$el.toggleClass('hidden', this.isHidden());
        },

        /**
         * Должен ли элемент быть скрытым
         */
        isHidden: function () {
            console.log('TodoView#isHidden');
            var isCompleted = this.model.get('completed');
            console.log(isCompleted, global.App.TodoFilter)
            return (
                (!isCompleted && global.App.TodoFilter === 'completed') ||
                (isCompleted && global.App.TodoFilter === 'active')
            );
        },

        /**
         * Переключает состояние `completed` модели
         */
        toggleCompleted: function () {
            console.log('TodoView#toggleCompleted');
            this.model.toggle();
        },

        /**
         */
        edit: function () {
            console.log('TodoView#edit');
            this.$el.addClass('editing');
            this.$input.focus();
        },

        /**
         */
        close: function () {
            console.log('TodoView#close');
            var value = this.$input.val().trim();
            if (value) {
                this.model.save({
                    title: value,
                });
            } else {
                this.clear();
            }
            this.$el.removeClass('editing');
        },

        /**
         * @param {Event} e
         */
        updateOnEnter: function (e) {
            console.log('TodoView#updateOnEnter', e);
            if (e.which === ENTER_KEY) {
                this.close();
            }
        },

        /**
         * Удаляет элемент, уничтожает модель
         * в локальном хранилище и удаляет ее представление
         */
        clear: function () {
            console.log('TodoView#clear');
            this.model.destroy();
        },
    });

})(window);
