const fs = require('fs');
const path = require('path');
const Bundler = require('parcel-bundler');

// 拷贝静态资源
const copyFolder = (from, to, direct) => {
  const copyFile = (from, to) => {
    fs.copyFileSync(from, to, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  };

  if (direct) {
    from = path.join(__dirname, from);
    to = path.join(__dirname, to);
  }

  !fs.existsSync(to) && fs.mkdirSync(to);

  const paths = fs.readdirSync(from);
  paths.forEach((item) => {
    const newFromPath = from + '/' + item;
    const newToPath = path.resolve(to + '/' + item);

    const stat = fs.statSync(newFromPath);
    stat.isFile() && copyFile(newFromPath, newToPath);
    stat.isDirectory() && copyFolder(newFromPath, newToPath, false);
  });
};

// 构建
const buildMain = async () => {
  const main = path.join(__dirname, '../src/main/index.ts');
  const options = {
    outDir: './dist/main/',
    target: 'electron',
    sourceMaps: false,
    // minify: true,
    detailedReport: true
  };

  const bundler = new Bundler(main, options);
  await bundler.bundle();
  // 框架自带
  copyFolder('../src/main/base/public', '../dist/main/public', true);
  // 项目
  copyFolder('../src/main/public', '../dist/main/public', true);
  process.exit(0);
};

buildMain();
