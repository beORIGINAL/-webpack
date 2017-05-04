import Directives from './directives';
import Filters from './filters';
import Services from './services';

export default angular.module(MODULE_ID(),
    [
        Directives,
        Filters,
        Services
    ])
    .name;