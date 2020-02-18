var tetris = document.querySelector('#tetris');
var blockArr = [
  ['red', true, [
    [1, 1],
    [1, 1],
  ]],
  ['blue', true, [ 
    [0, 2, 0],
    [2, 2, 2],
  ]],
  ['orange', true, [
    [3, 3, 0],
    [0, 3, 3],
  ]],
  ['skyblue', true, [
    [0, 4, 4],
    [4, 4, 0],
  ]],
  ['yellowgreen', true, [
    [5, 5, 5],
    [5, 0, 0],
  ]],
  ['pink', true, [
    [6, 6, 6],
    [0, 0, 6],
  ]],
  ['yellow', true, [
    [7, 7, 7, 7],
  ]],
];
var blockDict = { // 색깔, 움직일 수 있는지, 모양 
  0 : ['white', false, []], // 빈칸 
  1: ['red', true, [
    [1, 1],
    [1, 1],
  ]],
  2: ['blue', true, [ 
    [0, 1, 0],
    [1, 1, 1],
  ]],
  3: ['orange', true, [
    [1, 1, 0],
    [0, 1, 1],
  ]],
  4: ['skyblue', true, [
    [0, 1, 1],
    [1, 1, 0],
  ]],
  5: ['yellowgreen', true, [
    [1, 1, 1],
    [1, 0, 0],
  ]],
  6: ['pink', true, [
    [1, 1, 1],
    [0, 0, 1],
  ]],
  7: ['yellow', true, [
    [1, 1, 1, 1],
  ]],
  10: ['red', false, [
    [1, 1],
    [1, 1],
  ]],
  20: ['blue', false, [
    [0, 1, 0],
    [1, 1, 1],
  ]],
  30: ['orange', false, [
    [1, 1, 0],
    [0, 1, 1],
  ]],
  40: ['skyblue', false, [
    [0, 1, 1],
    [1, 1, 0],
  ]],
  50: ['yellowgreen', false, [
    [1, 1, 1],
    [1, 0, 0],
  ]],
  60: ['pink', false, [
    [1, 1, 1],
    [0, 0, 1],
  ]],
  70: ['yellow', false, [
    [1, 1, 1, 1],
  ]],
}
var tetrisData = [];
var stopDown = false;

function 칸만들기() {
  var fragment = document.createDocumentFragment(); // fragment= 메모리에서 조작해서, 화면에 붙임. (빠름)
  for (var i = 0; i < 20; i ++) {
    var tr = document.createElement('tr');
    var arr = [];
    tetrisData.push(arr); // arr과 참조 관계
    fragment.appendChild(tr);
    for (var j = 0; j < 10; j ++) {
      var td = document.createElement('td');
      tr.appendChild(td);
      arr.push(0);
    }
  }
  tetris.appendChild(fragment);
}

function 화면그리기() {
  tetrisData.forEach(function (tr, i) {
    tr.forEach(function (td, j) {
      // td 클래스 이름을 '색깔' 로 지정 
      tetris.children[i].children[j].className = blockDict[td][0]; // 0: 색깔 
      //console.log(tetris);
    });
  })
}

function 블록생성기(){
  stopDown = false;
  var 블록 = blockArr[Math.floor(Math.random() * 7)][2]; // 2: 블록의 모양 
  console.log(블록); // [ [0,3,0], [3,3,3] ]
  블록.forEach(function(tr, i) { // 줄, 인덱스
    tr.forEach(function(td, j) { // 칸, 인덱스 
      // TODO: 블록 생성할 때 이미 차있으면 게임오버 
      tetrisData[i][j+3] = td; // 숫자(3)를 넣음 (상단 좌측3번째부터 넣음)
    });
  });
  화면그리기(); // 데이터와 화면을 항상 일치 시켜야됨 
}

function 블록내리기() { // 아래에서 부터 체크하는게 더 효율적 
  for (var i = tetrisData.length-1; i>=0; i--) {
    tetrisData[i].forEach(function(td, j) {
      if (td > 0 && td < 10) { // 움직일 수 있는 블록 
        if (tetrisData[i+1] && !stopDown) { // 아래칸이 존재하는 경우
          tetrisData[i+1][j] = td;
          tetrisData[i][j] = 0;
        } else { // 땅 끝에 도달한 경우 
          stopDown = true
          tetrisData[i][j] = td*10;
        }
      }
    });
  }
  if (stopDown) {
    블록생성기();
  }
  화면그리기(); // 데이터와 화면을 항상 일치 시켜야됨 
}



window.addEventListener('keydown', function(e) {
  console.log(e); // 이 중 e.code 사용할 것
  switch(e.code) {
    case 'ArrowRight': // 오른쪽 이동 
      break;
    case 'ArrowLeft': // 왼쪽 이동 
      break;
    case 'ArrowDown': // 아래쪽 이동 
      break;
    default:
      break;
  }
});

window.addEventListener('keyup', function(e) {
  console.log(e); // 이 중 e.code 사용할 것
  switch(e.code) {
    case 'Space': // 한방에 내리기 
      break;
    case 'ArrowUp': // 방향 전환 
      break;
    default:
      break;
  }
});

칸만들기();
블록생성기();
setInterval(블록내리기, 100);