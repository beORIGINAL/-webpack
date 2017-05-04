import { SessionStorageFactory } from './session-storage.factory';

export default angular.module(MODULE_ID(), [])
    .factory('Storage', SessionStorageFactory)
    .name;