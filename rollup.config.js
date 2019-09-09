import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'

const plugins = [
  vue({ template: { optimizeSSR: true } }),
  babel({
    babelrc: false,
    presets: [
      ['@babel/preset-env', {
        targets: {
          ie: '11'
        }
      }]
    ]
  })
]

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'es',
      file: 'dist/index.es.js',
      exports: 'named'
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/index.cjs.js',
      exports: 'named'
    },
    plugins
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
