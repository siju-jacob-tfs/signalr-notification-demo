import { Component, h, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'subscribe-notification',
  styleUrl: 'subscribe-notification.css',
  shadow: true,
})
export class SubscribeNotification {
  @Event() subscribeTopic:EventEmitter<{}>;

  subscribeClickHandler = () => {
    this.subscribeTopic.emit();
  }
  render() {
    return (<div class="subscribe-container">
              <button class="demo-button" onClick={this.subscribeClickHandler}>Subscribe</button>
              <div class='formfield'>
                <label class="formLabel">Topic/MailBoxId:</label>
                <input class="formInput" value='user_ccab3985-756a-4b47-a321-5815837ef718'/>
              </div>
          </div>
    );
  }

}
