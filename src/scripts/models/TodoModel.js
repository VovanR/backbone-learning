(function (global) {

    global.App = global.App || {};

    global.App.TodoModel = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false,
        },

        /**
         */
        toggle: function () {
            console.log('TodoModel#toggle');
            this.save({
                completed: !this.get('completed'),
            });
        },
    });

})(window);
