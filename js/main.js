import { getTemplate } from './ads-list.js';
import { resetForm, treatmentMessageError, activateInactiveState } from './user-form.js';
import './map.js';
import { createLoader, setUserFormSubmit } from './load.js';
import { showAlert } from './util.js';
import './filter.js';

const loadAds = createLoader(getTemplate, showAlert);

activateInactiveState();

loadAds();

setUserFormSubmit(resetForm, treatmentMessageError);

export { loadAds };
