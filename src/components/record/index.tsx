import classnames from 'classnames';
import {
  Component,
  Event,
  EventEmitter,
  Element,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { Settings } from '../settings';
import { Screenshot } from '../load-profile';

declare var MediaRecorder;

@Component({
  tag: 'p2v-record',
  styleUrl: 'style.css',
  shadow: true,
})
export class Record {
  @Prop() screenshots: Array<Screenshot> = [];
  @Prop() settings: Settings;
  @State() video: HTMLVideoElement;
  @State() canvas: HTMLCanvasElement;
  @State() context: CanvasRenderingContext2D;
  @State() videoUrl: string;
  @Event() p2vProgressUpdate: EventEmitter;
  @Element() recordEl: HTMLElement;

  componentDidLoad() {
    this.canvas = this.recordEl.shadowRoot.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.video = this.recordEl.shadowRoot.querySelector('video');
    this.video.addEventListener('end', () =>
      URL.revokeObjectURL(this.videoUrl)
    );
  }

  encodeVideo = chunks => {
    const blob = new Blob(chunks);
    this.videoUrl = URL.createObjectURL(blob);
  };

  painting = screenshots => {
    return new Promise(resolve => {
      const draw = (idx = 0) => {
        if (idx >= screenshots.length) {
          resolve();
          return;
        }
        this.context.fillStyle = 'rgb(255,255,255)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(screenshots[idx].img, 0, 0);

        setTimeout(() => draw(idx + 1), this.settings.frameRate);
      };
      draw();
    });
  };

  @Watch('screenshots')
  async screenshotsUpdate(newValue, oldValue) {
    if (newValue === oldValue || newValue.length === 0) return;

    this.p2vProgressUpdate.emit({
      show: true,
      title: 'Recording...',
    });
    this.videoUrl = '';
    const screenshots = newValue;
    const width = screenshots.reduce((a, b) => (a.width > b.width ? a : b))
      .width;
    const height = screenshots.reduce((a, b) => (a.height > b.height ? a : b))
      .height;

    this.canvas.width = width;
    this.canvas.height = height;

    const recorder = new MediaRecorder(
      this.canvas.captureStream(this.settings.frameRate),
      {
        mimeType: this.settings.videoType,
      }
    );
    recorder.ondataavailable = e => this.encodeVideo([e.data]);
    recorder.start();
    await this.painting(screenshots);
    recorder.stop();

    this.p2vProgressUpdate.emit({ show: false });
  }

  render() {
    return (
      <div>
        <video
          controls
          class={classnames({ hide: !this.videoUrl })}
          src={this.videoUrl}
        />
        <canvas class={classnames({ hide: this.videoUrl })} />
      </div>
    );
  }
}
