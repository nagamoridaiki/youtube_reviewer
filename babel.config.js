module.exports = (api) => {
    const isProduction = api.env('production');
    api.cache(true);
    const presets = [
      [
        '@babel/preset-env',
        {
            targets: {
                chrome: '79',
            },
            useBuiltIns: 'entry',
            corejs: 3,
        },
      ],
      [
        '@babel/preset-react',
        {
          development: !isProduction,
        },
      ],
    ];
  
    const plugins = [
      [
        'babel-plugin-styled-components',
        isProduction
          ? {
            fileName: false,
            displayName: false,
            pure: true,
          }
          : {
            minify: false,
          },
      ],
    ];
  
    return {
      presets,
      plugins,
    };
  };
  