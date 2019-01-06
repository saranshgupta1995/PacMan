class PacEnemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pacEnemyEyeData = {
            position: 8,
            direction: true,
            eyeBallPosition: -2,
            tick: 1
        };

        this.pacEnemyDirections = {};
        this.pacEnemySpeed = {};

        this.changeDirections();

        this.phase = {
            phase: false,
            element: 0
        };

    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }

    animateEyes() {
        var data = this.pacEnemyEyeData;
        data.tick++;
        if (!(data.tick % 25)) {
            data.direction = !data.direction;
            data.tick=1
        }
        if (!(data.tick % 5)) {
            data.position += data.direction ? 1 : -1
            data.eyeBallPosition += data.direction ? 1 : -1
        }
        data.position += 0
    }

    setPacEnemyDirections(direction) {

        this.pacEnemyDirections.x = 0;
        this.pacEnemyDirections.y = 0;
        this.pacEnemySpeed.x = 0;
        this.pacEnemySpeed.y = 0;

        switch (direction) {
            case ('left'): {
                this.pacEnemyDirections.x = -1
                this.pacEnemySpeed.x = -1
                break;
            }
            case ('right'): {
                this.pacEnemyDirections.x = 1
                this.pacEnemySpeed.x = 1
                break;
            }
            case ('up'): {
                this.pacEnemyDirections.y = 1
                this.pacEnemySpeed.y = -1
                break;
            }
            case ('down'): {
                this.pacEnemyDirections.y = -1
                this.pacEnemySpeed.y = 1
                break;
            }
        }

    }


    changeDirections() {
        var directions = ['left', 'right', 'up', 'down']
        var direction = directions[Math.floor(Math.random() * directions.length)];
        this.setPacEnemyDirections(direction)
    }

    getCollisionWith(element) {
        if (checkCollisions(...element, { ...this.getPosition(), x: this.getPosition().x + 4 })
            || checkCollisions(...element, { ...this.getPosition(), x: this.getPosition().x - 4 })
            || checkCollisions(...element, { ...this.getPosition(), y: this.getPosition().y + 4 })
            || checkCollisions(...element, { ...this.getPosition(), y: this.getPosition().y - 4 })
        ) {
            if (this.phase.phase) {
                return
            }
            let rarity = Math.random();
            if (rarity < 0.95) {
                this.goBack();
                this.changeDirections();
            } else {
                this.phase.phase = true;
                this.phase.element = element;
            }
        } else {
            if (element == this.phase.element)
                this.phase.phase = false;
        }

    }

    goForward(units = 1) {
        this.x += this.pacEnemySpeed.x * units;
        this.y += this.pacEnemySpeed.y * units
        this.animateEyes()
    }

    goBack() {
        this.x -= this.pacEnemySpeed.x;
        this.y -= this.pacEnemySpeed.y
    }

    drawPacEnemy(ctx) {
        ctx.beginPath();
        let p2 = new Path2D(`M ${this.x - PACMAN_RADIUS},${this.y + PACMAN_RADIUS} 
        c 0,0 0,-2 0,-7 0,-1 1,-15 5,-18 3,-2 5,-3 10,-3 3,0 4,0 7,1 6,3 7,6 7,19 0,7 0,8 0,8 -1,1 -2,1 -5,-1 -1,-1 -2,-1 -5,-1 -0,0 -1,1 -2,2 -1,1 -2,2 -3,2 -0,0 -1,0 -3,-2 -3,-2 -3,-2 -4,-1 0,1 -4,4 -4,4 -0,0 0,0 -1,-1 z 
        z`);
        ctx.fill(p2);
        ctx.fillStyle = "white";
        ctx.arc(this.x - PACMAN_RADIUS + this.pacEnemyEyeData.position, this.y + PACMAN_RADIUS - 16, 4.5, 0, 2 * Math.PI);
        ctx.arc(this.x - PACMAN_RADIUS + 10 + this.pacEnemyEyeData.position, this.y + PACMAN_RADIUS - 16, 4.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x - PACMAN_RADIUS + this.pacEnemyEyeData.position + this.pacEnemyEyeData.eyeBallPosition, this.y + PACMAN_RADIUS - 16, 1.5, 0, 2 * Math.PI);
        ctx.arc(this.x - PACMAN_RADIUS + 10 + this.pacEnemyEyeData.position + this.pacEnemyEyeData.eyeBallPosition, this.y + PACMAN_RADIUS - 16, 1.5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

pacEnemies = [];

for (let pacEnemy = 0; pacEnemy < PAC_ENEMY_NUM; pacEnemy++) {
    let xShift = Math.random() * 120;
    pacEnemies.push(new PacEnemy(400 - 60 + xShift, 400 + (Math.random() < 0.5 ? 20 : -20)));
}