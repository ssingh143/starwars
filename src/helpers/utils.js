import { alertConstants } from "../constants/alert.constants";

const sort = (prop, arr) => {
  prop = prop.split(".");
  let len = prop.length;

  arr.sort(function(a, b) {
    let i = 0;
    while (i < len) {
      a = parseInt(a[prop[i]], 10);
      b = parseInt(b[prop[i]], 10);
      i++;
    }
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
};

const populationWithFontSize = obj => {
  return obj.map((elm, index) => {
    let fontSize;
    if (index === 0) {
      fontSize = alertConstants.BASEFONT + 4;
    } else {
      if (elm.population === "unknown") {
        fontSize = alertConstants.BASEFONT;
      } else if (obj[index].population === obj[index - 1].population) {
        fontSize = obj[index - 1].fontSize;
      } else {
        fontSize = obj[index - 1].fontSize + 4;
      }
    }
    elm.fontSize = fontSize;
    return elm;
  });
};

export const utils = {
  sort,
  populationWithFontSize
};
