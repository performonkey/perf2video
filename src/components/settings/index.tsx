import { Component, Event, EventEmitter, Prop } from '@stencil/core';

declare var MediaRecorder;

const supportedVideoType: Array<string> = [
  'video/webm',
  'video/webm;codecs=vp8',
  'video/webm;codecs=daala',
  'video/webm;codecs=h264',
  'video/mpeg',
].filter(x => MediaRecorder.isTypeSupported(x));

export interface Settings {
  frameRate: number;
  videoType: string;
}

@Component({
  tag: 'p2v-settings',
  styleUrl: 'style.css',
  shadow: true,
})
export class P2VSettings {
  @Prop() settings: Settings;
  @Event() p2vSettingsUpdate: EventEmitter;

  componentDidLoad() {
    this.p2vSettingsUpdate.emit({
      ...this.settings,
      videType: supportedVideoType[0],
    });
  }

  render() {
    return (
      <div>
        <div class="setting-field">
          <div class="setting-name">Frame Rate</div>
          <input type="number" value={this.settings.frameRate} />
        </div>
        <div class="setting-field">
          <div class="setting-name">Video Codec</div>
          <select>
            {supportedVideoType.map(x => (
              <option value={x} selected={this.settings.videoType === x}>
                {x}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
