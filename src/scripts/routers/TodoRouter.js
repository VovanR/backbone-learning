(function (global) {

    global.App = global.App || {};

    var TodoRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter',
        },

        /**
         * @param {String} param
         */
        setFilter: function (param) {
            console.log('TodoRouter#setFilter', param);
            if (param) {
                param = param.trim();
            }
            global.App.TodoFilter = param || '';
            window.App.TodoCollection.trigger('filter');
        },
    });

    global.App.TodoRouter = new TodoRouter();
    Backbone.history.start();

})(window);
