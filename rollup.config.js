// import vue from 'rollup-plugin-vue'
// import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
// import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'src/main.js',
    output: [
      {
        format: 'es',
        file: 'dist/index.es.js',
        exports: 'named'
      },
      {
        format: 'cjs',
        file: 'dist/index.cjs.js',
        exports: 'named'
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
                node: 8,
                ie: 11
              }
            }
          ]
        ]
      })
    ]
  }
]
