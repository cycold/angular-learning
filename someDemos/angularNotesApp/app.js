var app = angular.module('noteApp',[]);

app.directive('notepad',function(notesFactory) {
	return {
        restrict: 'EA',
        scope: {},
        link: function(scope, ele, attrs) {

        	scope.restore = function() {
        		scope.editMode = false;
                scope.index = -1;
                scope.noteText = '';
        	};

            scope.openEditor = function(index) {
            	scope.editMode = true;

                if (index !== undefined) {
                    scope.noteText = notesFactory.get(index).content;
                    scope.index = index;
                } else {
                    scope.noteText = undefined;
                }
            };
            
            scope.save = function() {
                console.log(scope.noteText);
            	if (scope.noteText !== '' && scope.noteText !== undefined) {
                    var note = {};
                    note.title = scope.noteText.length > 10 ? scope.noteText.substring(0,10) + '...' : scope.noteText;
                    note.content = scope.noteText;
                    note.id = scope.index != -1 ? scope.index : localStorage.length;
                    scope.notes = notesFactory.put(note);
                }

                scope.restore();
            };

            //var editor = ele.find('#editor');
            var editor = angular.element(ele[0].querySelector('#editor'));
            //console.log(editor);

            scope.restore();

            scope.notes = notesFactory.getAll();

            //console.log(scope.notes);

            editor.bind('keyup keydown',function() {
            	scope.noteText = editor.text().trim();
            });

        },
        templateUrl: 'templateurl.html'
    };
});


app.factory('notesFactory',function() {
	return {
        put: function(note) {
        	localStorage.setItem('note' + note.id, JSON.stringify(note));
            return this.getAll();
        },

        get: function(index) {
        	return JSON.parse(localStorage.getItem('note' + index));
        },
        
        getAll: function() {
        	var notes = [];
            for (var i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).indexOf('note') !== -1) {
                    var note = localStorage.getItem(localStorage.key(i));
                    notes.push(JSON.parse(note));
                }
            }

            return notes;
        }
    };
});


