import { Component, Event, EventEmitter, Prop } from '@stencil/core';

export interface Profile {
  readonly name: string;
  readonly ts: number;
  readonly tts: number;
  readonly args: {
    readonly snapshot: string;
  };
}

export interface Screenshot {
  readonly width: number;
  readonly height: number;
  readonly img: HTMLImageElement;
  readonly ts: number;
  readonly tts: number;
}

function screenshotToImg(profile: Profile): Promise<Screenshot> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () =>
      resolve({
        width: img.width,
        height: img.height,
        img: img,
        ts: profile.ts,
        tts: profile.tts,
      });
    img.onerror = reject;
    img.src = `data:image/png;base64,${profile.args.snapshot}`;
  });
}

@Component({
  tag: 'p2v-load-profile',
  styleUrl: 'style.css',
  shadow: true,
})
export class loadProfile {
  @Prop() onLoadProfile: (screenshots: CustomEvent) => void;
  @Event() p2vProgressUpdate: EventEmitter;
  @Event() p2vLoadProfileFailed: EventEmitter;

  handleChange = event => {
    const { onLoadProfile, p2vLoadProfileFailed, p2vProgressUpdate } = this;
    p2vProgressUpdate.emit({ title: `Read Profile` });

    const reader = new FileReader();
    reader.addEventListener('progress', e => {
      const precent = Math.trunc(e.loaded / e.total * 100);
      p2vProgressUpdate.emit({
        show: true,
        title: `Read Profile (${precent}%)`,
      });
    });
    reader.addEventListener('error', p2vLoadProfileFailed.emit);

    reader.onload = async function readOnLoad() {
      let profiles: Array<Profile>;
      try {
        profiles = JSON.parse(this.result);
      } catch (error) {
        p2vLoadProfileFailed.emit(error);
        return;
      }

      let screenshots: Array<Screenshot>;
      try {
        screenshots = await Promise.all(
          profiles.filter(x => x.name === 'Screenshot').map(screenshotToImg)
        );
      } catch (error) {
        p2vLoadProfileFailed.emit(error);
        return;
      }

      onLoadProfile(new CustomEvent('screenshots', { detail: screenshots }));
    };
    reader.readAsText(event.target.files[0]);
  };

  render() {
    return (
      <div>
        <label class="upload" htmlFor="load-profile">
          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 20 17"
            >
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
            </svg>
          </figure>
          <span>Choose a Proformance Profile</span>
        </label>
        <input
          id="load-profile"
          class="file-input"
          type="file"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
