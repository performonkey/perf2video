exports.config = {
  namespace: 'performance-to-video',
  globalStyle: 'src/global/style.css',
  outputTargets: [{ type: 'dist' }, { type: 'www' }],
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
};
