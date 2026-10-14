// Web Audio API ambient sound generator for serene coastal waves & cafe ambiance
class CoastalSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private waveGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private lfo: OscillatorNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private start() {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtxClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Generate brown/pink noise (deep ocean surf)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter for warm ocean frequencies
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      // LFO to swell the waves like coastal tides
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // one breath every ~8 seconds

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);

      lfo.connect(filter.frequency);

      const waveGain = this.ctx.createGain();
      waveGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(waveGain);

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      waveGain.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      whiteNoise.start();
      lfo.start();

      this.noiseNode = whiteNoise;
      this.lfo = lfo;
      this.waveGain = waveGain;
      this.masterGain = masterGain;
      this.isPlaying = true;
    } catch {
      // AudioContext might be blocked until user gesture
      this.isPlaying = false;
    }
  }

  private stop() {
    try {
      if (this.lfo) {
        this.lfo.stop();
        this.lfo.disconnect();
      }
      if (this.noiseNode && 'stop' in this.noiseNode) {
        (this.noiseNode as AudioScheduledSourceNode).stop();
        this.noiseNode.disconnect();
      }
      if (this.ctx) {
        this.ctx.suspend();
      }
    } catch {
      // ignore cleanup errors
    }
    this.isPlaying = false;
  }
}

export const coastalSoundscape = new CoastalSoundscape();
