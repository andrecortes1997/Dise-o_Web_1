export const useColors = () => {
  const getColors = labels => {
    let colors = [];
    for (let i = 0; i < labels.length; i++) {
      colors.push(random_rgba());
    }
    return colors;
  };

  const random_rgba = () => {
    var o = Math.round, r = Math.random, s = 255;
    var x = Math.round, y = Math.random, z = 255;
    const randomCC = o(r() * s);
    const randomCC2 = x(y() * z);
    //return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';

    if ((randomCC > 0 && randomCC < 125) && (randomCC2 > 180 && randomCC2 < 230)) {
      return `rgba(${randomCC},${randomCC2},255,1)`;
    } else {
      return random_rgba();
    }
  };

  return { getColors };
};
