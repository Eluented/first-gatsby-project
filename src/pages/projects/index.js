import React from 'react'
import Layout from '../../components/Layout'
import * as styles from '../../styles/projects.module.css'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image";
const Projects = ({ data }) => {
  const projects = data.projects.nodes
  const contact = data.contact.siteMetadata.contact
  console.log(data)
  return (
    <Layout>
      <div className={styles.portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & Websites I've Worked on</h3>
        <div className={styles.projects}>
          {projects.map(project => (
            <Link to={"/projects/" + project.frontmatter.slug} key={project.id}>
              <div>
                <GatsbyImage image={getImage(project.frontmatter.thumb.childImageSharp.gatsbyImageData)} alt="Banner" />
                <h3>{ project.frontmatter.title }</h3>
                <p>{ project.frontmatter.stack }</p>
              </div>
            </Link>
          ))}
        </div>
        <p>Like what you see? Email me at <strong>{ contact }</strong> to work together!</p>
      </div>
    </Layout>
  );
}
 
export default Projects

// export page query
export const query = graphql`
query ProjectPage {
  projects: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
      frontmatter {
          title
          stack
          slug
          thumb {
          childImageSharp {
              gatsbyImageData(
                  width: 400
                  height: 180
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
              )
          }
          }
      }
      id
      }
  }
  contact: site {
      siteMetadata {
      contact
      }
  }
}
`