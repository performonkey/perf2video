import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'p2v-progress',
  styleUrl: 'style.css',
  shadow: true,
})
export class Progress {
  @Prop() title = '';
  @Prop() message = '';
  @Event() onCloseProgress: EventEmitter;

  render() {
    return (
      <div class="progress">
        <div class="title">{this.title}</div>
        <div class="message">{this.message}</div>
      </div>
    );
  }
}
