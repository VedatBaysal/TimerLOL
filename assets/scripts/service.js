/*
    for managment of the commands and times
*/

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

let response = {
    lastMinute(role) {
        return roleTranslate(role) + "Sicrasina 1 dakika kaldi"
    },
    used(role) {
        return roleTranslate(role) + "Sicrasini kullandi"
    },
}

let commands = (command) => {
    let match = new Match(new Timer());
    if (command.includes('sıçra') || command.includes('flash')) {
        for (let i = 0; i < commandsList.length; i++) {
            for (let j = 0; j < commandsList[i].length; j++) {
                if (command.includes(commandsList[i][j])) {
                    match.timerCard(getRole(i), () => {
                        document.querySelector("#" + getRole(i)).lastChild.style = "background-color:#FF0000";
                        readOutLound(response.used(getRole(i)));
                    });
                    break;
                }
            }
        }
    }
}