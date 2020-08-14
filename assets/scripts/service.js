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

const getAllSpellImagesSection = (isHidden) => {
    let span = "<span class='allSpellImage'>";
    let imageList = "";
    for (let i = 0; i < spellCommands.length; i++) {
        if(isHidden && i > 0) {
            imageList += `<img src="./assets/images/${spellCommands[i][0]}.png" class='hidden'/>`;
        } else {
            imageList += `<img src="./assets/images/${spellCommands[i][0]}.png" />`;
        }
            
        
    }
    span += imageList + '</span>';
    return span;
}

const getSpellTime = (role,spell) => {

}

let response = {
    lastMinute(role) {
        return roleTranslate(role) + "Sicrasina 1 dakika kaldi"
    },
    used(role, spell) {
        return roleTranslate(role) + spell +"kullandi"
    },
}

let commandControl = (command) => {
    let role;
    for (let i = 0; i < roleCommands.length; i++) {
        for(let j = 0; j < roleCommands[i].length; j++) {
            if(command.includes(roleCommands[i][j])) {
                role = getRole(i);
                break;
            }
        }
    }
    if (role === null) return;
    let spell;
    for (let i = 0; i < spellCommands.length; i++) {
        for(let j = 0; j < spellCommands[i].length; j++) {
            if(command.includes(spellCommands[i][j])) {
                spell = spellCommands[i][0].toUpperCase();
                break;
            }
        }
    }
    if (spell === null) return;
    let match = new Match(new Timer());
    match.timerCard(role, () => {
        document.querySelector("#" + role).lastChild.style = "background-color:#FF0000";
        readOutLound(response.used(role,spell));
    });
}

let commands = (command) => {
    console.log(command);
    commandControl(command);
}