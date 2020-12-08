import http from 'http';
import { platform } from 'os';
import { exec } from 'child_process';
import ping from 'ping';

const isWin = platform().startsWith('win');

class Net {
  // 执行ping指令，可获取网络延迟和丢包率
  static ping(hosts: Array<String>) {
    const datas = [];
    hosts.forEach(async (host) => {
      const res = await ping.promise.probe(host);
      datas.push(res);
    });

    return datas;
  }

  // 获取出口IP
  static getExternalIP(): Promise<String> {
    return new Promise((resolve, reject) => {
      const url = 'http://myexternalip.com/raw';
      http.get(url, (r) => {
        r.setEncoding('utf8');
        r.on('data', (res) => resolve(res));
      });
    });
  }

  // 获取网络流量数据
  // Mac_Rx:  netstat -bi | grep -v Ibytes | awk '{ x += $7 } END { print x }'
  // Mac_Tx:  netstat -bi | grep -v Obytes | awk '{ x += $10 } END { print x }'
  // Win_Rx_Tx: netstat -e
  static getRxTx(): Promise<Array<String>> {
    // 获取Mac平台下行
    const getMacRx = (): Promise<String> => {
      return new Promise((resolve, reject) => {
        exec(
          `netstat -bi | grep -v Ibytes | awk '{ x += $7 } END { print x }'`,
          (error, stdout, stderr) => (error ? reject(error) : resolve(stdout))
        );
      });
    };

    // 获取Mac平台上行
    const getMacTx = (): Promise<String> => {
      return new Promise((resolve, reject) => {
        exec(
          `netstat -bi | grep -v Obytes | awk '{ x += $10 } END { print x }'`,
          (error, stdout, stderr) => (error ? reject(error) : resolve(stdout))
        );
      });
    };

    // 获取Win平台上下行
    const getWinRxTx = (): Promise<Array<String>> => {
      return new Promise((resolve, reject) => {
        exec(`netstat -e`, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            let data = stdout.split('\n');
            data = data[4]
              .split(' ')
              .slice(1)
              .filter((item) => item.length != 0);
            resolve(data);
          }
        });
      });
    };

    if (isWin) {
      return getWinRxTx();
    } else {
      return Promise.all([getMacRx(), getMacTx()]);
    }
  }
}

export default Net;
