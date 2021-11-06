import {getTemplate} from './ads-list.js';
import {resetForm, treatmentMessageError} from './user-form.js';
import './map.js';
import {createLoader, setUserFormSubmit} from './load.js';
import {showAlert} from './util.js';

const loadAds = createLoader(getTemplate, showAlert);

loadAds();

setUserFormSubmit(resetForm, treatmentMessageError);

export {loadAds};
