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