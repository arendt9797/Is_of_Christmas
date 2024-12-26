
function open_card() {
    document.getElementById('front').className = 'openCard';
    rudolphAudio.play();
    rudolphAudio.volume = 0.5;
  };

  function close_card() {
    document.getElementById('front').className = '';
    santaAudio.play(); 
    santaAudio.volume = 0.1;
  };

 