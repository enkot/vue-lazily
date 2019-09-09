import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.js',
    output: [
      {
        format: 'es',
        file: 'dist/index.es.js',
        exports: 'named',
      },
      {
        format: 'cjs',
        file: 'dist/index.cjs.js',
        exports: 'named'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/preset-env', 
            {
              modules: 'false',
              useBuiltIns: 'usage',
              corejs: '3.0.0',
              targets: {
                ie: 11,
                browsers: 'last 2 versions',
                node: 8
              },
            }
          ]
        ]
      }),
      terser()
    ]
  },
  {
    input: 'example/index.js',
    output: [
      {
        format: 'es',
        dir: 'docs/'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      vue(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  },
]
