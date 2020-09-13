import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { Layout } from 'antd'

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/main.css'

import { StoreContext } from '~/context/StoreContext'

import Logo from '../../../resources/icons/logo.png'
import CrumpledBackground from '../../../resources/backgrounds/crumpled-white-paper.jpg'
import ResponsiveNavBar from '~/components/Navigation/ResponsiveNavBar'

const { Header, Footer, Sider, Content } = Layout

let links = [
  {
  'title': 'ABOUT',
  'link': '/#about'
},
{
  'title': 'SHOP',
  'link': '/#store'
},
{
  'title': 'CART',
  'link': '/cart',
  'badge': true
}];



const MainLayout = ({ children }) => {
  const { store: { checkout: { lineItems } } } = useContext(StoreContext)
  return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <Layout>
               <ResponsiveNavBar links ={ links } count={ lineItems.reduce((accum, prev) => ( accum + prev.quantity), 0) }/>
                <Content style={{ background:`url(${CrumpledBackground})` }}>
                    {children}
                  </Content>
            </Layout>
        )}
      />
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
