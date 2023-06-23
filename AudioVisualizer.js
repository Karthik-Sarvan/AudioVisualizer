import React, { useEffect } from 'react';

function AudioVisualizer() {
  useEffect(() => {
    // Code related to audio visualization
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log(audioContext);
        var audioSource = audioContext.createMediaStreamSource(stream);
        var analyser = audioContext.createAnalyser();
        analyser.fftSize = 1024;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        audioSource.connect(analyser);

        function updateVisualizer() {
          analyser.getByteFrequencyData(dataArray);

          var audioBars = document.getElementsByClassName('audio-bar');
          var audio = document.querySelectorAll('.audio');
          var audio1 = document.querySelectorAll('.audio1');

          var scaleFactor = 1; // Adjust this value to control the height change sensitivity

          for (var i = 0; i < audioBars.length; i++) {
            var barHeight = dataArray[i] / scaleFactor;
            audioBars[i].style.height = barHeight/9 + 'px';
            audio[i].style.height = barHeight/18 +'px';
            audio1[i].style.height = barHeight/18 +'px';
            
          }

          requestAnimationFrame(updateVisualizer);
        }

        updateVisualizer();
      })
      .catch(function(err) {
        console.error(err);
      });
  }, []); // Empty dependency array ensures the effect runs only once
  
  return (
    <div className='d'>
      <section>    
   <div class="audio reflection blue"></div>
   <div class="audio-bar reflection yellow"></div> 
   <div class="audio audio1 reflection green"></div> 
 </section>
    </div>
  );
}

export default AudioVisualizer;
