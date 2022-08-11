import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'notification-center',
  styleUrl: 'notification-center.css',
  shadow: true,
})
export class NotificationCenter {
  @Prop() messages;
  
  @Event() clearMessage:EventEmitter<{}>;

  clearClickHandler = (e) => { 
    console.log('e : ', e.target.getAttribute('data-messageId'));
    const messageId = e.target.getAttribute('data-messageId')
    this.clearMessage.emit(messageId);
  }

  render() {
    return (
      <div class="notification-center">
        <div>
          <h3 class='sectionHeader'>{`Notification center(${this.messages.length})`}</h3>
        </div>
          {this.messages.map(m => (
            <div data-messageId={m.id} onClick={(e) => this.clearClickHandler(e)} class="message-block">{m.description}-{m.id}</div>
          ))}
        <div class="button-section">
          <button class="clear-button" data-messageId='all' onClick={(e) => this.clearClickHandler(e)}>Clear All</button>
        </div>
      </div>
    );
  }

}
