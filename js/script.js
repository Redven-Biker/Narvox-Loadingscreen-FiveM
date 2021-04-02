// Setup Canvas
  var canvas = document.getElementById('visualizer');
  var canvasContext = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight / 2;

  // Setup Audio Context
  var audioContext = new (window.AudioContext || window.webkitAudioContext)();
  var audio = document.getElementById('audio');

  var source = audioContext.createMediaElementSource(audio);
  var analyser = audioContext.createAnalyser();

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  var bufferLength = analyser.frequencyBinCount;
  var frequencyData = new Uint8Array(bufferLength);

  // Visualizer Settings
  function Visualizer() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(frequencyData);

    var frequencyWidth = (canvas.width / bufferLength * 4),
      frequencyHeight = 0,
      x = 0;

    for (var increment = 0; increment < bufferLength; increment++) {
      frequencyHeight = frequencyData[increment] * (canvas.height * 0.002);

    canvasContext.fillStyle = "rgba(247,29,29,1.0)";
    canvasContext.fillRect(x, canvas.height - frequencyHeight, frequencyWidth, frequencyHeight);
      x += frequencyWidth + 2;
    }

    call = requestAnimationFrame(Visualizer);
  }

  // Default Audio Variable
  var isPlaying = false;

  // Audio and Visualizer Control Variables
  var controls = document.getElementById('sound-controls');
  var ctrl_icon = document.getElementById('controls-icon');
  var ctrl_label = document.getElementById('control-label');

  // Start Visualizer on Load
  var startVisualizer = function() {
    isPlaying = !isPlaying;
    Visualizer();
  }
  startVisualizer();

  // Load the Audio
  var request = new XMLHttpRequest();

  request.open('GET', 'music/music.mp3', true);
  request.responseType = 'blob';

  request.onload = function() {
    audio.src = window.URL.createObjectURL(request.response);
    console.log(request.response);
  }

  request.send();

  // Resize Canvas on Browser Resize
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
  });