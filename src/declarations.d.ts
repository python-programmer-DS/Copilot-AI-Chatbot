declare module 'botframework-directlinejs' {
  export class DirectLine {
    constructor(options: any);
    postActivity(activity: any): any;
    activity$: any;
  }
}