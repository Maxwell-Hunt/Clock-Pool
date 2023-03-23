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

let clock1_time_initial = 900;
let clock2_time_initial = 900;
let game_started = false;
let clock1 = new Clock(document.getElementById("clock1"), clock1_time_initial);
let clock2 = new Clock(document.getElementById("clock2"), clock2_time_initial);
let start_button = document.getElementById("start");
let active_clock = 1;

let time_change_section = document.getElementsByClassName("time_change")[0];

function toggleState() {
    if(!game_started) {
        beginGame();
    } else {
        resetGame();
    }
}

function updateTimes() {
    if(game_started) return;
    let time1 = document.getElementById("first_player_time_input");
    let time2 = document.getElementById("second_player_time_input");
    clock1_time_initial = Number(time1.value);
    clock2_time_initial = Number(time2.value);
    resetGame();
}

function resetGame() {
    time_change_section.style.display = "block";
    game_started = false;
    start_button.innerHTML = "Start";
    clock1 = new Clock(document.getElementById("clock1"), clock1_time_initial);
    clock2 = new Clock(document.getElementById("clock2"), clock2_time_initial);
}

function beginGame() {
    time_change_section.style.display = "none";
    active_clock = 1;
    game_started = true;
    clock1 = new Clock(document.getElementById("clock1"), clock1_time_initial, is_active=true);
    clock2 = new Clock(document.getElementById("clock2"), clock2_time_initial);
    start_button.innerHTML = "Restart";
}

function update() {
    if(!game_started) return;
    if(active_clock === 1) {
        clock1.update();
    }
    else if(active_clock === 2) {
        clock2.update();
    }
}

function switchClock() {
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
    if(e.key === " ") {
        switchClock();
    } else if (e.key === "Enter") {
        addTime();
    }
});

setInterval(update, 1000);