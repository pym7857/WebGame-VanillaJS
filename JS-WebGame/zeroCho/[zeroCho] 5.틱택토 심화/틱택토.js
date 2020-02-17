var 바디 = document.body;
var 테이블 = document.createElement('table');
var 줄들 = [];
var 칸들 = [];
var 턴 = 'X';
var 결과 = document.createElement('div');
var 승리여부; // 승리면 true

function 결과체크(몇줄, 몇칸) {

    // 세칸 다 채워졌나 확인 
    var 승리여부 = false;
    // 가로줄 검사
    if (
        칸들[몇줄][0].textContent === 턴 &&
        칸들[몇줄][1].textContent === 턴 &&
        칸들[몇줄][2].textContent === 턴
    ) { 승리여부 = true; }
    // 세로줄 검사
    if (
        칸들[0][몇칸].textContent === 턴 &&
        칸들[1][몇칸].textContent === 턴 &&
        칸들[2][몇칸].textContent === 턴
    ) { 승리여부 = true; }
    // 대각선 검사 
    if (몇줄 - 몇칸 === 0) {
        if (
            칸들[0][0].textContent === 턴 &&
            칸들[1][1].textContent === 턴 &&
            칸들[2][2].textContent === 턴
        ) { 승리여부 = true; }
    }
    if (Math.abs(몇줄 - 몇칸) == 2) {
        if (
            칸들[0][2].textContent === 턴 &&
            칸들[1][1].textContent === 턴 &&
            칸들[2][0].textContent === 턴
        ) { 승리여부 = true; }
    }
    return 승리여부; 
}

function 초기화(무승부여부) { // 매개변수가 true면 무승부
    if (무승부여부) 
        결과.textContent = '무승부';
    else
        결과.textContent = 턴 + '님이 승리!';

    // 초기화
    턴 = 'X';
    칸들.forEach( function(줄) {
        줄.forEach( function(칸) {
            칸.textContent = '';
        });
    });
}

var 비동기콜백 = function(이벤트) { // 칸을 클릭했을때
    if (턴==='O') // 컴퓨터의 턴일때 내가 클릭하지 않도록 
        return;

    var 몇줄 = 줄들.indexOf(이벤트.target.parentNode); // indexOf는 배열에만 사용가능. 유사배열에는 사용불가능
    var 몇칸 = 칸들[몇줄].indexOf(이벤트.target);

    if (칸들[몇줄][몇칸].textContent !== '') {
        console.log('빈 칸이 아닙니다!');
    } else {
        console.log('빈 칸입니다.');
        칸들[몇줄][몇칸].textContent = 턴;
        
        var 후보칸 = [];
        칸들.forEach(function(줄) {
            줄.forEach(function(칸) {
                후보칸.push(칸);
            });
        });
        후보칸 = 후보칸.filter(function(칸) { return !칸.textContent }); // '', 0, NaN, undefined, null, false
        
        var 승리여부 = 결과체크(몇줄, 몇칸);
        if (승리여부) {
            초기화(false);
        } else if (후보칸.length === 0) { // 칸을 더이상 선택할 수 없는데 이기진 않은경우 (=무승부여부)
            초기화(true);
        } else { // 다 안찼으면 턴 넘기기 
            if(턴 === 'X')
                턴 = 'O';

            /* ===========컴퓨터의 턴=========== */
            setTimeout(function() {
                console.log('컴퓨터의 턴입니다.');
                // 빈칸 중 하나를 고른다.
                
                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)]; // 빈칸 중 랜덤선택
                선택칸.textContent = 턴;

                // 컴퓨터가 승리했는지 체크
                var 몇줄 = 줄들.indexOf(선택칸.parentNode);
                var 몇칸 = 칸들[몇줄].indexOf(선택칸);
                var 승리여부 = 결과체크(몇줄, 몇칸);
                // 다 찼으면 
                if (승리여부) {
                    결과.textContent = 턴 + '님이 승리!';
                    초기화();
                }
                // 턴을 user에게 넘긴다.
                턴 = 'X';
            }, 1000);
        }
    }
};

for (var i = 1; i <= 3; i += 1) {
    var 줄 = document.createElement('tr');
    줄들.push(줄); // tr이 담김
    칸들.push([]); // td가 담김 
    for (var j = 1; j <= 3; j += 1) {
        var 칸 = document.createElement('td');
        칸.addEventListener('click', 비동기콜백);
        칸들[i-1].push(칸); // 한줄에 칸이 3개씩 담김 
        줄.appendChild(칸);
    }
    테이블.appendChild(줄);
}
바디.appendChild(테이블);
바디.appendChild(결과);