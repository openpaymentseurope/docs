import React from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import { Link } from "gatsby"

const IndexPage = ({data}) => {
  return (
    <Layout pathname="/">
      <section id="intro-section" style={{
        background: "url('" + data.file.childImageSharp.fluid.src + "') no-repeat center center",
        backgroundSize: 'cover',
        height: '100%',
        margin: '0 auto'
      }}>
      <div>
          <div align="center" style={{
            paddingTop: '100px'
          }}>
              <h2 style={{color: 'white'}}>Preview Sandbox API Portal</h2>
              <h1 style={{color: "white", fontWeight: 'bold'}}>
                Open Payments Platform
              </h1>
              <p className="largerwhitetext">
                Open Payments Platform is a PSD2 compliant API aggregation platform that offers a single, open and secure point of access
                to the diverse bank API networks throughout Europe.
              </p>
              <p className="largerwhitetext">
                Open Payments Platform simplifies integration of third party application providers with a single, open and secure API.
              </p>
              <br/>
              <Link to="/docs/get-started/introduction">
                <Button className="btn btn-primary">Get Started</Button>
              </Link>
          </div>
      </div>
      </section>

      {/* <div className="container">
      <img src={data.file.childImageSharp.fluid.src} />
      <h1>Open Payments Europe</h1>
      <p className="text-muted">Open Payments Europe provides the groundbreaking market infrastructure required for successful Open Banking.</p>
      <div>
        <a color="accent" href="https://openpayments.io" target="_blank" className="btn btn-primary">
          Go to Open Payments Europe corporate website
          </a>
      </div> 
    </div>*/}
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    file(name: { eq: "home-bg" }) {
      childImageSharp {
        fluid(maxHeight: 648) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
// export const pageQuery2 = graphql`
//   query {
//     logo: file(name: { eq: "logo" }) {
//       childImageSharp {
//         fluid(maxWidth:100) {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//   }
// `

export default IndexPage
