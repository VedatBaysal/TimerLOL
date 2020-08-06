const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "tr-TR";
recognition.onstart = () => {
    console.log("voice is activated");
}
recognition.onresult = (e) => {
    const index = e.resultIndex;
    const isFinal = e.results[index].isFinal
    if(isFinal === true) {
        const transcript = e.results[index][0].transcript;
        readOutLound(transcript);
        console.log(transcript);
    }
}

let readOutLound = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = "tr-TR";
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}