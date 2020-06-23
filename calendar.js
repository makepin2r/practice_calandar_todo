const curDay = document.querySelector('.day');
const curDate = document.querySelector('.date');
const curMonthYear = document.querySelector('.month-year');
const DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH = ['JANUARY', 'FABRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
const calendar = document.querySelector('.table > table > tbody');
const calendarName = document.querySelector('#cur-month-year');

const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

const date = new Date();
let curCalMonth = date.getMonth();
let curCalYear = date.getFullYear();
curDay.innerHTML = DAY[date.getDay()];
curDate.innerHTML = date.getDate();
curMonthYear.innerHTML = `${date.getMonth() + 1} ${date.getFullYear()}`;


// zeller's congruence
// 1기준임 --> 바꾸기
function zeller(d, m, y){ 
    if(m < 3) { m += 12; y -= 1;}

    var c = Math.floor(y / 100);
    var k = y - (100 * c);

    var s = Math.floor(2.6 * m - 5.39) + Math.floor(k / 4) + Math.floor(c / 4) + d + k - (2 * c);

    var ans = s - (7 * Math.floor(s / 7));
    return ans;
}

// 0기준임
function printCal(m, y){
    calendarName.innerHTML = `${MONTH[m]} ${y}`;
    //erase previous calendar
    calendar.innerHTML = '';
    let lastDate;
    if(m === 1) {
        if(((y % 4 === 0)  && (y % 100 !== 0)) || y % 400 === 0){ // 윤년 {
           lastDate = 29;
           console. log('1st');
        }
    } else if(m === 7 || m % 2 === 0) {
        lastDate = 31;
        console. log('2nd');
    } else { lastDate = 30; console. log('3rd');}
    console.log('last date is ' + lastDate);

    let i = 1;
    while(i <= lastDate){
        var newTr = document.createElement('tr');
        for(let j = 0; j < 7; ++j){
            console.log(j);
            if(i === 1){ // 시작일이라면?
                for(let k = 0; k < zeller(1, m + 1, y); ++k){
                    let newTd = document.createElement('td');
                    newTr.appendChild(newTd);
                }
                j += zeller(1, m+1, y);
            }
            let newTd = document.createElement('td');
            newTd.innerHTML = i;
            newTr.appendChild(newTd);
            if(i++ >= lastDate){
                calendar.appendChild(newTr);
                return;     
            }
        }
        calendar.appendChild(newTr);
    }
}

btnPrev.addEventListener('click', function(){
    if(curCalMonth === 0) {
        curCalMonth = 11;
        --curCalYear;
    } else {
        --curCalMonth;
    }
    printCal(curCalMonth, curCalYear);
});

btnNext.addEventListener('click', function(){
    if(curCalMonth === 11) {
        curCalMonth = 0;
        ++curCalYear;
    } else {
        ++curCalMonth;
    }
    printCal(curCalMonth, curCalYear);
});


function init(){
    printCal(curCalMonth, curCalYear);
}

init();

