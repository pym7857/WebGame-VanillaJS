var 가로 = 4;
var 세로 = 3; // 판 크기
var 색깔들 = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var 색깔후보 = 색깔들.slice(); // slice()를 하면 참조관계가 끊긴다.
var 색깔 = [];
// 피셔 에이츠 셔플
function 셔플() {
    for (var i = 0; 색깔후보.length > 0; i += 1)
        색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random()*색깔후보.length), 1)); // splice(idx, 빼낼개수)
}
var 클릭플래그 = true;
var 클릭카드 = []; // 클릭한 카드가 무엇인지
var 완성카드 = []; // 완성된 카드는 다시 못 뒤집도록 하기위해 
var 시작시간;

function 카드세팅(가로, 세로) {
    클릭플래그 = false;
    for (var i = 0; i < 가로*세로; i += 1) {
        var card = document.createElement('div');
        card.className = 'card'; // className(classList): 클래스 이름 변경 
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = 색깔[i];

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        // 카드 누르면 뒤집기 ( 반복문+비동기의 클로저 문제 해결 코드 )
        (function(c) {
            card.addEventListener('click', function() {
                if (클릭플래그 && !완성카드.includes(c)) // 완성카드가 아닐때 클릭했을때만 flipped 되도록..
                    c.classList.toggle('flipped'); // toggle : 해당 클래스 이름을 폈다 접었다..
                    클릭카드.push(c);
                    if (클릭카드.length === 2) {
                        if (클릭카드[0].querySelector('.card-back').style.backgroundColor === 클릭카드[1].querySelector('.card-back').style.backgroundColor) {
                            완성카드.push(클릭카드[0]);
                            완성카드.push(클릭카드[1]);
                            클릭카드 = [];
                            if (완성카드.length === 12) {
                                var 끝시간 = new Date();
                                alert('축하합니다! 성공! ' + (끝시간 - 시작시간) / 1000 + '초 걸렸습니다.');
                                /* 초기화 */
                                document.querySelector('#wrapper').innerHTML = '';
                                색깔후보 = 색깔들.slice(); // slice()를 하면 참조관계가 끊긴다.
                                색깔 = [];
                                완성카드 = [];
                                시작시간 = null;
                                셔플();
                                카드세팅(가로, 세로);
                            }
                        } else { // 두 카드의 색깔이 다르면 
                            클릭플래그 = false;
                            setTimeout(function() {
                                클릭카드[0].classList.remove('flipped');
                                클릭카드[1].classList.remove('flipped');
                                클릭플래그 = true;
                                클릭카드 = [];
                            }, 1000);
                        }
                    }
            });
        }) (card);
        document.querySelector('#wrapper').appendChild(card);
    }

    // 처음화면: 카드 외울시간 줌 
    document.querySelectorAll('.card').forEach(function (card, idx) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 1000 + 100 * idx); // 0.1초 간격으로 다 flipped되게 보여줌 
    });

    // 5초 뒤에 모두 닫아버림 
    setTimeout(function() {
        document.querySelectorAll('.card').forEach(function (card, idx) {
            card.classList.remove('flipped');
        });
        클릭플래그 = true; // 5초 끝나면 클릭플래그 = true로 바꿈 
        시작시간 = new Date();
    }, 5000);
}

셔플();
카드세팅(가로, 세로);





/* 
className과 classList의 차이점 

Using "classList", you can add or remove a class without affecting any others the element may have. But if you assign "className", it will wipe out any existing classes while adding the new one (or if you assign an empty string it will wipe out all of them).
Assigning "className" can be a convenience for cases where you are certain no other classes will be used on the element, but I would normally use the "classList" methods exclusively.
And "classList" also has handy "toggle" and "replace" methods.

(https://teamtreehouse.com/community/difference-between-classlist-and-classname)
*/