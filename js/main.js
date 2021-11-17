import { getTemplate } from './ads-list.js';
import { openSuccessMessage, openMessageError, activateInactiveState } from './user-form.js';
import './map.js';
import { createLoader, setUserFormSubmit } from './load.js';
import { showAlert } from './util.js';
import './filter.js';
import './preview-photo.js';

const loadAds = createLoader(getTemplate, showAlert);

activateInactiveState();

loadAds();

setUserFormSubmit(openSuccessMessage, openMessageError);

export { loadAds };
