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
    recepients:['user_ccab3985-756a-4b47-a321-5815837ef718'],
    type: 'ThermoFisher.Luna.Notification',
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
    if(name === 'recipients' || name === 'type'){
      this.publishData[name] = (name === 'recipients') ? value.split(',') : value;
    } else {
      this.publishData.payload[name] = value;
    }
  }

  publishClickHandler = () => {
    this.publishNotification.emit(this.publishData);
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
              <label class="formLabel">Receipients:</label>
              <textarea name='recipients' value={this.publishData.recepients[0]} onInput={(e) => this.inputChangeHandler(e)} />
            </div>
            <div class='formfield'>
              <label class="formLabel">Type:</label>
              <select name='type' onInput={(event) => this.inputChangeHandler(event)}>
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


