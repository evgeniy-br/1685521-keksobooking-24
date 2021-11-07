import {getTemplate} from './ads-list.js';
import {resetForm, treatmentMessageError, activateInactiveState, activateActiveState} from './user-form.js';
import './map.js';
import {createLoader, setUserFormSubmit} from './load.js';
import {showAlert} from './util.js';

activateInactiveState();

const loadAds = createLoader(getTemplate, showAlert, activateActiveState);

loadAds();

setUserFormSubmit(resetForm, treatmentMessageError);

export {loadAds};
