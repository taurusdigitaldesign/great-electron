const path = require("path");
const Bundler = require("parcel-bundler");

const buildMain = async () => {
  const main = path.join(__dirname, "../src/main/index.ts");
  const options = {
    outDir: "./dist/main/",
    target: "electron",
    sourceMaps: false,
    // minify: true,
    detailedReport: true,
  };

  const bundler = new Bundler(main, options);
  await bundler.bundle();
  process.exit(0);
};

buildMain();
