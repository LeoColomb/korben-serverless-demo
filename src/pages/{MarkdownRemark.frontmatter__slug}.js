import React from "react"
import { graphql } from "gatsby"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const timeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: "4px"
}

const datetime = new Date().toUTCString()

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div style={pageStyles}>
      <div>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }}/>
        <p>Ce contenu a été compilé le{' '}
          <time style={timeStyles}>{new Date().toUTCString()}</time>
          .
        </p>
        <p>Ce contenu a été ajouté dynamiquement le{' '}
          <time id="worker-time" style={timeStyles}>N/A</time>{' '}
          par la fonction cloud.
        </p>
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
