module.exports = {
  presets: [ // for babel cn suport others langages
    "@babel/env",//ES6 
    "@babel/react",// React/JSX 
    "@babel/preset-typescript" // typescript 
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    /*['module-name-mapper',
      {
        moduleNameMapper: {
          "\\.(css|less)$": "identity-obj-proxy"
        }
      }]*/
  ],
  env: {
    dev: {
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "transform-decorators-legacy",
        "transform-class-properties" //Plugin babel pour prendre en compte les propriétés de classe
      ]
    },
    build: {
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "transform-decorators-legacy",
        "transform-class-properties"
      ]
    },
    production: {
      presets: [
        [
          "minify", // why add minify here, we run uglify over the whole code bundles
          {
            mangle: false,
            evaluate: false
          }
        ]
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
      ],
      comments: false,
      compact: true,
      minified: true
    }
  }
};
