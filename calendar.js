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

let selectedDateKey = '';
//let selectedDateTd = undefined;


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
    // selectedDateTr 키값을 저장해서 유지되게 해줘야 함.

    calendarName.innerHTML = `${MONTH[m]} ${y}`;
    //erase previous calendar
    calendar.innerHTML = '';
    let lastDate;
    if(m === 1) {
        if(((y % 4 === 0)  && (y % 100 !== 0)) || y % 400 === 0){ // 윤년 {
           lastDate = 29;
        } else {
            lastDate = 28;
        }
    } else if(m === 7 || m % 2 === 0) {
        lastDate = 31;
    } else { lastDate = 30;}

    let i = 1;
    while(i <= lastDate){
        var newTr = document.createElement('tr');
        for(let j = 0; j < 7; ++j){
            if(i === 1){ // 시작일이라면?
                for(let k = 0; k < zeller(1, m + 1, y); ++k){
                    let newTd = document.createElement('td');
                    newTr.appendChild(newTd);
                }
                j += zeller(1, m+1, y);
            }
            let newTd = document.createElement('td');
            newTd.innerHTML = i;
            if( `${i < 10 ? `0` + i : i}${(m + 1) < 10 ? `0` + (m + 1) : m + 1}${y}` === selectedDateKey){
                newTd.classList.add('clicked');
            }
            newTr.appendChild(newTd);
            if(i++ >= lastDate){
                calendar.appendChild(newTr);
                return;     
            }
        }
        calendar.appendChild(newTr);
    }
}

function updateSelectedDateKey(d, m, y){
    selectedDateKey = `${d < 10 ? `0` + d : d}${(m + 1) < 10 ? `0` + (m + 1) : m + 1}${y}`;
}

function selectDate(e){
    if (e.target.nodeName === "TD" && e.target.innerHTML !== '')
    {
        updateSelectedDateKey(e.target.innerHTML, curCalMonth, curCalYear);
        printCal(curCalMonth, curCalYear);
        console.log(selectedDateKey);
        printList();
    }
}

document.querySelector('.table tbody').addEventListener('click', selectDate);

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
    updateSelectedDateKey(date.getDate(), curCalMonth, curCalYear);
    printCal(curCalMonth, curCalYear);
}

init();

