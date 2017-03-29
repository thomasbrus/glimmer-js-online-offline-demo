import Component, { tracked } from '@glimmer/component';

export default class ConnectionStatus extends Component {
  @tracked connected: boolean = window.navigator.onLine;

  onlineEventHandler: (e) => void = this.goOnline.bind(this);
  offlineEventHandler: (e) => void = this.goOffline.bind(this);

  didInsertElement() {
    window.addEventListener('online', this.onlineEventHandler);
    window.addEventListener('offline', this.offlineEventHandler);
  }

  willDestroy() {
    window.removeEventListener('online', this.onlineEventHandler);
    window.removeEventListener('offline', this.offlineEventHandler);
  }

  goOnline() {
    this.connected = true;
  }

  goOffline() {
    this.connected = false;
  }
};
