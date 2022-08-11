import { Component, EventEmitter, h, State, Event, Prop } from '@stencil/core';

@Component({
  tag: 'publish-notification',
  styleUrl: 'publish-notification.css',
  shadow: true,
})
export class PublishNotification {
  @Event() publishNotification:EventEmitter<{}>;
  @Event() cancelNotification:EventEmitter<{}>;
  @Prop() isVisible: boolean;

  @State() publishData: any = {
    recipientAddresses:[],
    type: '',
    payload: {
      title: '',
      description: '',
      severity: 'Success',
      priority: '1',
      longDescription: ''
    }
  };

  componentWillLoad() {
    this.publishData.payload.title = 'This is title for demo';
    this.publishData.payload.description = `Description ${new Date().toLocaleString()}`;
    this.publishData.payload.longDescription = `Long description ${new Date().toLocaleString()}`;
  }

  inputChangeHandler(event) {
    const {name, value} = event.target;
    if(name === 'recipientAddresses' || name === 'type'){
      this.publishData[name] = (name === 'recipientAddresses') ? value.split(',') : value;
    } else {
      this.publishData.payload[name] = value;
    }
  }

  publishClickHandler = () => {
    if(this.publishData.recipientAddresses.length > 0){
      this.publishNotification.emit(this.publishData);
    }else{
      alert('Please add recipientAddresses and try again.')
    }
  }

  cancelClickHandler = () => {
    this.cancelNotification.emit();
  }

  render() {
    return (
      <div class={this.isVisible ? "wrapper visible" : "wrapper"}>
        <div class="modal">
          <div class="section">
          <div class='formfield'>
            <h3 class='sectionHeader'>Send message</h3>
          </div>
            <div class='formfield'>
              <label class="formLabel">Recipients :</label>
              <textarea name='recipientAddresses' onInput={(e) => this.inputChangeHandler(e)} />
            </div>
            <div class='formfield'>
              <label class="formLabel">Type:</label>
              <select name='type' onInput={(event) => this.inputChangeHandler(event)}>
                <option value="none" selected disabled hidden>Select type</option>
                <option value='ThermoFisher.Luna.Notification'>Luna Notification</option>
                <option value='ThermoFisher.Luna.ToastNotification'>Toast Notification</option>
              </select>
            </div>
            <div class="payloadSection">
              <div class='formfield'>
                <label class="formLabel">title:</label>
                <input name='title' class="formInput"type="text" value={this.publishData.payload.title} onInput={(e) => this.inputChangeHandler(e)} />
              </div>
              <div class='formfield'>
                <label class="formLabel">Description:</label>
                <textarea name='description' value={this.publishData.payload.description} onInput={(e) => this.inputChangeHandler(e)} />
              </div>
              <div class='formfield'>
                <label class="formLabel">Severity:</label>
                <select name='severity' onInput={(event) => this.inputChangeHandler(event)}>
                <option value="none" selected disabled hidden>Select severity</option>
                  <option value='Success'>Success</option>
                  <option value='Info'>Info</option>
                  <option value='Warning'>Warning</option>
                  <option value='Error'>Error</option>
                </select>
              </div>
              <div class='formfield'>
                <label class="formLabel">Priority:</label>
                <input name='priority' class="formInput"type="number" min='1' max='3' value={this.publishData.payload.priority} onInput={(e) => this.inputChangeHandler(e)} />
              </div>
              <div class='formfield'>
                <label class="formLabel">Description:</label>
                <textarea name='longDescription' value={this.publishData.payload.longDescription} onInput={(e) => this.inputChangeHandler(e)} />
              </div>
            </div>
            
          </div>
          <div class='section'>
              <div class="button-section">
                <button onClick={this.publishClickHandler}>Send</button>
                <button onClick={this.cancelClickHandler}>Cancel</button>
              </div>
            </div>
        </div>
      </div>
    );
  }
}


