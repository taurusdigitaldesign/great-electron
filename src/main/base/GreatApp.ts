import { app } from 'electron';

class GreatApp {
  static instance: any = app;

  constructor() {
    return GreatApp.instance;
  }

  static getInstance() {
    return GreatApp.instance;
  }
}

export default GreatApp;
