var ItemView = Backbone.View.extend({
    template: _.template($('#todo').html()),
    render: function () {
        console.log('ItemView render');
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
});

var ListView = Backbone.View.extend({
    el: '#todo',
    initialize: function () {
        console.log('ListView initialize');
        this.render();
    },
    render: function () {
        console.log('ListView render');
        var items = this.model.get('items');
        _.each(items, function (item) {
            var itemView = new ItemView({
                model: item,
            });
            this.$(el).append(itemView.render().el);
        }, this);
    },
});

var TodoModel = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false,
    },
    validate: function (attrs) {
        if (!attrs.title) {
            return 'Remember to set `title` for your todo';
        }
    },
    initialize: function () {
        console.log('TodoModel initialize');
        this.on('invalid', function (model, error) {
            console.log(error);
        });
    },
});
var myTodos = new TodoModel();

var oneTodo = new TodoModel({
    title: 'one',
});
var twoTodo = new TodoModel({
    title: 'two',
});
var threeTodo = new TodoModel({
    title: 'three',
});

var listView = new ListView({
    model: myTodos,
});
