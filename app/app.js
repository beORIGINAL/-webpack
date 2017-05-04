//@require "./**/*.tpl.html"
import Core from './core';
import Common from './common';
import Components from './components';

export default angular.module(MODULE_ID(),
    [
        Core,
        Common,
        Components
    ])
    .name;