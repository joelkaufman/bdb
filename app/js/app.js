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
        
        function todo(){}

        function getAllTags(todos) {
            var tags = [];

            angular.forEach(todos, function (val, key) {
                tags = tags.concat(val.tags);
            });

            return tags.unique();
        }

        todo.get = function(){
            return {
                items: window.todo,
                tags:getAllTags(window.todo)
            }
        };

        todo.filterBy = function(filters){

            function tagFilter(item)
            {
                for (var i = 0; i < filters.length; i++) {
                    if(!  (!!~ item.tags.indexOf(filters[i])) ) return false;
                }
                return true;
            }

            var data = this.get();
            data.items =  data.items.filter(tagFilter);

            return data;

        };

        return todo;
    });


    app.controller('todo', function($scope, todo){
        $scope.selected  = {
            filters: []
        };

        $scope.todo = todo.get();

        $scope.filterBy = function(item){
            $scope.todo = todo.filterBy($scope.selected.filters);
        }
  
    })

}());