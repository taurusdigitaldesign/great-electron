import GreatWindow from '../GreatWindow';
interface IGreatPlugin {
  // 生命周期：APP启动时
  create: (mainWin: GreatWindow) => void;

  // 生命周期：APP退出时
  willDestroy: (app: any, mainWin: GreatWindow) => void;
}

export default IGreatPlugin;
