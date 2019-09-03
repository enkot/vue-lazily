import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/index.js'
    },
    plugins: [
      vue()
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
