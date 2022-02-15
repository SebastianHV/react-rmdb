// Convert time to hours and minutes
export const calcTime = time => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = money => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};

export const isPersistedState = stateName => {
  // We can use either sessionStorage or localStorage
  // We invoke the method getItem
  // This will return the state from the session storage if there is a state,
  // otherwise it will return null
  const sessionState = sessionStorage.getItem(stateName);
  // We have to parse the string back into JSON
  return sessionState && JSON.parse(sessionState);
}