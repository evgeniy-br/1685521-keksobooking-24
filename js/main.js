import {getTemplate} from './rendering-ads.js';
import './user-form.js';
import './map.js';
import {createLoader} from './load.js';

const loadAds = createLoader(getTemplate, console.error);

loadAds();
