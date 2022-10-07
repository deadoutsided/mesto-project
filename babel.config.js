const presets = [
  ['@babel/preset-env', {
    targets: {
      edge: '17',
      chrome: '64',
      ie: '11',
      firefox: '50',
      safari: '11.1'
    },
    useBuiltIns: "entry"
  }]
];

module.exports = {presets};
