// PlayAudio.js
export const playAudio = (audio) => {
    const audioToPlay = new Audio(audio);
    audioToPlay.play();
};
