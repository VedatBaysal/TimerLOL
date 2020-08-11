const content = document.querySelector(".container");
const timers = [];
const flashTime = {
    standard: 300,
    rune: 285,
    boots: 270,
    runeAndBoots: 255,
};

const roleTranslate = (role) => {
    switch (role) {
        case "TOP":
            return "Ust";
        case "JUNGLE":
            return "Orman";
        case "MID":
            return "Orta";
        case "ADC":
            return "Nisanci";
        case "SUP":
            return "Destek";
    }
}

const getFlashTime = (index) => {
    switch (index) {
        case -1:
            return flashTime.standard;
        case 0:
            return flashTime.rune;
        case 1:
            return flashTime.boots;
        case 2:
            return flashTime.runeAndBoots;
    }
}

const getRole = (index) => {
    switch (index) {
        case 0:
            return "TOP"
        case 1:
            return "JUNGLE"
        case 2:
            return "MID"
        case 3:
            return "ADC"
        case 4:
            return "SUP"
    }
}

class Timer {
    secondToMin(duration) {
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;
        var ret = "0";

        if (hrs > 0) {
            ret += "" + hrs + "." + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + "." + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    getAllActiveTimer() {
        return document.querySelectorAll(".timer");
    }
    orderTimers() {
        return getAllActiveTimer().short((x, y) => x.dataset.timer < y.dataset.timer);
    }
    removeTimer(role) {
        let t = timers.filter(x => x.role === role);
        t.forEach(x => {
            let index = timers.indexOf(x);
            timers.splice(index,1);
            console.log(timers);
            clearInterval(x.timer);
        });
    }
    setTimer(node,role) {
        let parentNode;
        let timer = setInterval(() => {
            console.log("çalışıyorum...");
            parentNode = node.parentNode;
            role = parentNode.dataset.role;
            node.dataset.time = node.dataset.time - 1;
            if (node.dataset.time > 0) {
                node.textContent = this.secondToMin(node.dataset.time);
                if (node.dataset.time == 60) {
                    readOutLound(role + " siçrasina son bir dakika");
                } else if (node.dataset.time < 60) {
                    this.changeStatus(role);
                }
            } else {
                parentNode.remove();
                readOutLound(role + " siçrasi geldi");
                this.changeStatus(role,true);
            }

        }, 100);
        timers.push({role: role, timer: timer});
        console.log(timers);
    }
    changeStatus(role, isRemoveTimer) {
        let status = document.querySelector("#" + role)
            .querySelector(".flashStatus");
        if (status.getAttribute("style")) {
            status.removeAttribute("style");
            if(isRemoveTimer) {
                this.removeTimer(role);
            }
        } else {
            status.style = "background-color:#FF0000";
        }
    }
}

class Match {
    constructor(timer) {
        this.timer = timer;
    }
    enemyCard(callback) {
        let cards = document.createElement('div');
        cards.className = "enemyCards";
        for (let i = 0; i < 5; i++) {
            let card = document.createElement('div');
            card.className = "enemyCard";
            card.id = getRole(i);
            card.dataset.role = getRole(i);
            let cardTitle = document.createElement('div');
            cardTitle.className = "cardTitle";
            cardTitle.textContent = getRole(i);
            let spellSection = document.createElement('div');
            spellSection.className = "spellSection";
            let timerSection = document.createElement('div');
            timerSection.className = "timerSection";
            timerSection.innerHTML = "05.00";
            timerSection.dataset.timer = 300;
            let flashStatus = document.createElement('div');
            flashStatus.className = "flashStatus";
            flashStatus.innerHTML = "&nbsp";
            let checkedElements = -1;
            for (let j = 0; j < 2; j++) {
                let el = document.createElement('INPUT');
                el.setAttribute("type", "checkbox");
                el.value = j;
                el.dataset.role = getRole(i);
                el.addEventListener('change', () => {
                    let timer = el.parentNode.parentNode.querySelector(".timerSection");
                    if (el.getAttribute("checked")) {
                        el.removeAttribute("checked");
                    } else {
                        el.setAttribute("checked", "checked");
                    }
                    timer.dataset.timer = getFlashTime(checkedElements);
                    timer.innerHTML = this.timer.secondToMin(getFlashTime(checkedElements));
                });
                let txt = document.createElement('label');
                txt.textContent = j === 0 ? "rune" : "boots";
                txt.style = "padding-right:10px; color:#FFF";
                spellSection.appendChild(el);
                spellSection.appendChild(txt);
            }
            timerSection.addEventListener("click", (e) => {
                e.disabled = true;
                this.timerCard(getRole(i), () => {
                    this.timer.changeStatus(getRole(i),true);
                });
            })
            card.appendChild(cardTitle);
            card.appendChild(spellSection);
            card.appendChild(timerSection);
            card.appendChild(flashStatus);
            cards.appendChild(card);
        }
        content.appendChild(cards);
        if (callback) {
            callback();
        }
    }
    timerCard(role, callback) {
        let el = document.querySelectorAll(".timerCard");
        if (el) {
            for (let i = 0; i < el.length; i++) {
                if (el[i].dataset.role === role) {
                    el[i].remove();
                    if (callback) {
                        callback();
                    }
                    return;
                }
            }
        }
        let card = document.createElement('div');
        card.className = "timerCard";
        card.dataset.role = role;
        let timerRole = document.createElement('span');
        timerRole.className = "timerRole";
        timerRole.textContent = role;
        let timer = document.createElement('span');
        timer.className = "timer";
        timer.textContent = "05.00";
        timer.dataset.time = 300;
        this.timer.setTimer(timer, role);
        card.appendChild(timerRole);
        card.appendChild(timer);
        content.appendChild(card);
        if (callback) {
            callback();
        }
    }
}