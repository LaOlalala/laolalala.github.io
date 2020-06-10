let field = document.createElement('div');
field.classList.add('field');

document.body.append(field);

let x = 1,
	y = 10;

//создание ячеек
for(let i= 0 ; i < 100; i++){

	if(x > 10){
		x = 1;
		y--;
	}

	let cell = document.createElement('div');
	cell.classList.add('cell');

	cell.setAttribute('posX' , x);
	cell.setAttribute('posY' , y);

	field.appendChild(cell);

	x++;
}

//инициализация змейки
let snakeBody;
let direction = 'right';
let turn = false;  // переменная для возможности поворота змейки только после окончания фунции move();
let score = 0;

function createSnake(){
	let x = Math.round(Math.random()*(10-3)+3),
		y = Math.round(Math.random()*(10-1)+1);

	snakeBody = [field.querySelector("[posX = '" + x + "'][posY = '" + y + "']"), field.querySelector("[posX = '" + (x-1) + "'][posY = '" + y + "']"),field.querySelector("[posX = '" + (x-2) + "'][posY = '" + y + "']")];

	for(let i = 0; i < snakeBody.length; i++){
		snakeBody[i].classList.add('snake-body');
	}

	snakeBody[0].classList.add('snake-head');
};

createSnake();

//движение
function move(){

	snakeBody[snakeBody.length - 1].classList.remove('snake-body');
	snakeBody[0].classList.remove('snake-head');
	snakeBody.pop();

	let x = snakeBody[0].getAttribute('posX'),
		y = snakeBody[0].getAttribute('posY');

	if(direction == 'right'){
		if( x >= 10 ){
			snakeBody.unshift(field.querySelector("[posX = '1'][posY = '" + y + "']"));
		}else{
			snakeBody.unshift(field.querySelector("[posX = '" + (+x + 1) + "'][posY = '" + y + "']"));
		}
	}else if(direction == 'left'){
		if( x <= 1 ){
			snakeBody.unshift(field.querySelector("[posX = '10'][posY = '" + y + "']"));
		}else{
			snakeBody.unshift(field.querySelector("[posX = '" + (+x - 1) + "'][posY = '" + y + "']"));
		}
	}else if(direction == 'up'){
		if( y >= 10 ){
			snakeBody.unshift(field.querySelector("[posX = '" + x + "'][posY = '1']"));
		}else{
			snakeBody.unshift(field.querySelector("[posX = '" + x + "'][posY = '" + (+y + 1) + "']"));
		}
	}else if(direction == 'down'){
		if( y <= 1 ){
			snakeBody.unshift(field.querySelector("[posX = '" + x + "'][posY = '10']"));
		}else{
			snakeBody.unshift(field.querySelector("[posX = '" + x + "'][posY = '" + (+y - 1) + "']"));
		}
	}

	//ловим мышку
	if(snakeBody[0].classList.contains('mouse')){
		let el = snakeBody[0];

		snakeBody.push(el);
		mouse.classList.remove('mouse');
		createMouse();
		score++;
		scoreEl.textContent = 'Счёт: ' + score;
	}

	//окончание игры
	if(snakeBody[0].classList.contains('snake-body')){

		setTimeout(function(){
			let restart = confirm('Игра окончена! Ваш счет: ' + score + '\nНачать заново?');

			if(restart){
				score = 0;
				snakeBody = [];
				mouse = null;
				scoreEl.textContent = 'Счёт: ' + score;

				let cells = document.querySelectorAll('.cell');

				for(let i = 0; i < cells.length; i++){
					cells[i].className = 'cell';
				}

				createSnake();
				createMouse();
				interval = setInterval(move, 300);
			}

		},100);

		snakeBody[0].classList.add('fatal');
		clearInterval(interval);
	}

	for(let i = 0; i < snakeBody.length; i++){
		snakeBody[i].classList.add('snake-body');
	}

	snakeBody[0].classList.add('snake-head');

	turn = true;
};

let interval;

interval = setInterval(move, 300);

//определение направления движения
document.addEventListener('keyup', function(e){

	if(turn){

		if(e.keyCode == 37 && direction != 'right'){
			direction = 'left';
		}else if(e.keyCode == 38 && direction != 'down'){
			direction = 'up';
		}else if(e.keyCode == 39 && direction != 'left'){
			direction = 'right';
		}else if(e.keyCode == 40 && direction != 'up'){
			direction = 'down';
		}

	}

	turn = false;

});

//инициализация мышки
let mouse;

function createMouse(){

	function randomize(){
		let x = Math.round(Math.random()*(10-1)+1),
			y = Math.round(Math.random()*(10-1)+1);

		mouse = field.querySelector("[posX = '" + x + "'][posY = '" + y + "']");
	};

	randomize();

	if (mouse.classList.contains('snake-body')){
		randomize();
	}

	mouse.classList.add('mouse');
};

createMouse();

//блок с очками
let scoreEl = document.createElement('div');
field.insertAdjacentElement('afterend', scoreEl);
scoreEl.classList.add('score');
scoreEl.textContent = 'Счёт: ' + score;