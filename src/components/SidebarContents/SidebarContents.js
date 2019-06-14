import React, { Component } from 'react'
import { StaticQuery, Link } from 'gatsby'
import { connect } from 'react-redux'
import { getSidebarState } from '../../store/selectors'
import { onSetSidebarOpen } from '../../actions/layout'
import Menu from 'antd/lib/menu'
import './SidebarContents.css'
import { configurationOfType } from '../../../gatsby/utils'

import {
  convertToTree,
  getMarkdownDocNodes,
  getSelectedKeys,
  SidebarContentQuery,
} from './DataHelper'

const SubMenu = Menu.SubMenu

class SidebarContents extends Component {
  onSetSidebarOpen = () => {
    this.props.onSetSidebarOpen(false)
  }

  renderSubMenu = item => {
    return (
      <SubMenu
        key={item.key}
        title={<span style={{ fontWeight: 900 }}>{item.title}</span>}
      >
        {this.renderMenu(item.children)}
      </SubMenu>
    )
  }

  renderSubMenuItem = item => {
    const { pathname } = this.props
    if (typeof pathname !== 'undefined' && pathname.includes(item.path)) {
      return <Menu.Item key={item.key}>{item.title}</Menu.Item>
    }
    return (
      <Menu.Item key={item.key}>
        <Link to={item.path} onClick={this.onSetSidebarOpen}>
          {item.title}
        </Link>
      </Menu.Item>
    )
  }

  renderMenu = data => {
    const newData = data.sort((a, b) => a.prio - b.prio)
    return newData.map(item => {
      if (item.children) {
        return this.renderSubMenu(item)
      }
      return this.renderSubMenuItem(item)
    })
  }

  render() {
    const { expandedKey } = this.props.sidebar
    const { root, pathname } = this.props
    return (
      <StaticQuery
        query={SidebarContentQuery}
        render={data => {
          const markdownDocNodes = getMarkdownDocNodes(data, root)
          const apiNodes = configurationOfType(data.allJson, 'api')
          const [tree, dir] = convertToTree(markdownDocNodes, apiNodes)
          const selectedKeys = getSelectedKeys(pathname, data, expandedKey)
          const defaultOpenKeys = dir.map(item => item.key)

          return (
            <Menu
              mode="inline"
              defaultOpenKeys={defaultOpenKeys}
              selectedKeys={selectedKeys}
              inlineIndent={12}
            >
              {this.renderMenu(tree)}
            </Menu>
          )
        }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    sidebar: getSidebarState(state),
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContents)
