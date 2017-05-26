module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  extends: [
    'kentcdodds/best-practices',
    'kentcdodds/possible-errors'
  ],
  rules: {
    curly: ['error', 'multi-line'],
    'vars-on-top': 0
  }
};
