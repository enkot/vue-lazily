import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import buble from '@rollup/plugin-buble'

import packageConfig from './package.json'

export default [
  {
    input: 'src/index.js',
    output: {
      file: `dist/index.js`,
      format: 'cjs',
      name: packageConfig.name,
      exports: 'named',
      banner:
        `/* ${packageConfig.name} v${packageConfig.version} ` +
        '| (c) Taras Batenkov and contributors ' +
        `| https://github.com/enkot/${packageConfig.name}/blob/master/LICENSE ` +
        '*/'
    },
    plugins: [commonjs(), resolve(), buble()]
  }
]
