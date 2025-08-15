module.exports = {
  default: {
    require: ['features/steps/**/*.js', 'features/support/**/*.js'],
    format: ['@cucumber/pretty-formatter'],
    paths: ['features/**/*.feature']
  }
};
