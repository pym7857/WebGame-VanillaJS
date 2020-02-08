// 스코프 
var tbody = document.querySelector('#table tbody');
var dataset = [];
document.querySelector('#exec').addEventListener('click', function() {
	tbody.innerHTML = ''; // 매번 실행시마다, tbody의 내부 태그들을 다 지워버림 
	var hor = parseInt(document.querySelector('#hor').value);
	var ver = parseInt(document.querySelector('#ver').value);
	var mine = parseInt(document.querySelector('#mine').value);

	// 지뢰 위치 뽑기 
	// 피셔예이츠 셔플
	var 후보군 = Array(hor * ver) // 현재 Array: 0 ~ 99 (좌표 위치와 안헷갈리기 위해서)
		.fill()
		.map(function (요소, 인덱스) {
			return 인덱스;
		});
	var 셔플 = [];
	while(후보군.length > 80) {
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
			arr.push(1);
			var td = document.createElement('td');
			td.addEventListener('contextmenu', function(e) { // 마우스 우클릭 
				e.preventDefault();
				var 부모tr = e.currentTarget.parentNode;
				var 부모tbody = e.currentTarget.parentNode.parentNode;
				var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget); // 클로저. 강제로 위치 알 수있게 해주는 코드. td가 몇번째 있는지 
				var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr); // 강제로 위치 알 수있게 해주는 코드. tr이 몇번째 있는지 
				if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
					e.currentTarget.textContent = '!';
				} 
				else if (e.currentTarget.textContent === '!') {
					e.currentTarget.textContent = '?';
				} 
				else if (e.currentTarget.textContent === '?') {
					if (dataset[줄][칸] === 1) { // 지뢰가 아닌곳이었다면 
						e.currentTarget.textContent = '';
					}
					else if (dataset[줄][칸] === 'X') { // 지뢰인 곳이었다면 
					e.currentTarget.textContent = 'X';
					}
				} 
			});
			td.addEventListener('click', function(e) { // 마우스 좌클릭 
				// 클릭했을때 주변 지뢰 개수 
				var 부모tr = e.currentTarget.parentNode;
				var 부모tbody = e.currentTarget.parentNode.parentNode;
				var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
				var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
				if (dataset[줄][칸] === 'X') { // 현재 클릭한 곳이 지뢰라면 
					e.currentTarget.textContent = '펑';
				} else {
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
					console.log(주변);
					e.currentTarget.textContent = 주변.filter( function(v) {
						return v === 'X';
					}).length;
				}
			});
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	
	// 지뢰 심기 
	for (var k = 0; k < 셔플.length; k++) { // ex..21 -> (지뢰판)3행 2열(row=2, col=1)
		var 세로 = Math.floor(셔플[k] / 10); // 2
		var 가로 = 셔플[k] % 10 ; // 1
		//console.log(세로, 가로);
		tbody.children[세로].children[가로].textContent = 'X';
		dataset[세로][가로] = 'X';
	}
	//console.log(dataset);
});