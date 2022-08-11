import { Component, h, EventEmitter, Event, Prop } from '@stencil/core';

@Component({
  tag: 'subscribe-notification',
  styleUrl: 'subscribe-notification.css',
  shadow: true,
})
export class SubscribeNotification {
  @Event() subscribeTopic:EventEmitter<{}>;
  @Prop() userMailboxId:string;

  subscribeClickHandler = () => {
    if(this.userMailboxId){
      this.subscribeTopic.emit();
    }else{
      alert("Please enter mailBoxId and try again.")
    }
  }
  render() {
    return (<div class="subscribe-container">
              <button class="demo-button" onClick={this.subscribeClickHandler}>Subscribe</button>
              <div class='formfield'>
                <label class="formLabel">Topic/MailBoxId:</label>
                <input class="formInput" value={this.userMailboxId}/>
              </div>
          </div>
    );
  }

}
