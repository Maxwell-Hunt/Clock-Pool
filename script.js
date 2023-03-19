class Clock {
    constructor(obj, time, is_active=false) {
        this.obj = obj;
        this.time = time;
        this.is_active = is_active;
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

    update_activity() {
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

let clock1 = new Clock(document.getElementById("clock1"), 845, is_active = true);
let clock2 = new Clock(document.getElementById("clock2"), 900)

let active_clock = 1;

function update() {
    if(active_clock == 1) {
        
        clock1.update();
    }
    else if(active_clock == 2) {
        clock2.update();
    }
    if(clock1.time == 0) {

    }
}

function switchClock(event) {
    clock1.update_activity();
    clock2.update_activity();
    if(active_clock == 1) {
        active_clock = 2;
        return;
    }
    active_clock = 1;
}

function addTime() {
    if(active_clock == 1) {
        clock1.time += 15;
    }
    else if(active_clock == 2) {
        clock2.time += 15;
    }
}

document.addEventListener("keyup", (e) => {
    if(e.keyCode == 32) {
        switchClock();
    } else if (e.keyCode == 13) {
        addTime();
    }
});

setInterval(update, 1000);