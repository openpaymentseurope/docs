/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Legal</h5>
            <a href="https://openpayments.io/terms-conditions" target="_blank">
              Terms &amp; Condition
            </a>
            <a href="https://openpayments.io/privacy-policy" target="_blank">
              Privacy Policy
            </a>
          </div>
          <div>
            <h5>About</h5>
            <a href="https://openpayments.io" target="_blank">
              Open Payments Europe
            </a>
            <a href="https://developer.openpayments.io" target="_blank">
              Developer Portal
            </a>
            <a
              href="https://stackoverflow.com/questions/tagged/"
              target="_blank"
              rel="noreferrer noopener">
              Stack Overflow
            </a>
          </div>
          <div>
            <h5>Support</h5>
            <a href={`${this.props.config.baseUrl}blog`}>News Blog</a>
            <a href="mailto:support@openpayments.io">support@openpayments.io</a>
            <a href="https://github.com/openpaymentseurope/docs">GitHub</a>
          </div>
        </section>
        <section className="social">
          <ul>
            <li><a target="_blank" href="https://www.facebook.com/openpayments"><i className="fab fa-facebook"></i> </a></li>
            <li><a target="_blank" href="https://www.instagram.com/openpayments"><i className="fab fa-instagram"></i> </a></li>
            <li><a target="_blank" href="https://www.linkedin.com/company/openpayments"><i className="fab fa-linkedin"></i> </a></li>
            <li><a target="_blank" href="http://twitter.com/openpaymentseu"><i className="fab fa-twitter"></i></a></li>
          </ul>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
