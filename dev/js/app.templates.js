(function(module) {
try { module = angular.module("app.templates"); }
catch(err) { module = angular.module("app.templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/test.html",
    "<h1>hello</h1>");
}]);
})();
