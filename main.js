const csore = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

const settings = {
    start: false,
    speed: 3,
    score: 0,
    traffic: 4
};

function getQuantityElements(heigthElement) {
    return document.documentElement.clientHeight / heigthElement + 1;
}

function startGame(){
    start.classList.add('hide');

    for (let i=0; i < getQuantityElements(120); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 120) + 'px';
    line.y = i * 120;
    gameArea.appendChild(line);
    }

    for (let i=0; i < getQuantityElements(100 * settings.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(./image/enemy2.png) center / cover no-repeat';
        gameArea.appendChild(enemy);
    }

    settings.start = true;    
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame(){
    if (settings.start) {
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && settings.x > 0) {
            settings.x -= settings.speed;
        }
        if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speed;
        }
        if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
            settings.y += settings.speed + 1;
        }
        if (keys.ArrowUp && settings.y > 0) {
            settings.y -= settings.speed;
        }
        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';
        requestAnimationFrame(playGame);
    }
}

function startRun(){
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(){
    console.log('stop');
    keys[event.key] = false;
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
        line.y += settings.speed;
        line.style.top = line.y + 'px';
        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(item) {
        item.y += settings.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * settings.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50)) + 'px';
        }
    });
    
}
