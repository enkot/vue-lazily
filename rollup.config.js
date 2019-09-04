import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/index.js',
      exports: 'named'
    },
    plugins: [
      vue({ template: { optimizeSSR: true } })
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
