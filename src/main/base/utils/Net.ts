import { exec } from 'child_process';

class Net {
  // 获取网络延迟
  static ping(url) {
    const isWin = process.platform !== "darwin";

    return new Promise((resolve, reject) => {
      exec('ping ' + url + (isWin ? '' : ' -c 5'), (error, stdout, stderr) => {
        if (error) {
          reject();
        } else {
          const matchRes = isWin
            ? stdout.match(/(?<= = )\d+(?=ms)/g)[2]
            : stdout.match(/(?<= min\/avg\/max\/stddev = ).*(?= ms)/)[0].split('/')[1];
          console.info(matchRes);
          matchRes.length > 0 ? resolve(matchRes) : reject();
        }
      });
    });
  }
}

export default Net;
