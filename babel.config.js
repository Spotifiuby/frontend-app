module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv',
      ['@babel/plugin-proposal-private-methods', { loose: true }]],
  };
};
