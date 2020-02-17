// 스코프 
var tbody = document.querySelector('#table tbody');
var dataset = [];
var 중단플래그 = false;
var 열은칸 = 0; // 연칸이 (칸x칸 - 지뢰개수) 가 되면 성공 !
document.querySelector('#exec').addEventListener('click', function() {
	/* 새 게임 시작하면 초기화 */
	중단플래그 = false;
	열은칸 = 0;
	tbody.innerHTML = ''; // tbody의 내부 태그들을 다 지워버림 
	dataset = []; // dataset 초기화 
	document.querySelector('#result').textContent = ''; // 결과창 초기화 

	// 가로칸, 세로칸, 지뢰개수 가져옴 
	var hor = parseInt(document.querySelector('#hor').value);
	var ver = parseInt(document.querySelector('#ver').value);
	var mine = parseInt(document.querySelector('#mine').value);

	// 지뢰 위치 랜덤으로 뽑기 
	// 피셔예이츠 셔플
	var 후보군 = Array(hor * ver) // 현재 Array: 0 ~ 99 (좌표 위치와 안헷갈리기 위해서)
		.fill()
		.map(function (요소, 인덱스) {
			return 인덱스;
		});
	var 셔플 = [];
	while(후보군.length > hor * ver - mine) {
		var 이동값 = 후보군.splice(Math.floor(Math.random()*후보군.length), 1)[0]; // splice결과는 배열로 리턴
		셔플.push(이동값);
	}
	//console.log(셔플);

	// 지뢰 테이블 만들기 
	for (var i = 0; i < ver; i += 1) { // 세로 (tr은 세로)
		var arr = [];
		var tr = document.createElement('tr');
		dataset.push(arr);
		for (var j = 0; j < hor; j += 1) { // 가로 (td는 가로)
			arr.push(0); // 기본 dataset은 0으로 설정 
			var td = document.createElement('td');

			td.addEventListener('contextmenu', function(e) { // 마우스 우클릭 
				if (중단플래그) { // 중단플래그 == true이면 더이상 클릭이 되지 않음.
					return;
				}
				e.preventDefault(); // html 에서 a 태그나 submit 태그는 고유의 동작이 있다. 페이지를 이동시킨다거나 form 안에 있는 input 등을 전송한다던가 그러한 동작이 있는데 e.preventDefault 는 그 동작을 중단시킨다.
				var 부모tr = e.currentTarget.parentNode;
				var 부모tbody = e.currentTarget.parentNode.parentNode;
				var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget); // 클로저. 강제로 위치 알 수있게 해주는 코드. (부모tr.children에서 e.currentTarget이 몇번째에 있는지)
				var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr); // 강제로 위치 알 수있게 해주는 코드. tr이 몇번째 있는지 (부모tr.children에서 부모tr이 몇번째에 있는지) 
				if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
					e.currentTarget.textContent = '!';
					e.target.style.backgroundColor = "#f0584d";
				} 
				else if (e.currentTarget.textContent === '!') {
					e.currentTarget.textContent = '?';
					e.target.style.backgroundColor = "yellow";
				} 
				else if (e.currentTarget.textContent === '?') {
					if (dataset[줄][칸] === 0) { // 지뢰가 아닌곳이었다면 
						e.currentTarget.textContent = '';
						e.target.style.backgroundColor = "#444";
					}
					else if (dataset[줄][칸] === 'X') { // 지뢰인 곳이었다면 
					e.currentTarget.textContent = 'X';
					e.target.style.backgroundColor = "#444";
					}
				} 
			});

			td.addEventListener('click', function(e) { // 마우스 좌클릭 
				if (중단플래그) { // 중단플래그 == true이면 더이상 클릭이 되지 않음.
					return;
				}
				var 부모tr = e.currentTarget.parentNode;
				var 부모tbody = e.currentTarget.parentNode.parentNode;
				var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
				var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
				if (dataset[줄][칸] === 1){ // 1이면 더이상 그 td는 클릭 불가 
					return;
				}

				// 클릭했을때 주변 지뢰 개수 표시
				e.currentTarget.classList.add('opened') // 태그.classList로 태그의 클래스에 접근. add나 remove로 추가/삭제

				if (dataset[줄][칸] === 'X') { // 현재 클릭한 곳이 지뢰라면 
					e.currentTarget.textContent = '펑';
					document.querySelector('#result').textContent = '실패 ㅠㅠ';
					중단플래그 = true;
				} else {
					열은칸 += 1;
					dataset[줄][칸] = 1; // 지뢰가 아닐경우에, 열면(누르면) 0->1 로 바꿈

					/* 주변 지뢰개수를 기록 */
					var 주변 = [ // 클릭한곳 주변의 8칸 
						dataset[줄][칸-1],           dataset[줄][칸+1],
					];
					if (dataset[줄-1]) {
						주변.push(dataset[줄-1][칸-1]);
						주변.push(dataset[줄-1][칸]);
						주변.push(dataset[줄-1][칸+1]);
					}
					if (dataset[줄+1]) {
						주변.push(dataset[줄+1][칸-1]);
						주변.push(dataset[줄+1][칸]);
						주변.push(dataset[줄+1][칸+1]);
					}
					//console.log(주변);

					/* 주변지뢰개수가 '0개'면 쫙 퍼지도록 화면에 그려주는 부분 */
					var 주변지뢰개수 = 주변.filter( function(v) {
						return v === 'X';
					}).length;
					// 거짓인 값: false, '', 0, null, undefined, NaN
					e.currentTarget.textContent = 주변지뢰개수 || ''; // 주변지뢰개수가 거짓이면(=0이면) 공백을 출력해라.
					if (주변지뢰개수 === 0) {
						var 주변칸 = [
							tbody.children[줄].children[칸-1],
							tbody.children[줄].children[칸+1],
						];
						if (tbody.children[줄-1]) {
							주변칸.push(tbody.children[줄-1].children[칸-1]);
							주변칸.push(tbody.children[줄-1].children[칸]);
							주변칸.push(tbody.children[줄-1].children[칸+1]);
						}
						if (tbody.children[줄+1]) {
							주변칸.push(tbody.children[줄+1].children[칸-1]);
							주변칸.push(tbody.children[줄+1].children[칸]);
							주변칸.push(tbody.children[줄+1].children[칸+1]);
						}
						주변칸.filter(function(v) {
							return !!v; // null이나 undefined제거
						}).forEach(function(옆칸) {
							var 부모tr = 옆칸.parentNode;
							var 부모tbody = 옆칸.parentNode.parentNode;
							var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
							var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
							if (dataset[옆칸줄][옆칸칸] !== 1) // 이미 열려있는것은 해당 안되도록 (재귀함수 성능 개선)
								옆칸.click(); // (자동)재귀함수 
						})
					}
				}
				if (열은칸 === hor * ver - mine) {
					중단플래그 = true;
					document.querySelector('#result').textContent = '승리!!';
				}
			});
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	
	// 지뢰 심기 
	for (var k = 0; k < 셔플.length; k++) { // ex..21 -> (지뢰판)3행 2열(row=2, col=1)
		var 세로 = Math.floor(셔플[k] / ver); // 2
		var 가로 = 셔플[k] % ver ; // 1
		//console.log(세로, 가로);
		tbody.children[세로].children[가로].textContent = 'X';
		dataset[세로][가로] = 'X';
	}
	//console.log(dataset);
});

// 항상 화면에 그려지는 부분과 실제 dataset에 기록되는 부분 일치여부 생각하면서 코딩 ! 