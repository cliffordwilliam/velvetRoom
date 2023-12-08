import vel from "./vel.mp3"


function AudioVisualizer() {
    return (
        <>
            {/* AUDIO */}
            <audio src={vel} controls loop></audio>
            {/* AUDIO VISUALIZER */}
            <div id="audioContainer"></div>
        </>
    )
}


export default AudioVisualizer