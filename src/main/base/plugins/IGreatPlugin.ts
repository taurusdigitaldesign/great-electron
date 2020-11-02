import GreatWindow from '../GreatWindow';
interface IGreatPlugin {
  // 生命周期：APP启动时
  create: (win: GreatWindow) => void;

  // 生命周期：APP退出时
  willDestroy: () => void;
}

export default IGreatPlugin;
