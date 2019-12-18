import loadable from '@loadable/component'

const Main = loadable(() => import('../container/Main/index'))
const List = loadable(() => import('../container/List/index'))
const Test = loadable(() => import('../container/Test/index'))

export default [{
  path: ['/', '/index'],
  exact: true,
  component: Main,
},
{
  path: '/list',
  exact: true,
  component: List,
},
{
  path: '/test',
  exact: true,
  component: Test,
}]
