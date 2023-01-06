class Chalk {
  constructor() {
    this._red = false;
    this._green = false;
    this._blue = false;
  }

  print(str) {
    const colors = [];
    let print = "";

    if (this._red) colors.push("RED");
    if (this._green) colors.push("GREEN");
    if (this._blue) colors.push("BLUE");

    for (let i = 0; i < colors.length; i++) {
      print += "[" + colors[i] + "]";
    }

    print += str;

    for (let i = colors.length - 1; i >= 0; i--) {
      print += "[/" + colors[i] + "]";
    }

    this._red = false;
    this._green = false;
    this._blue = false;

    return print;
  }
}

const chalk = new Chalk();
const proxy = new Proxy(chalk, {
  get(target, name) {
    if (["red", "green", "blue"].indexOf(name) > -1) {
      const _name = "_" + name;
      target[_name] = true;

      const fn = function(text) {
        return chalk.print(text);
      };

      return new Proxy(fn, {
        get(target, name) {
          return proxy[name];
        }
      });
    } else if (name === "print") {
      return target.print();
    }
  }
});

export default proxy;
