function AudioVisualizer() {
    return (
        <>
            {/* AUDIO */}
            <audio src="./src/assets/vel.mp3" controls loop></audio>
            {/* AUDIO VISUALIZER */}
            <div id="audioContainer"></div>
        </>
    )
}


export default AudioVisualizer