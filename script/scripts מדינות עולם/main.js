import { getDataAsync } from './countries.js';
import { createAllCards } from './dom.js';

await getDataAsync();
createAllCards();
