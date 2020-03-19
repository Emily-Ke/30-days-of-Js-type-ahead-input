const getStateInputElement = () => document.getElementById('state-name');
const getDropdownElement = () => document.getElementById('dropdown');

const fetchStates = () => {
  let fetched = false;
  let states = [];
  return async () => {
    if (!fetched) {
      try {
        const response = await fetch('states');
        states = await response.json();
        fetched = true;
      } catch (err) {
        console.error(err);
      }
    }
    return states;
  };
};
const getStates = fetchStates();

const selectState = e => {
  if (!e.keyCode || e.keyCode === 13) {
    const inputElement = getStateInputElement();
    inputElement.value = e.target.textContent;

    const dropdownElement = getDropdownElement();
    dropdownElement.remove();
  }
};

const buildStateElements = async str => {
  if (!str) {
    return [];
  }
  const states = await getStates();
  const searchPattern = new RegExp(str, 'i');

  return states
    .filter(state => searchPattern.test(state))
    .map(state => {
      const stateElement = document.createElement('li');
      stateElement.innerHTML = state.replace(
        searchPattern,
        '<span class="highlight">$&</span>'
      );
      stateElement.tabIndex = 0;
      stateElement.addEventListener('click', selectState);
      stateElement.addEventListener('keyup', selectState);

      return stateElement;
    });
};

const removeDropdown = () => {
  const dropdownElement = getDropdownElement();
  if (dropdownElement) {
    dropdownElement.remove();
  }
};

const renderDropdown = async e => {
  const lowerCaseValue = e.target.value.toLowerCase();

  removeDropdown();

  if (!lowerCaseValue) return;

  const stateNodes = await buildStateElements(lowerCaseValue);
  if (stateNodes.length > 0) {
    const dropdownElement = document.createElement('ul');
    dropdownElement.id = 'dropdown';
    dropdownElement.append(...stateNodes);

    const stateInputElement = getStateInputElement();
    stateInputElement.insertAdjacentElement('afterend', dropdownElement);
  }
};

const stateInputElement = getStateInputElement();
stateInputElement.addEventListener('input', renderDropdown);
