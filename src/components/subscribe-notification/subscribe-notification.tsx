import { Component, h, EventEmitter, Event, State } from '@stencil/core';

@Component({
  tag: 'subscribe-notification',
  styleUrl: 'subscribe-notification.css',
  shadow: true,
})
export class SubscribeNotification {
  @Event() subscribeTopic:EventEmitter<{}>;
  @Event() setCredentials:EventEmitter<{}>;
  @State() userMailboxId:string;
  @State() accessToken:string;
  @State() userDetails: any = {
    accessToken:'',
    userMailboxId:''
  };

  setCredentialsClickHandler = () => {
    if(this.userDetails.userMailboxId){
      this.setCredentials.emit(this.userDetails);
    }else{
      alert("Please enter mailBoxId and try again.")
    }
  }
  subscribeClickHandler = () => {
    if(this.userDetails.userMailboxId){
      this.subscribeTopic.emit(this.userDetails);
    }else{
      alert("Please enter mailBoxId and try again.")
    }
  }
  
  inputChangeHandler(event) {
    const {name, value} = event.target;
    this.userDetails[name] = value;
  }

  render() {
    return (<div class="subscribe-container">
              <div class='formfield'>
                <label class="formLabel">Token</label><span class="helpText">(Copy and paste token without "Bearer" keyword)</span>
                <textarea name="accessToken" class="formInput" onInput={(event) => this.inputChangeHandler(event)}/>
              </div>
              <div class='formfield'>
                <label class="formLabel">Topic/MailBoxId:</label>
                <input name="userMailboxId" class="formInput" onInput={(event) => this.inputChangeHandler(event)}/>
              </div>
              <button class="credential-button" onClick={this.setCredentialsClickHandler}>Set Token and Topic</button>
              <button class="demo-button" onClick={this.subscribeClickHandler}>Subscribe</button>
          </div>
    );
  }

}
