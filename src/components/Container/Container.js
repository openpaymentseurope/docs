import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHeaderHeightState } from '../../store/selectors'

class Container extends Component {
  render() {
    const {
      sidebarDocked,
      backgroundColor = 'white',
      width = '100%',
    } = this.props

    return (
      <div
        className="main-content"
        style={{
          overflow: !sidebarDocked ? 'auto' : 'visible',
          width: width,
          height: 'auto',
        }}
      >
        <div
          className="main-content-container"
          style={{
            margin: '0 auto',
            paddingTop: 0,
            backgroundColor: backgroundColor,
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    headerHeight: getHeaderHeightState(state),
  }
}

export default connect(mapStateToProps)(Container)
