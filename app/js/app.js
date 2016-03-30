/**
 * Created by relieve on 3/23/16.
 */
(function(){
    'use strict';

    Array.prototype.unique = function() {
        var a = this.concat();

        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    };



    var app = angular.module('app', ['ui.select', 'ngSanitize']);
    
    app.factory('todo', function($q, $http){ 

        var cache  = window.todo;

        function todo(){
            this.items = cache;
            this.tags = this.getAllTags()
        }

        todo.prototype.getAllTags = function() {
            var tags = [];

            angular.forEach(this.items, function (val, key) {
                tags = tags.concat(val.tags);
            });

            return tags.unique();
        }

    

        todo.prototype.filterBy = function(filters){

            function tagFilter(item)
            {
                for (var i = 0; i < filters.length; i++) {
                    if(!  (!!~ item.tags.indexOf(filters[i])) ) return false;
                }
                return true;
            }

            this.items = cache.filter(tagFilter);
        };

        return new todo();
    });


    app.controller('todo', function($scope, todo){
        $scope.todo = todo;

        $scope.selected  = {
            filters: []
        };

        $scope.editTags = function(){
            $scope.todo.tags = todo.getAllTags();
        }
  
    })

}());