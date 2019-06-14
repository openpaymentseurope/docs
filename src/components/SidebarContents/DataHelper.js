import { pathPrefix } from '../../../gatsby-config'

export const SidebarContentQuery = graphql`
  query sidebarContentQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [fields___slug] }) {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            prio
            parents
          }
        }
      }
    }

    allJson {
      edges {
        node {
          name
          link
          type
          prio
        }
      }
    }
  }
`

export const getMarkdownDocNodes = (data, root) => {
  return data.allMarkdownRemark.edges
    .filter(node => node.node.fields.slug.startsWith(root))
    .filter(node => node.node.frontmatter.parents[0] !== 'Orphaned')
}

export const getSelectedKeys = (pathname, data, expandedKey) => {
  const path =
    typeof pathname !== 'undefined'
      ? pathname.replace(pathPrefix.slice(0, -1), '')
      : ''

  return data.allMarkdownRemark.edges.filter(
    item =>
      path === item.node.fields.slug ||
      (path.slice(0, -1) === item.node.fields.slug && path.slice(-1) === '/')
  ).length > 0
    ? [expandedKey]
    : []
}

export const convertToTree = (markdownData, apiData) => {
  const markdownItems = markdownData.map(edge => {
    return {
      path: edge.node.fields.slug,
      key: edge.node.id,
      title: edge.node.frontmatter.title,
      prio: edge.node.frontmatter.prio,
      parents: edge.node.frontmatter.parents,
    }
  })

  const apiMenuItems = apiData.map(oneApi => {
    return {
      path: '/api/' + oneApi.name.toLowerCase(),
      key: oneApi.name,
      title: oneApi.name,
      prio: oneApi.prio,
      parents: ['API'],
    }
  })
  markdownItems.push(...apiMenuItems)
  return constructTree(markdownItems)
}

export const constructTree = list => {
  let tree = []
  let dir = []
  list.forEach(item => {
    if (item.parents === [] || item.parents === null) {
      tree.push(item)
    } else {
      let subtree = tree

      item.parents.forEach(parent => {
        if (
          subtree.filter(node => node.title === parent && node.children)
            .length === 0
        ) {
          const title = parent

          const newNode = {
            key: 'tree/' + title,
            title: title,
            children: [],
            prio: title === 'API' ? 1 : 0,
          }
          subtree.push(newNode)
          dir.push(newNode)
        }
        subtree = subtree.find(node => node.title === parent && node.children)
          .children
      })
      subtree.push(item)
    }
  })

  return [tree, dir]
}

export const sortTree = tree => {
  return tree.sort((a, b) => {
    if ((a.children && b.children) || (!a.children && !b.children)) {
      if (a.prio === b.prio) {
        return a.title < b.title
      } else return a.prio > b.prio
    } else if (a.children) {
      return -1
    }
    return -1
  })
}
