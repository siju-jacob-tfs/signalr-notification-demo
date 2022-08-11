import { Component, h, Listen, State } from '@stencil/core';

import { ApplicationDataService, NotificationHub } from '@thermo/appspace-library';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
  shadow: true,
})
export class HomePage {

  @State() apiURL: string = 'https://api.hyperbridge-xpanse.cmddev.thermofisher.com';
  @State() token: string = '';
  @State() currentUserMailBoxId: string = '';
  @State() isModalVisible:boolean = false;
  @State() messages: Array<any> = [];
  

  
  private _notificationService: NotificationHub;
  componentWillLoad(){
    ApplicationDataService.Instance.setApiURL(this.apiURL);
    this._notificationService = NotificationHub.Instance;
  }

  @Listen('setCredentials', { target: 'window' })
  setCredentialsHandler(data:any) {
    const userDetails = data.detail;
    console.log('setCredentialsHandler : userDetails : ', userDetails);
    this.currentUserMailBoxId = userDetails.userMailboxId;
    ApplicationDataService.Instance.setToken(userDetails.accessToken);
  }
  
  @Listen('subscribeTopic', { target: 'window' })
  subscribeHandler(data:any) {
    const userDetails = data.detail;
    this._notificationService.init().then(async () => {
      console.log('subscribeHandler :: userDetails : ', userDetails);
      this.currentUserMailBoxId = userDetails.userMailboxId;
      let subsciberId = await this._notificationService.subscribe(this.currentUserMailBoxId, this.notificationHandler.bind(this));
      console.log('subsciberId : ', subsciberId);
    });
  }

  @Listen('cancelNotification', { target: 'window' })
  cancelNotificationHandler() {
    this.isModalVisible = false;
  }

  @Listen('clearMessage', { target: 'window' })
  clearAllMessagesHandler(data:any) {
    console.log('clearAllMessagesHandler : data : ', data);
    if(data.detail === 'all'){
      this.messages = [];
    }else{
      this.messages = this.messages.filter(f => f.id != data.detail)
    }
  }

  @Listen('publishNotification', { target: 'window' })
  publisherHandler(ev: any) {
    const publishData = ev.detail || {};
    console.log('publisherHandler :: publishData : ', publishData);
    this._notificationService.sendNotification(this.currentUserMailBoxId, publishData.payload, publishData.type, publishData.recipientAddresses ).then((res) => {
      console.log('publisherHandler :: SUCCESS res: ', res);
    }).catch((err) => {
      console.log('publisherHandler err : ', err);
    });
    this.togglePublishModal();
  }

  notificationHandler = (data:any) => {
    console.log('notificationListner :: data : ', data);
    const { description, severity} = data.payload;
    let thisMessage = {
      id: data.id,
      severity,
      description
    }
    this.messages = [...this.messages, thisMessage];
  }

  tokenClickHandler = () => {
    navigator.clipboard
      .readText()
      .then(data => {
        this.token = data
      });
  }

  togglePublishModal = () => {
    this.isModalVisible = !this.isModalVisible;
  }

  render() {
    return <div class="homePage">
      <header>
        <h3>SignalR Appspace Demo</h3>
      </header>
        <div class="main">
          <div>
            <subscribe-notification></subscribe-notification>
            <div class="button-section">
              <button class="demo-button" onClick={() => this.togglePublishModal()}>Publish</button>
            </div>
          </div>
          <div>
            <notification-center messages={this.messages}></notification-center>
          </div>
          <publish-notification isVisible={this.isModalVisible}></publish-notification>
        </div>
      <footer>@thermo/appspace-library:0.0.33</footer>
    </div>;
  }

}
