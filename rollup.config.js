import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/awaited.js'
    },
    plugins: [
      vue()
    ]
  },
  {
    input: 'example/index.js',
    output: {
      format: 'umd',
      file: 'docs/bundle.js'
    },
    plugins: [
      resolve(),
      commonjs(),
      vue(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  }
]
