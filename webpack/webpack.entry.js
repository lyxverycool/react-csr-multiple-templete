const path = require('path')
const glob = require('glob')

const getEntrys = () => {
  // 获取container下的所有文件目录
  let globPath = 'src/container/**/index.js'
  let files = glob.sync(globPath)
  let containers = []
  for (let i = 0; i < files.length; i++) {
    const direname = path.dirname(files[i])
    containers.push(direname.replace('src/container/', ''))
  }
  return containers
}

module.exports = getEntrys

