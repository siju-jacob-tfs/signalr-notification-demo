import { Component, h, Listen, State } from '@stencil/core';

import { ApplicationDataService, NotificationHub } from '@thermo/appspace-library';

@Component({
  tag: 'home-page',
  styleUrl: 'home-page.css',
  shadow: true,
})
export class HomePage {

  @State() apiURL: string = 'https://api.hyperbridge-xpanse.cmddev.thermofisher.com';
  @State() currentUserMailBoxId: string = 'user_ccab3985-756a-4b47-a321-5815837ef718';
  @State() token: string = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjM2NzNBMjQ0QzNENUJBNDIyOUM4RTYyQzkxNjk3NUI0IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkZW50aXR5Lmh5cGVyYnJpZGdlLXhwYW5zZS5jbWRkZXYudGhlcm1vZmlzaGVyLmNvbSIsIm5iZiI6MTY2MDE3OTY1NSwiaWF0IjoxNjYwMTc5NjU1LCJleHAiOjE2NjAxODMyNTUsImF1ZCI6WyJJZGVudGl0eVNlcnZlckFwaSIsIkRhdGFTZXJ2ZXJBcGkiLCJodHRwczovL2lkZW50aXR5Lmh5cGVyYnJpZGdlLXhwYW5zZS5jbWRkZXYudGhlcm1vZmlzaGVyLmNvbS9yZXNvdXJjZXMiXSwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsIklkZW50aXR5U2VydmVyQXBpIiwiRGF0YVNlcnZlckFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJleHRlcm5hbCJdLCJjbGllbnRfaWQiOiJMdW5hVUlfRGV2Iiwic3ViIjoiY2NhYjM5ODUtNzU2YS00YjQ3LWEzMjEtNTgxNTgzN2VmNzE4IiwiYXV0aF90aW1lIjoxNjYwMTQ4NjY2LCJpZHAiOiJvaWRjLWNocm9tZWxlb24iLCJsdW5hX3Blcm1pc3Npb24iOlsiUGVybWlzc2lvbnMuUG9saWN5Lk1hbmFnZSIsIlBlcm1pc3Npb25zLlJvbGUuQXNzaWduIiwiUGVybWlzc2lvbnMuVXNlci5BZGQiLCJQZXJtaXNzaW9ucy5Sb2xlLkN1c3RvbWl6ZSIsIlBlcm1pc3Npb25zLkNsaWVudC5NYW5hZ2UiLCJQZXJtaXNzaW9ucy5Qb2xpY3kuRm9sZGVyLk1hbmFnZSIsIlBlcm1pc3Npb25zLlVzZXIuRGVsZXRlIiwiUGVybWlzc2lvbnMuVXNlci5TdGF0dXMiLCJQZXJtaXNzaW9ucy5HbG9iYWxTZXR0aW5ncy5NYW5hZ2UiLCJQZXJtaXNzaW9ucy5BdHRyaWJ1dGUuTWFuYWdlIiwiUGVybWlzc2lvbnMuUm9sZS5BZGQiLCJQZXJtaXNzaW9ucy5BcHBsaWNhdGlvbi5VbmxvY2siLCJQZXJtaXNzaW9ucy5JRFAuTWFuYWdlIl0sImx1bmFfcm9sZWlkIjoiOWYwNjBmOGQtNTMwYS00MzBhLWI3ZjUtYjZkNzczNTlhYzUxIiwibHVuYV9yb2xlbmFtZSI6IlN1cGVyIEFkbWluIiwibHVuYV9pZCI6ImNjYWIzOTg1LTc1NmEtNGI0Ny1hMzIxLTU4MTU4MzdlZjcxOCIsImx1bmFfdGVuYW50aWQiOiIyMDFGQUEwOUJDRkY0OTgwOUY2Rjc3NEM4MkVGMTRDRSIsImx1bmFfaWRlbnRpdHlwcm92aWRlcmlkIjoiMSIsImx1bmFfZnVsbG5hbWUiOiIgIiwibHVuYV9uYW1lIjoic2lqdS5qYWNvYiIsImx1bmFfZXh0ZXJuYWxpZCI6Ijg1MjQ4MGU1LWJlZDctNDNjYi1iMWEwLWE5MWIxYjJkY2YwMiIsIm5hbWUiOiJzaWp1LmphY29iIiwiYXBwbGljYXRpb24iOiJIeXBlckJyaWRnZSIsImFwcGxpY2F0aW9uVmVyc2lvbiI6IjEuMC4wIiwiaG9zdE5hbWUiOiI3MS42My4xMTcuNzIiLCJsdW5hX2NhdGVnb3J5X1Rlc3QgYXNzaWduIGF0dHJpYnV0ZSI6InRlc3QgYXNzaWduIGF0dHJpYnV0ZSIsInNpZCI6IkY1RUY1NTkxRUFDOEQyNUI2NTE3ODI3OUFGRkVDMzBFIiwianRpIjoiMzdBRkQ3MjlENEUxNTU2MDU1QjQzMkU0NTI0NkJENzQifQ.Io6iAQ_3CMFt7dCUWyAGRIXFkq34QEilTpD-7Bv7brdT2MIr2MfFRiSeuHXUXWIq8f7deECjemHBd48mLH7w3Am2QfVEgsU6YMRUF02PDiOEq2GYOc2m6ZPj4TZ9a6V7EV9auGCmgrIaMtKKYsHBCyMsD1ZuZ9al3o7whh8bFW6ZJdmQofUc-aDmH0xgWxEE3FbpfFbwtxN89NMDywp-5RTHm4QsDYztjPi-BXwzI_yOs_dKk-mXJL-pIrCfJrvUd2EWpWzfyC-2ET5xI7VY1i1RV8m6sxJUiZnvGZYQsb2Vyn0uYR3Rqgmmn9akTD8WRlFqH_1DwfhmxJtlNUviyQ';
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
      <header>SignalR Appspace Demo</header>
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
