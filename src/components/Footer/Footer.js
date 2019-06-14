import React, { Component } from 'react'
import './Footer.css'
import LinkItem from '../common/LinkItem'

const SpacedSpan = ({ children }) => {
  return (
    <React.Fragment>
      &nbsp;
      <span>{children}</span>
      &nbsp;
    </React.Fragment>
  )
}

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <small>
            <SpacedSpan>© {new Date().getFullYear()}</SpacedSpan>
            <SpacedSpan>-</SpacedSpan>
            <SpacedSpan>Open Payments Europe AB</SpacedSpan>
            <SpacedSpan>-</SpacedSpan>
            <SpacedSpan>
              <LinkItem href="https://auth.sandbox.openbankingplatform.com/client/privacy">
                Privacy
              </LinkItem>
            </SpacedSpan>
            <SpacedSpan>-</SpacedSpan>
            <SpacedSpan>
              <LinkItem href="https://auth.sandbox.openbankingplatform.com/client/cookies">
                About Cookies
              </LinkItem>
            </SpacedSpan>
          </small>
        </div>
      </footer>
    )
  }
}

export default Footer
