const curDay = document.querySelector('.day');
const curDate = document.querySelector('.date');
const curMonthYear = document.querySelector('.month-year');
const DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const date = new Date();
curDay.innerHTML = DAY[date.getDay()];
curDate.innerHTML = date.getDate();
curMonthYear.innerHTML = `${date.getMonth() + 1} ${date.getFullYear()}`;

