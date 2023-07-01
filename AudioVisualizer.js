    // Get access to the microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
       console.log(audioContext);
        var audioSource = audioContext.createMediaStreamSource(stream);
        var analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        audioSource.connect(analyser);
        function updateVisualizer() {
          analyser.getByteFrequencyData(dataArray);
          var audioBars = document.getElementsByClassName('audio-bar');
          var scaleFactor = 2; // Adjust this value to control the height change sensitivity
          var first = document.getElementsByClassName( "first" );
          var second = document.getElementsByClassName( "second" );
          var middle = document.getElementsByClassName( "middle" );
          var third = document.getElementsByClassName( "third" );
          var last = document.getElementsByClassName( "last" );
          for (var i = 0; i < middle.length; i++) {
            var barHeight = dataArray[i] / scaleFactor;
            first[i].style.height = barHeight/6 + 'px';
            second[i].style.height = barHeight/3 + 'px';
            middle[i].style.height = barHeight/2 + 'px';
            third[i].style.height = barHeight/3 + 'px';
            last[i].style.height = barHeight/6 + 'px';
          }
          requestAnimationFrame(updateVisualizer);
        }

        updateVisualizer();
      })
      .catch(function(err) {
        console.error(err);
      });
