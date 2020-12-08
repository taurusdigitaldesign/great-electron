import GreatApp from '../GreatApp';
interface IGreatPlugin {
  // 生命周期：APP启动时
  create: (app: GreatApp) => void;

  // 生命周期：APP退出时
  willDestroy: (app: GreatApp) => void;
}

export default IGreatPlugin;
