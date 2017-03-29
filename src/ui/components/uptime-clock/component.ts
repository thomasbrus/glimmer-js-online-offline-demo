import Component, { tracked } from '@glimmer/component';

function formatDigit(number: number): string {
  let padding = "00";
  let digits = number.toString();
  return padding.substring(0, padding.length - digits.length) + digits;
}

export default class UptimeClock extends Component {
  @tracked counter: number = 0;
  clock: number;

  onlineEventHandler: (e) => void = this.start.bind(this);
  offlineEventHandler: (e) => void = this.stop.bind(this);

  constructor(options) {
    super(options);
    if (window.navigator.onLine) { this.start(); }
  }

  didInsertElement() {
    window.addEventListener('online', this.onlineEventHandler);
    window.addEventListener('offline', this.offlineEventHandler);
  }

  willDestroy() {
    window.removeEventListener('online', this.onlineEventHandler);
    window.removeEventListener('offline', this.offlineEventHandler);
  }

  @tracked('counter')
  get seconds(): number {
    return this.counter % 60;
  }

  @tracked('counter')
  get minutes(): number {
    return Math.floor(this.counter / 60) % 60;
  }

  @tracked('counter')
  get hours(): number {
    return Math.floor(this.counter / 60 / 60) % 24;
  }

  @tracked('seconds')
  get formattedSeconds(): string {
    return formatDigit(this.seconds);
  }

  @tracked('minutes')
  get formattedMinutes(): string {
    return formatDigit(this.minutes);
  }

  @tracked('hours')
  get formattedHours(): string {
    return formatDigit(this.hours);
  }

  tick() {
    this.counter = this.counter + 1;
  }

  start() {
    this.reset();
    this.clock = window.setInterval(this.tick.bind(this), 1000);
  }

  stop() {
    window.clearInterval(this.clock);
  }

  reset() {
    this.counter = 0;
  }
};
