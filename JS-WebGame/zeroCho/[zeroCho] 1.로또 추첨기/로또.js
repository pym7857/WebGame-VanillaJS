// 1~45의 숫자가 들어있는 배열 생성
var 후보군 = Array(45)
	.fill()
	.map(function (요소, 인덱스) {
		return 인덱스 + 1;
	});
//console.log(후보군);

// 숫자 랜덤하게 섞기 
var 셔플 = [];
while (후보군.length > 0) {
	// splice : (위치, 자를갯수)를 배열로 반환
	var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0]; 
	//console.log(이동값);
	셔플.push(이동값);
}
//console.log(셔플);
var 보너스 = 셔플[셔플.length -1];
var 당첨숫자들 = 셔플.slice(0, 6); // 0 ~ 5
console.log('당첨숫자들:', 당첨숫자들.sort(function (a, b) { return a - b; }), '보너스:', 보너스);

var 결과창 = document.getElementById('결과창');
// var 결과창 = document.querySelector('#결과창'); 으로 쓸 수도 있다.

function 공색칠하기(숫자, 결과창) {
	var 공 = document.createElement('div');
	공.textContent = 숫자;
	공.style.display = 'inline-block';
	공.style.border = '1px solid black';
	공.style.borderRadius = '50px'; // 자바스크립트에서css는 border-radius등 '-' 기호 불가능 
	공.style.width = '40px';
	공.style.height = '40px';
	공.style.textAlign = 'center';
	공.style.fontSize = '30px';
	var 배경색;
	if (숫자 <= 10)
		배경색 = 'red';
	else if (숫자 <= 20)
		배경색 = 'orange'
	else if (숫자 <= 30)
		배경색 = 'yellow'
	else if (숫자 <= 40)
		배경색 = 'blue'
	else
		배경색 = 'green'
	공.style.background = 배경색;
	결과창.appendChild(공);
}

// 아직 배우지않은 클로져 이슈 때문에 얘네를 한번에 못묶음 
setTimeout(function 비동기콜백함수() {
	공색칠하기(당첨숫자들[0], 결과창);
}, 1000);
setTimeout(function 비동기콜백함수() {
	공색칠하기(당첨숫자들[1], 결과창);
}, 2000);
setTimeout(function 비동기콜백함수() {
	공색칠하기(당첨숫자들[2], 결과창);
}, 3000);
setTimeout(function 비동기콜백함수() {
	공색칠하기(당첨숫자들[3], 결과창);
}, 4000);
setTimeout(function 비동기콜백함수() {
	공색칠하기(당첨숫자들[4], 결과창);
}, 5000);
setTimeout(function 비동기콜백함수() {
	공색칠하기(당첨숫자들[5], 결과창);
}, 6000);


setTimeout(function 비동기콜백함수() {
	var 보너스칸 = document.getElementsByClassName('보너스')[0]; // class는 여러개일 수 있음 
	// var 결과창 = document.querySelector('.보너스'); 으로 쓸 수도 있다.
	공색칠하기(보너스, 보너스칸);
}, 7000);
