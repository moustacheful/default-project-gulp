(function(module) {
try { module = angular.module("app.templates"); }
catch(err) { module = angular.module("app.templates", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("app/partials/test.html",
    "<div class=\"hello\">\n" +
    "</div>");
}]);
})();
