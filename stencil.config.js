exports.config = {
  namespace: 'performance-to-video',
  globalStyle: 'src/global/style.css',
  outputTargets: [
    { type: 'dist' },
    {
      type: 'www',
      resourcesUrl: '/perf2video/build/performance-to-video',
    },
  ],
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
};
