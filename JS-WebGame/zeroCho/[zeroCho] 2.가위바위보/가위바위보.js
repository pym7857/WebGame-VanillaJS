var 이미지좌표 = '0';
var 가위바위보 = { // 딕셔너리 자료구조 
	바위: '0',
	가위: '-142px',
	보: '-284px',
};

console.log(Object.entries(가위바위보)); // Object.entries : 객체 -> 배열로..

function 컴퓨터의선택(이미지좌표) {
	return Object.entries(가위바위보).find( function(v) { // find는 반복문이지만, return이 True가 되면(=원하는것을 찾으면) 멈춤.
		//console.log(v);
		return v[1] == 이미지좌표; // v = ['바위', '0'] ... 
	})[0];
}


// 0.1 초에 한번씩 그림 바꿈(=이미지 좌표 바꿈) 
var 인터벌 = setInterval(인터벌메이커, 100);

function 인터벌메이커() {
	if (이미지좌표 == 가위바위보.바위)
		이미지좌표 = 가위바위보.가위;
	else if (이미지좌표 == 가위바위보.가위)
		이미지좌표 = 가위바위보.보;
	else
		이미지좌표 = 가위바위보.바위;
	document.querySelector('#computer').style.background = 
		'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + 
		이미지좌표 + ' 0';
}

function myStop() {
	clearInterval(인터벌); // 버튼 클릭시마다, setInterval을 stop시킴
}

var 점수표 = {
	가위: 1,
	바위: 0,
	보: -1,
};

// 버튼 클릭 
document.querySelectorAll('.btn').forEach(function(btn) {
	btn.addEventListener('click', function() {
		myStop(); // 화면을 stop
		setTimeout(function() {
			인터벌 = setInterval(인터벌메이커, 100);
		}, 1000); // 1초후 다시시작
		var 나의선택 = this.textContent;
		var 나의점수 = 점수표[나의선택];
		var 컴퓨터점수 = 점수표[컴퓨터의선택(이미지좌표)];
		if (나의점수 -  컴퓨터점수 == 0)
			console.log('비겼습니다');
		else if (나의점수 - 컴퓨터점수 == -1 || 나의점수 - 컴퓨터점수 == 2)
			console.log('이겼습니다!!');
		else
			console.log('졌습니다 ㅠㅠ');
	});
});

/* 가위 : 1, 바위 : 0, 보 : -1 (중복코드 피하기위해 규칙 생성)
			컴퓨터 			가위  	바위		보
		나   		가위 	1 1		1 0		1 -1
					바위		0 1		0 0		0 -1
					보		-1 1	-1 0	-1 -1
*/