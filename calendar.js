const curDay = document.querySelector('.day');
const curDate = document.querySelector('.date');
const curMonthYear = document.querySelector('.month-year');
const DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH = ['JANUARY', 'FABRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const calandarName = document.querySelector('#cur-month-year');

const date = new Date();
curDay.innerHTML = DAY[date.getDay()];
curDate.innerHTML = date.getDate();
curMonthYear.innerHTML = `${date.getMonth() + 1} ${date.getFullYear()}`;
calandarName.innerHTML = `${MONTH[date.getMonth()]} ${date.getFullYear()}`;
