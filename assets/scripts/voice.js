const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
isStopped = false;
recognition.lang = "tr-TR";
recognition.onstart = () => {
    if(!isStopped)
    readOutLound("Hos Geldin");
    console.log("voice is activated");
}
recognition.onresult = (e) => {
    const index = e.resultIndex;
    const isFinal = e.results[index].isFinal
    if (isFinal === true) {
        const transcript = e.results[index][0].transcript.toLowerCase();
        console.log(transcript);
        commands(transcript);
    }
}
recognition.onend = () => {
    isStopped = true;
    recognition.start();
}

let readOutLound = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.lang = "tr-TR";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}


let response = {
    lastMinute(role) {
        return roleTranslate(role) + "Sicrasina 1 dakika kaldi"
    },
    used(role) {
        return roleTranslate(role) + "Sicrasini kullandi"
    },
}
let commandsList = [
    ["top", "üst", "ust"],
    ["jungle", "ormancı", "ormanci"],
    ["mid", "orta"],
    ["adc", "nişancı", "nisanci"],
    ["sup", "support", "destek"]
]
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