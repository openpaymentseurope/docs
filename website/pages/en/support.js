/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Learn more using the [documentation on this site.](${docUrl(
        'introduction.html',
      )})`,
      title: 'Browse Docs',
    },
    {
      content: 'File an issue at our [GitHub repository](https://github.com/openpaymentseurope/docs/issues) or join the discussion!',
      title: 'Join the community',
    },
    {
      content: "If you can't find any solution to your problem, [open a support case](mailto:support@openpayments.io) with us!",
      title: "Open a Support Case",
    },
  ];
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>We've got your back! Create a developer account at our <a href="https://developer.openpayments.io" target="_blank">Developer Portal</a> and try any of the channels below to get the help you need!</p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
