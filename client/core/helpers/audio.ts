export const applySoundProcessing = (htmlAudio: HTMLAudioElement) => {
  const audioCtx = new AudioContext();

  try {
    const source = audioCtx.createMediaElementSource(htmlAudio);
    const compressor = audioCtx.createDynamicsCompressor();
    const now = audioCtx.currentTime;

    compressor.threshold.setValueAtTime(-50, now);
    compressor.ratio.setValueAtTime(10, now);
    compressor.knee.setValueAtTime(40, now);
    compressor.attack.setValueAtTime(0, now);
    compressor.release.setValueAtTime(0.25, now);

    const filter = audioCtx.createBiquadFilter();
    filter.Q.setValueAtTime(8.3, now);
    filter.gain.setValueAtTime(3, now);
    filter.type = "bandpass";

    const oscillator = audioCtx.createOscillator();

    filter.connect(oscillator);
    compressor.connect(filter);
    source.connect(compressor);
    compressor.connect(audioCtx.destination);
  } catch (e) {
    console.log(e);
  }
};
