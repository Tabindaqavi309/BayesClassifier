const xlsxFile = require("read-excel-file/node");
var Features = [];
var UpdatedFeatures = [];
var ScaledFeatures = [];
function transpose(a) {
  // Calculate the width and height of the Array
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if (h === 0 || w === 0) {
    return [];
  }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i,
    j,
    t = [];

  // Loop through every item in the outer array (height)
  for (i = 0; i < h; i++) {
    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for (j = 0; j < w; j++) {
      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
}
function FeatureScaling(Feature) {
  console.log("hi");
  var Temp = [];
  Feature.splice(0, 1);
  //   var max = Feature.reduce(function (a, b) {
  //     return Math.max(a, b);
  //   });

  console.log(Features.indexOf(max));
  console.log("this is max" + max);
  var min = Feature.reduce(function (a, b) {
    return Math.min(a, b);
  });
  console.log("this is min" + min);
  for (i = 0; i < Feature.length; i++) {
    Temp[i] = (Feature[i] - min) / (max - min);
  }
  return Temp;
}
xlsxFile("./parktraining.xlsx")
  .then((rows) => {
    // console.log(rows);
    // console.table(rows);
    rows.forEach((col) => {
      Features.push(col);
    });
  })
  .catch((err) => {
    console.log(err);
  });
setTimeout(() => {
  UpdatedFeatures = transpose(Features);
  console.log(UpdatedFeatures[0]);
  //   for (i = 0; i < UpdatedFeatures.length; i++) {
  //     ScaledFeatures[i] = FeatureScaling(UpdatedFeatures[i]);
  //     console.log(i + "jello");
  //   }
  var k = 0;
  while (k < UpdatedFeatures.length) {
    k++;
    ScaledFeatures[k] = FeatureScaling(UpdatedFeatures[k]);
    //console.log(ScaledFeatures[k]);
  }
  // co'nsole.log(ScaledFeatures);
}, 2000);
