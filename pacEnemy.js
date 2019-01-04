class PacEnemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pacEnemyFaceDirection = {
            position: 10,
            lookingRight: true
        };

        this.pacEnemyDirections = {
            x: 1,
            y: 0
        }

        this.pacEnemySpeed = {
            x: 1,
            y: 0
        }

    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        }
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
        if (checkCollisions(...element, this.getPosition())) {
            this.goBack();
            this.changeDirections();
        }

    }

    saveCtx(ctx) {
        this.ctx = ctx;
    }

    goForward() {
        this.x += this.pacEnemySpeed.x;
        this.y += this.pacEnemySpeed.y
    }

    goBack() {
        this.x -= this.pacEnemySpeed.x;
        this.y -= this.pacEnemySpeed.y
    }

    drawPacEnemy() {
        this.ctx.beginPath();
        let p2 = new Path2D(`M ${this.x - PACMAN_RADIUS},${this.y + PACMAN_RADIUS} 
        c 0,0 0,-2 0,-7 0,-1 1,-15 5,-18 3,-2 5,-3 10,-3 3,0 4,0 7,1 6,3 7,6 7,19 0,7 0,8 0,8 -1,1 -2,1 -5,-1 -1,-1 -2,-1 -5,-1 -0,0 -1,1 -2,2 -1,1 -2,2 -3,2 -0,0 -1,0 -3,-2 -3,-2 -3,-2 -4,-1 0,1 -4,4 -4,4 -0,0 0,0 -1,-1 z 
        z`);
        this.ctx.fill(p2);
        this.ctx.fillStyle = "white";
        this.ctx.arc(this.x - PACMAN_RADIUS + 10, this.y + PACMAN_RADIUS - 16, 4.5, 0, 2 * Math.PI);
        this.ctx.arc(this.x - PACMAN_RADIUS + 20, this.y + PACMAN_RADIUS - 16, 4.5, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.arc(this.x - PACMAN_RADIUS + 10 + 2, this.y + PACMAN_RADIUS - 16, 1.5, 0, 2 * Math.PI);
        this.ctx.arc(this.x - PACMAN_RADIUS + 20 + 2, this.y + PACMAN_RADIUS - 16, 1.5, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

