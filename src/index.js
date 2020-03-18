const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

const getStateInputElement = () => document.getElementById('state-name');
const getDropdownElement = () => document.getElementById('dropdown');

const selectState = e => {
  if (!e.keyCode || e.keyCode === 13) {
    const inputElement = getStateInputElement();
    inputElement.value = e.target.textContent;

    const dropdownElement = getDropdownElement();
    dropdownElement.remove();
  }
};

const buildStateElements = (str = '') =>
  states
    .filter(state => state.toLowerCase().includes(str) && state !== str)
    .map(state => {
      const stateElement = document.createElement('div');
      stateElement.textContent = state;
      stateElement.tabIndex = 0;
      stateElement.addEventListener('click', selectState);
      stateElement.addEventListener('keyup', selectState);
      return stateElement;
    });

const removeDropdown = () => {
  const dropdownElement = getDropdownElement();
  if (dropdownElement) {
    dropdownElement.remove();
  }
};

const renderDropdown = e => {
  const lowerCaseValue = e.target.value.toLowerCase();

  removeDropdown();

  if (!lowerCaseValue) return;

  const stateNodes = buildStateElements(lowerCaseValue);
  if (stateNodes.length > 0) {
    const dropdownElement = document.createElement('div');
    dropdownElement.id = 'dropdown';
    dropdownElement.append(...stateNodes);

    const stateInputElement = getStateInputElement();
    stateInputElement.insertAdjacentElement('afterend', dropdownElement);
  }
};

const stateInputElement = getStateInputElement();
stateInputElement.addEventListener('input', renderDropdown);
