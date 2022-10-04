const video = document.querySelector('video');
  const message = document.getElementById('message');
  const { createFFmpeg, fetchFile } = FFmpeg;
  const ffmpeg = createFFmpeg({
    log: true,
    progress: showProgress
  });

  if(!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
    var error = 'Your browser does NOT supports getDisplayMedia API.';
    document.querySelector('h1').innerHTML = error;

    video.style.display = 'none';
    document.getElementById('btn-start-recording').style.display = 'none';
    document.getElementById('btn-stop-recording').style.display = 'none';
    throw new Error(error);
  }

  function invokeGetDisplayMedia(success, error) {
    var displaymediastreamconstraints = {
      video: {
        displaySurface: 'monitor',
        logicalSurface: true,
        cursor: 'always'
      }
    };

    displaymediastreamconstraints = {
      video: true
    };

    if(navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
    }
    else {
      navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
    }
  }

  function captureScreen(callback) {
    invokeGetDisplayMedia(function(target) {
      addStreamStopListener(target, function() {
        if(window.stopCallback) {
          window.stopCallback();
        }

      });
      callback(target);
    }, function(error) {
      console.error(error);
      alert('Unable to capture your screen. Please check console logs.\n' + error);
    });
  }

  function captureCallback(target) {
    video.srcObject = target;
    const checkbox = document.getElementById("convert-to-gif");
    checkbox.disabled = true;

    var recorder = RecordRTC(target, {
      type: 'video',
      mimeType: 'video/webm'
    });

    recorder.startRecording();

    window.stopCallback = function() {
      window.stopCallback = null;

      recorder.stopRecording(function() {
        var blob = recorder.getBlob();
        var fileUrl = URL.createObjectURL(blob);
        video.srcObject = null;
        video.src = fileUrl;

        target.stop();
        if(checkbox.checked === true) {
          convert(fileUrl).then(() => { checkbox.disabled = false });
        } else {
          recorder.save("screen_recording.webm");
          checkbox.disabled = false;
        }
        recorder.destroy();
        recorder = null;
      });
    };
  }

  function addStreamStopListener(stream, callback) {
    stream.addEventListener('ended', function() {
      callback();
      callback = function() {};
    }, false);
    stream.addEventListener('inactive', function() {
      callback();
      callback = function() {};
    }, false);
    stream.getTracks().forEach(function(track) {
      track.addEventListener('ended', function() {
        callback();
        callback = function() {};
      }, false);
      track.addEventListener('inactive', function() {
        callback();
        callback = function() {};
      }, false);
    });
  }

  document.getElementById('btn-start-recording').onclick = function() {
    this.disabled = true;
    captureScreen(captureCallback);
    document.getElementById('btn-stop-recording').disabled = false;
  };

  document.getElementById('btn-stop-recording').onclick = function() {
    this.disabled = true;
    window.stopCallback();
  };

  function promptDownload(fileURL) {
    var anchorTag = document.createElement('a');
    anchorTag.href = fileURL;
    anchorTag.target = '_blank';
    anchorTag.download = "converted_video.gif";
    document.body.appendChild(anchorTag);
    anchorTag.click();
    document.body.removeChild(anchorTag);
  }

  function showProgress({ ratio }) {
    if(!isNaN(ratio)) {
      message.innerHTML = `Complete: ${(ratio * 100.0).toFixed(2)}%`;
    }
    else {
      if(message.innerHTML == "/") {
        message.innerHTML = "-";
      }
      else if(message.innerHTML == "-") {
        message.innerHTML = "\\";
      }
      else {
        message.innerHTML = "/";
      }
    }
  }

  const convert = async (sourceFileUrl) => {
    if(!ffmpeg.isLoaded()) {
      message.innerHTML = 'Loading ffmpeg-core.js';
      await ffmpeg.load();
    }
    message.innerHTML = 'Start converting';
    ffmpeg.FS('writeFile', 'recording', await fetchFile(sourceFileUrl));
    await ffmpeg.run('-i', 'recording', '-vf', 'fps=10,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse', 'output.gif');
    message.innerHTML = 'Conversion complete.';
    const data = ffmpeg.FS('readFile', 'output.gif');
    const blob = new Blob([data.buffer], { type: 'image/gif' });
    const fileUrl = URL.createObjectURL(blob);
    promptDownload(fileUrl);
  }