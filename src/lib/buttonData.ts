import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = [{"name":"Untitled","model":"gpt-3.5-turbo","prompt":"","shortcut":{control: false, alt: false, shift: true, code: 'Digit1'}}];

// Check both for browser and localStorage
const isLocalStorageAvailable = browser && typeof window.localStorage !== 'undefined';

const getStoredValue = (key, fallbackValue) => {
  if (isLocalStorageAvailable) {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallbackValue;
  }
  return fallbackValue;
}

const setStoredValue = (key, value) => {
  if (isLocalStorageAvailable) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

const buttonData = writable(getStoredValue('buttonData', defaultValue));
buttonData.subscribe((value) => {
    setStoredValue('buttonData', value);
});

const lastClickedButton = writable(getStoredValue('lastButton', {model: 'gpt-3.5-turbo', prompt: ''}));
lastClickedButton.subscribe((value) => {
    setStoredValue('lastButton', value);
});

export { buttonData, lastClickedButton };
