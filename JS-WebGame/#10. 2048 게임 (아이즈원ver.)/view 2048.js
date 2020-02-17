function updateView(){
	for(var i=0; i<4; ++i){
		for(var j=0; j<4; ++j){
			if(board.table[i][j] != 0){
                var target_th = document.getElementById(i.toString()+j.toString());
                target_th.style.backgroundSize = "147px";
                target_th.style.fontSize = "40px";
                target_th.style.verticalAlign = "bottom";
                target_th.style.textAlign = "right";
                if (board.table[i][j] == 2) {
                    //target_th.style.backgroundColor = 'yellow';
                    target_th.style.backgroundImage = "url('https://t1.daumcdn.net/cafeattach/1IHuH/3b6cb512b649633c4b2166286635c23a492f89e4')";
                    target_th.style.backgroundSize = "200px 200px";
                    target_th.style.backgroundPositionX = "center";
                    target_th.style.color = "white";
                }
                else if (board.table[i][j] == 4) {
                    target_th.style.backgroundImage = "url('https://archivenew.vop.co.kr/images/2ef9668eecec0682ce7871bf62cd0ea9/2018-10/30120423__HAN4860.jpg')";
                    target_th.style.color = "yellow";
                }
                else if (board.table[i][j] == 8) {
                    target_th.style.backgroundImage = "url('https://steamuserimages-a.akamaihd.net/ugc/938331559627591064/2604ED428A9465EF35A456F331E4D89260E7FD7B/')";
                    target_th.style.backgroundSize = "200px 200px";
                    target_th.style.backgroundPositionX = "center";
                    target_th.style.color = "#fa5069";
                }
                else if (board.table[i][j] == 16) {
                    target_th.style.backgroundImage = "url('http://cdn.ppomppu.co.kr/zboard/data3/2018/0803/m_1533281622_7909_produce48_20180803_163218_000_resize.gif')";
                    target_th.style.backgroundSize = "250px 200px";
                    target_th.style.backgroundPositionX = "center";
                    target_th.style.color = "#f296e9";
                }
                else if (board.table[i][j] == 32)  {
                    target_th.style.backgroundImage = "url('https://i.pinimg.com/originals/bb/e8/28/bbe82878cede55ef9bc7bf90f5e018cf.gif')";
                    target_th.style.backgroundSize = "250px 200px";
                    target_th.style.backgroundPositionX = "center";
                    target_th.style.color = "#ad87ff";
                }
                else {
                    target_th.style.backgroundImage = "url('https://i.pinimg.com/originals/55/49/84/5549840c4e575efeaa9978923a04554e.gif')";
                    target_th.style.backgroundSize = "250px 200px";
                    target_th.style.backgroundPositionX = "center";
                    target_th.style.color = "#97f56e";
                }
                
                /* if (board.table[i][j] == 2) {
                    target_th.classList.remove('empty');
                    target_th.classList.remove('pic2');
                    target_th.classList.remove('pic3');
                    target_th.classList.remove('pic4');
                    target_th.classList.add('pic1');
                    console.log(target_th);
                }
                if (board.table[i][j] == 4) {
                    target_th.classList.remove('empty');
                    target_th.classList.remove('pic1');
                    target_th.classList.remove('pic3');
                    target_th.classList.remove('pic4');
                    target_th.classList.add('pic2');
                    console.log(target_th);
                }
                if (board.table[i][j] == 8) {
                    target_th.classList.remove('empty');
                    target_th.classList.remove('pic1');
                    target_th.classList.remove('pic2');
                    target_th.classList.remove('pic4');
                    target_th.classList.add('pic3');
                    console.log(target_th);
                }
                if (board.table[i][j] == 16) {
                    target_th.classList.remove('empty');
                    target_th.classList.remove('pic1');
                    target_th.classList.remove('pic2');
                    target_th.classList.remove('pic3');
                    target_th.classList.add('pic4');
                    console.log(target_th);
                } */
                
                target_th.innerHTML = board.table[i][j]; // 화면에 그려주기 
			}
            else{ // 0이라면
                var target_th = document.getElementById(i.toString()+j.toString());
                target_th.style.backgroundImage = 'none';
                target_th.style.backgroundColor = 'pink';
                target_th.style.color = "white";
                /* target_th.classList.remove('pic1');
                target_th.classList.remove('pic2');
                target_th.classList.remove('pic3');
                target_th.classList.remove('pic4');
                target_th.classList.add('empty');
                console.log(target_th); */
				target_th.innerHTML = "_"; // 화면에 그려주기 
			}
		}
	}
}