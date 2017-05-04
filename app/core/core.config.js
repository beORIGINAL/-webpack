export function CoreConfig ($compileProvider, $httpProvider, $logProvider, $locationProvider , $urlRouterProvider) {
    'ngInject';
    $compileProvider.debugInfoEnabled(DEV_ENVIRONMENT);
    $compileProvider.commentDirectivesEnabled(DEV_ENVIRONMENT);
    $compileProvider.cssClassDirectivesEnabled(DEV_ENVIRONMENT);

    $logProvider.debugEnabled(DEV_ENVIRONMENT);
    $locationProvider.hashPrefix('');

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $urlRouterProvider.otherwise('/');
}