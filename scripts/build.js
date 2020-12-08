const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');
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

// 编译Native
const buildNaitve = () => {
  const dist = path.join(__dirname, '../dist/render/lib.wasm');
  const src = path.join(__dirname, '../src/native/lib.go');
  exec(`set GOOS=js&&set GOARCH=wasm&&go build -o ${dist} ${src}`);
};

// 构建Main
const buildMain = async () => {
  const entries = [
    path.join(__dirname, '../src/main/index.ts'),
    path.join(__dirname, '../src/main/service/index.ts')
  ];

  // build main
  let options = {
    outDir: './dist/main/',
    target: 'electron',
    sourceMaps: false,
    // minify: true,
    detailedReport: true
  };
  let bundler = new Bundler(entries[0], options);
  await bundler.bundle();

  // build service
  options = {
    ...options,
    outDir: './dist/main/public/preload/',
    outFile: 'service.js',
    target: 'node'
  };
  bundler = new Bundler(entries[1], options);
  await bundler.bundle();

  // 框架自带的public和项目中的public
  copyFolder('../src/main/base/public', '../dist/main/public', true);
  copyFolder('../src/main/public', '../dist/main/public', true);
  copyFolder('../src/main/libs', '../dist/main/libs', true);
};

// 构建Render
const buildRender = () => {
  copyFolder('../src/render', '../dist/render', true);
};

(async () => {
  // buildNaitve();
  await buildMain();
  buildRender();
  process.exit(0);
})();
