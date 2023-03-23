class Clock {
    constructor(obj, time, is_active=false) {
        this.obj = obj;
        this.time = time;
        this.is_active = !is_active;
        this.updateActivity();
        this.update();
    }

    // returns a string which displays the current amount of time
    // given the # of seconds remaining
    getTimeString() {
        let minutes = Math.floor(this.time / 60);
        let remainder = this.time % 60;
        let result = minutes + ":";
        if(remainder < 10) {
            result += "0";
        }
        result += remainder;
        return result;
    }

    updateActivity() {
        this.is_active = !this.is_active;
        for(let child of this.obj.childNodes) {
            if(child.tagName === "P") {
                if(this.is_active) {
                    child.innerHTML = "IN PLAY";
                } else {
                    child.innerHTML = "";
                }
            }
        }
    }

    update() {
        this.time--;
        for(let child of this.obj.childNodes) {
            if(child.tagName == "H1") {
                child.innerHTML = this.getTimeString();
            }
        }
    }
}

let game_started = false;
let clock1 = new Clock(document.getElementById("clock1"), 900);
let clock2 = new Clock(document.getElementById("clock2"), 900);
let start_button = document.getElementById("start");
let active_clock = 1;

function toggleState() {
    if(!game_started) {
        beginGame();
    } else {
        resetGame();
    }
}

function resetGame() {
    game_started = false;
    start_button.innerHTML = "Start";
    clock1 = new Clock(document.getElementById("clock1"), 900);
    clock2 = new Clock(document.getElementById("clock2"), 900);
}

function beginGame() {
    active_clock = 1;
    game_started = true;
    clock1 = new Clock(document.getElementById("clock1"), 900, is_active=true);
    clock2 = new Clock(document.getElementById("clock2"), 900);
    start_button.innerHTML = "Restart";
}

function update() {
    if(!game_started) return;
    console.log("hello wold");
    if(active_clock === 1) {
        clock1.update();
    }
    else if(active_clock === 2) {
        clock2.update();
    }
}

function switchClock(event) {
    if(!game_started) return;
    clock1.updateActivity();
    clock2.updateActivity();
    if(active_clock === 1) {
        active_clock = 2;
        return;
    }
    active_clock = 1;
}

function addTime() {
    if(active_clock === 1) {
        clock1.time += 15;
    }
    else if(active_clock === 2) {
        clock2.time += 15;
    }
}

document.addEventListener("keyup", (e) => {
    if(e.keyCode === 32) {
        switchClock();
    } else if (e.keyCode === 13) {
        addTime();
    }
});

setInterval(update, 1000);