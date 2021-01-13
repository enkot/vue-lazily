import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'es',
        file: 'dist/index.es.js',
        exports: 'default'
      },
      {
        format: 'cjs',
        file: 'dist/index.cjs.js',
        exports: 'default'
      }
    ],
    plugins: [
      babel({
        babelrc: false,
        runtimeHelpers: true,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                node: 10
              }
            }
          ]
        ]
      })
    ]
  }
]
