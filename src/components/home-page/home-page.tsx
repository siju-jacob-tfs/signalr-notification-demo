import { Component, h, Listen, State } from '@stencil/core';

import { ApplicationDataService, NotificationHub } from '@thermo/appspace-library';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
  shadow: true,
})
export class HomePage {

  @State() apiURL: string = 'https://api.hyperbridge-xpanse.cmddev.thermofisher.com';
  @State() currentUserMailBoxId: string = '';
  @State() token: string = '';
  @State() isModalVisible:boolean = false;
  @State() messages: Array<any> = [];
  
  private _notificationService: NotificationHub;
  componentWillLoad(){
    ApplicationDataService.Instance.setApiURL(this.apiURL);
    ApplicationDataService.Instance.setToken(this.token);
    this._notificationService = NotificationHub.Instance;
    console.clear();
  }

  @Listen('subscribeTopic', { target: 'window' })
  subscribeHandler() {
    this._notificationService.init().then(async () => {
      console.log('subscribeHandler :: mailBoxId : ', this.currentUserMailBoxId);
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
    this._notificationService.sendNotification(this.currentUserMailBoxId, publishData.payload, publishData.type, publishData.recepients ).then((res) => {
      console.log('publisherHandler :: SUCCESS res: ', res);
    }).catch((err) => {
      console.log('publisherHandler err : ', err);
      alert('Please update the TOKEN and try again.');
    });
    this.togglePublishModal();
  }

  notificationHandler = (data) => {
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
            <subscribe-notification userMailboxId={this.currentUserMailBoxId}></subscribe-notification>
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
