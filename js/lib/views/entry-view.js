var Backbone = require('backbone');
var _ = require('underscore');

var entryTemplateText = require('raw!./entry-view-template.ejs');
// var entryTemplateText = $('#entry-template').html();

var EntryView = Backbone.View.extend({
    template: _.template( entryTemplateText ),
    model: null,
    tagName: 'div',
    events: {
        'click .editable': 'editSomething',
        'keypress .edit-input': 'editCompleted'
    },
    editSomething: function(evt) {
        var $this = $(evt.target);
        var origText = $this.text();
        $this.replaceWith('<input class="edit-input" type="text" value="' + origText + '">');
    },
    editCompleted: function(evt) {
        var $this = $(evt.target);
        if (evt.keyCode === 13) {
            alert($this.val());
        }
    },
    render: function() {
        this.$el.html( this.template({entry: this.model}) );
    }
});

module.exports = EntryView;