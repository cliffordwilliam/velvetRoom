import { useEffect } from "react"


export default function Footer() {
  // on ready
  useEffect(()=>{
    // start observing on click doc (one shot)
    document.addEventListener("click", initObserver)
  },[])


  /**#########
   * # AUDIO #
   * #########
   */
  // observe audio with recurssion, updates bar
  function initObserver() {
      const audio = document.querySelector("audio")
    
      const audioContext = new AudioContext()
      const audioSource = audioContext.createMediaElementSource(audio)
      const analyser = audioContext.createAnalyser()
      audioSource.connect(analyser)
      audioSource.connect(audioContext.destination)
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)
    
      dataArray.forEach((data, i)=>{
        if (i < 50) {
          const bar = document.createElement("div")
          bar.setAttribute("id", `bar${i}`)
          bar.style.display = "block"
          bar.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
          bar.style.flex = 1
          bar.style.height = "0px"
          const container = document.getElementById("audioContainer")
          container.appendChild(bar)
        }
      })
    
      function updateBar() {
        analyser.getByteFrequencyData(dataArray)
        dataArray?.forEach((data, i)=>{
          if (i < 50) {
            const bar = document.getElementById(`bar${i}`)
            const height = data
            bar.style.height = `${height}px`
          }
        })
        // recurssive at 60fps
        window.requestAnimationFrame(updateBar)
      }
      // start recurssion
      updateBar()
      // remove signal, one shot
      document.removeEventListener('click', initObserver)
  }
  // play / pause audio
  function onPlayPauseMusicButtonClicked(event){
      event.preventDefault()
      const audio = document.querySelector("audio")
      audio.paused ? audio.play() : audio.pause()
  }
  return (
      <>
          <footer className="footer">
              <div className="con footer-con">
                  <p className="footer-text">© 2023 Rent Rooms | Hacktiv. All rights reserved. Made with ❤️ by William</p>
                  <button onClick={onPlayPauseMusicButtonClicked}>Play / Pause Music</button>
                  <button onClick={()=>{window.scrollTo({top:0,behavior:'smooth'})}}>Scroll to top</button>
              </div>
          </footer>
      </>
  )
}