var 중단플래그;
var 시작가능 = false;
var 결과 = document.querySelector('#res');

window.addEventListener('keydown', function(event) {
    if (중단플래그 || 시작가능===false) {
        alert('게임시작 버튼을 눌러주세요!');
        return;
    }
    switch (event.keyCode) {
      case 37: // Left
        board.keyLeft();
        break;
  
      case 38: // Up
        board.keyUp();
        break;
  
      case 39: // Right
        board.keyRight();
        break;
  
      case 40: // Down
        board.keyDown();
        break;
    }
    if(board.moved){
      board.populateRandomCell();
    }
    updateView();
    board.moved = false;

    isOver();
}, false);
  
function newGame() {
    시작가능 = true;
    board = new Table(); // 테이블 초기화
    while(board.isEmpty()){ //temporary fix to asynch
    board.initialPopulate();
    updateView();
    }
}

function isOver() {
    var 테이블 = document.querySelector('#mytable');
    문자열 = []
    for (var i=0;i<4;i+=1) {
        for (var j=0;j<4;j+=1) {
            문자열.push(테이블.rows[i].cells[j].innerHTML);
        }
    }
    문자열 = 문자열.filter(function(n) { 
        return n == "_";
    });
    if (문자열.length === 0){
        중단플래그 = true;
        시작가능 = false;
        초기화();
    }   
}

function 초기화() {
    결과.textContent = "게임이 종료되었습니다!";
}