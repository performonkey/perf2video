import classnames from 'classnames';
import { Component, Listen, State } from '@stencil/core';
import { Screenshot } from '../load-profile';
import { Settings } from '../settings';

interface Progress {
  show: boolean;
  title: string;
  message: string;
}

@Component({
  tag: 'performance-to-video',
  styleUrl: 'style.css',
  shadow: true,
})
export class PerformanceToVideo {
  @State() screenshots: Array<Screenshot>;
  @State() progress: Progress = { show: false, title: '', message: '' };
  @State() settings: Settings = { frameRate: 16, videoType: '' };

  @Listen('p2vProgressUpdate')
  updateProgress(event: CustomEvent) {
    this.progress = event.detail;
  }

  @Listen('p2vLoadProfileFailed')
  progressFailed(event: CustomEvent) {
    console.log('profileLoadFailed: ', event.detail);
  }

  @Listen('p2vSettingsUpdate')
  p2vSettingsUpdate(event: CustomEvent) {
    this.settings = event.detail;
  }

  handleLoadProfile = (event: CustomEvent) => {
    this.screenshots = event.detail;
  };

  render() {
    return (
      <div class="performance-to-video">
        <p2v-settings class="settings" settings={this.settings} />
        <p2v-load-profile onLoadProfile={this.handleLoadProfile} />
        <p2v-progress
          class={classnames('p2v-progress', { show: this.progress.show })}
          title={this.progress.title}
          message={this.progress.message}
        />
        <p2v-record
          class={classnames('record', { collapsed: !this.screenshots })}
          settings={this.settings}
          screenshots={this.screenshots}
        />
      </div>
    );
  }
}
