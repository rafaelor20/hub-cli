
    const __actualRequire__ = module.require.bind(module);
    const __fakeModuleRuntime__ = __actualRequire__("./.hub/tests/fakeModuleRuntime.cjs");

    const __fakeModule__ = {
      check(filename) {
        let isFakeModule = false;

        try {
          const fs = __actualRequire__("fs");
          const path = __actualRequire__("path");
  
          if (fs.existsSync(path.join("/home/rafael/Documentos/Projetos/hub-cli/cassino2/.hub/tests", "fake_modules", filename))) {
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
        const fullPath = path.join("/home/rafael/Documentos/Projetos/hub-cli/cassino2/.hub/tests", "fake_modules", filename, "index.js");
        const content = fs.readFileSync(fullPath).toString();
        const exports = {};
        const exportedModule = { exports };
        const transpiled = __fakeModuleRuntime__.transpile(content);

        eval(`
          (function (module, exports) {
            ${transpiled}
          })(exportedModule, exports);
        `);

        return exportedModule.exports;
      }
    };

    const __requireTranspiledWithRuntime__ = (filename) => {
      const fs = __actualRequire__("fs");
      const path = __actualRequire__("path");
      const content = fs.readFileSync(filename).toString();
      const exports = {};
      const exportedModule = { exports };

      eval(`
        (function (module, exports) {
          eval(__fakeModuleRuntime__.transpile(\`${content}\`))
        })(exportedModule, exports);
      `);

      return exportedModule.exports;
    };

    module.require = (filename) => {
      const path = __actualRequire__("path");
      if (__fakeModule__.check(filename)) {
        return __fakeModule__.require(filename);
      } else if (filename.indexOf("./") === 0 || filename.indexOf("/") === 0) {
        return __requireTranspiledWithRuntime__(path.join("/home/rafael/Documentos/Projetos/hub-cli/cassino2/.hub/tests", "..", "..", filename));
      } else {
        return __actualRequire__(filename);
      }
    };

    "use strict";

var _randomNumber = _interopRequireDefault(require("./randomNumber.js"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Seu lindo código aqui :)
var luckNumber = (0, _randomNumber["default"])(2, 12);
console.log("Seu n\xFAmero da sorte \xE9: ".concat(luckNumber));
console.log("Jogando dados...");
setTimeout(function () {
  var firstNumber = (0, _randomNumber["default"])(1, 6);
  var secondNumber = (0, _randomNumber["default"])(1, 6);

  if (firstNumber === secondNumber || firstNumber + secondNumber === luckNumber) {
    console.log(_chalk["default"].green("Você ganhou!"));
  } else {
    console.log(_chalk["default"].red("Você perdeu"));
  }
}, 2000);
  