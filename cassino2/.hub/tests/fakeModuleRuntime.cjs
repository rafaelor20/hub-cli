const path = require("path");
const fs = require("fs");
const Babel = require("@babel/standalone");
const transformCommonjs = require("@babel/plugin-transform-modules-commonjs");
const presetEnv = require("@babel/preset-env");

Babel.registerPlugin("commonjs", transformCommonjs);
Babel.registerPreset("@babel/preset-env", presetEnv);

function insertFakeModuleRuntime(file) {
  const basePath = path.join(__dirname, "..", "..")
  const original = fs.readFileSync(path.join(basePath, file));
  const transpiled = transpile(original);
  
  return `
    const __actualRequire__ = module.require.bind(module);
    const __fakeModuleRuntime__ = __actualRequire__("./.hub/tests/fakeModuleRuntime.cjs");

    const __fakeModule__ = {
      check(filename) {
        let isFakeModule = false;

        try {
          const fs = __actualRequire__("fs");
          const path = __actualRequire__("path");
  
          if (fs.existsSync(path.join("${__dirname}", "fake_modules", filename))) {
            isFakeModule = true;
          }
        } catch {
          isFakeModule = false;
        }
  
        return isFakeModule;
      },

      require(filename) {
        const fs = __actualRequire__("fs");
        const path = __actualRequire__("path");
        const fullPath = path.join("${__dirname}", "fake_modules", filename, "index.js");
        const content = fs.readFileSync(fullPath).toString();
        const exports = {};
        const exportedModule = { exports };
        const transpiled = __fakeModuleRuntime__.transpile(content);

        eval(\`
          (function (module, exports) {
            \${transpiled}
          })(exportedModule, exports);
        \`);

        return exportedModule.exports;
      }
    };

    const __requireTranspiledWithRuntime__ = (filename) => {
      const fs = __actualRequire__("fs");
      const path = __actualRequire__("path");
      const content = fs.readFileSync(filename).toString();
      const exports = {};
      const exportedModule = { exports };

      eval(\`
        (function (module, exports) {
          eval(__fakeModuleRuntime__.transpile(\\\`\${content}\\\`))
        })(exportedModule, exports);
      \`);

      return exportedModule.exports;
    };

    module.require = (filename) => {
      const path = __actualRequire__("path");
      if (__fakeModule__.check(filename)) {
        return __fakeModule__.require(filename);
      } else if (filename.indexOf("./") === 0 || filename.indexOf("/") === 0) {
        return __requireTranspiledWithRuntime__(path.join("${__dirname}", "..", "..", filename));
      } else {
        return __actualRequire__(filename);
      }
    };

    ${transpiled}
  `;
}

function transpile(code) {
  return Babel.transform(code, { presets: ["@babel/preset-env"], plugins: ["commonjs"] }).code;
}

module.exports = {
  insertFakeModuleRuntime,
  transpile
};
