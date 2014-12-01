(function (global) {

    global.App = global.App || {};

    var TodoCollection = Backbone.Collection.extend({
        model: global.App.TodoModel,
        localStorage: new Backbone.LocalStorage('todos-backbone'),

        /**
         * Фильтр завершенных задач
         *
         * @return {Array}
         */
        completed: function () {
            console.log('TodoCollection#completed');
            return this.filter(function (todo) {
                return todo.get('completed');
            });
        },

        /**
         * Фильтр незавершенных задач
         *
         * @return {Array}
         */
        remaining: function () {
            console.log('TodoCollection#remaining');
            // apply позволяет определить контекст указателя `this`
            // в области видимости функции
            return this.without.apply(this, this.completed());
        },

        /**
         * Генерирует следующий порядковый номер для новых элементов
         * Мы поддерживаем порядок задач, хотя сохранение в базе
         * происходит по неупорядоченному GUID
         *
         * @return {Object}
         */
        nextOrder: function () {
            console.log('TodoCollection#nextOrder');
            if (!this.length) {
                return 1;
            }

            return this.last().get('order') + 1;
        },

        /**
         * Параметр сортировки задач
         * по порядку их ввода
         *
         * @param {Object} todo
         * @return {Object}
         */
        comparator: function (todo) {
            console.log('TodoCollection#comparator');
            return todo.get('order');
        },
    });

    // Создание глобальной коллекции задач
    global.App.TodoCollection = new TodoCollection();

})(window);
