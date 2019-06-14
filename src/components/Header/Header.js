import React, { Component } from 'react'
import { Link } from 'gatsby'
import sizeMe from 'react-sizeme'
import { connect } from 'react-redux'
import { updateHeaderHeight } from '../../actions/layout'
import Logo from './Logo.js'
import CookieConsent from './CookieConsent'
import LinkItem from '../common/LinkItem'

class Header extends Component {
  componentDidUpdate = () => {
    this.props.updateHeaderHeight(this.props.size.height)
  }

  renderLogo = () => {
    if (window.location.pathname === '/') {
      return <Logo />
    } else {
      return (
        <Link to="/">
          <Logo />
        </Link>
      )
    }
  }

  render() {
    return (
      <div className="header">
        <CookieConsent />
        {this.renderLogo()}
        <LinkItem className="register" href="/obp.postman_collection.json">
          Download Postman Collection
        </LinkItem>
        <LinkItem
          className="register"
          href="https://auth.sandbox.openbankingplatform.com/client/register"
        >
          Register a client
        </LinkItem>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateHeaderHeight,
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(sizeMe({ monitorHeight: true })(Header))
