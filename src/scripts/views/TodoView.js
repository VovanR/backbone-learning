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
        },
        /**
         */
        render: function () {
            console.log('TodoView#render');
            this.$el.html(this.template(this.model.toJSON()));
            this.$input = this.$('.edit');

            return this;
        },
        events: {
            'dblclick label': 'edit',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close',
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
            }
            this.$el.removeClass('editing');
        },

        /**
         * @param {Event} e
         */
        updateOnEnter: function (e) {
            console.log('TodoView#updateOnEnter');
            if (e.which === ENTER_KEY) {
                this.close();
            }
        },
    });

})(window);
