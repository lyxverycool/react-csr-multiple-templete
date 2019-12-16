/**
 * 创建容器
 */
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

const cwd = process.cwd()
const ContainerName = process.argv[2]

if (ContainerName) {
  if (/^[A-Z][a-zA-Z0-9-]*$/.test(ContainerName)) {
    createContainer(ContainerName)
      .then(res => {
        console.log('容器文件创建成功')
      })
      .catch(err => {
        console.error(err)
      })
  } else {
    console.error('容器名称必须大写字母开头')
  }
} else {
  console.error('请添加容器名称，以大写字母开头 例如： npm run ctc Test')
}

/**
 * 创建文件夹
 * @param  {string}   dirName [文件夹路径]
 * @return {Promise}
 */
function mkdir(dirName) {
  return new Promise((resolve, reject) => {
    fs.exists(dirName, exists => {
      if (exists) {
        reject('创建失败，文件夹已存在')
      } else {
        fse
          .ensureDir(dirName)
          .then(() => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  })
}

/**
 * 创建容器文件
 * @param  {string} ContainerName 容器名称
 * @return {Promise}
 */
function createContainer(ContainerName) {
  const _root = path.join(cwd, 'src', 'container', ContainerName)
  const containerTemp = getContainerTemp(ContainerName)
  const styleTemp = getStyleTemp(ContainerName)
  const renderTemp = getRenderTemp()
  return mkdir(_root)
    .then(() => fse.outputFile(path.join(_root, 'index.js'), containerTemp))
    .then(() => fse.outputFile(path.join(_root, 'render.js'), renderTemp))
    .then(() => fse.outputFile(path.join(_root, 'style.less'), styleTemp))
}

function getContainerTemp(ContainerName) {
  const _cn = ContainerName.toLocaleLowerCase()
  return `import React, { Component } from 'react'
import '../../less/normal.less'
import './style.less'

export default class ${ContainerName} extends Component {
  state={}

  componentDidMount() {}

  render() {
    return (
      <div className="${_cn}">
      </div>
    )
  }
}
	`
}

function getStyleTemp(ContainerName) {
  const _cn = ContainerName.toLocaleLowerCase()
  return `.${_cn} {}	`
}

function getRenderTemp() {
  return `import React from 'react'
import ReactDOM from 'react-dom'
import App from './index'

const app = document.getElementById('app')

const render = Component => {
  ReactDOM.render(<Component />, app)
}

render(App)`
}
