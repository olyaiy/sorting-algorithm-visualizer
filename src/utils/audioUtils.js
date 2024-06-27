export const initAudio = (audioContextRef, gainNodeRef) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
  };
  
  export const playTone = (frequency, duration, audioContextRef, gainNodeRef) => {
    if (!audioContextRef.current || !gainNodeRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    oscillator.connect(gainNodeRef.current);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };