import appModule from './app';

angular.element(document).ready(() => {
    angular.bootstrap(document.body, [
        appModule
    ], { strictDi: true });
});