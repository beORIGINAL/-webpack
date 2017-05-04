import { CoreConfig } from './core.config';

export default angular.module(MODULE_ID(),
    [
        'ui.router',
        'ui.bootstrap',
        'ngTagsInput',
        'ngStomp',
        'angularAwesomeSlider',
        'smart-table',
        'toastr'
    ])
    .config(CoreConfig)
    .name;