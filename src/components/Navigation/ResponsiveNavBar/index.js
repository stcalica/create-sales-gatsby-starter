import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import scrollTo from 'gatsby-plugin-smoothscroll'
import StoreContext from '~/context/StoreContext'
import {  Badge, Layout, Menu  } from 'antd'
import 'antd/dist/antd.css'

const { Header } = Layout;

const ResponsiveNavBar = (props) => {
  //const { checkout } = useContext(StoreContext)
  return (
    <Header style={{ position: 'fixed', zIndex: 100, width: '100%', backgroundColor:'black', color:'white'}}>
      <Menu theme="dark" mode="horizontal" style={{backgroundColor:'black', color:'white'}}>
        { props.links.map(link => (
            <Menu.Item key={`nav-${link.title}`}>
              { link.badge ? <Badge count={props.count}><a href={link.link}>{link.title}</a></Badge> : <a href={link.link}>{link.title}</a> }
            </Menu.Item>
        )) }
      </Menu>
    </Header>
  )
}

export default ResponsiveNavBar
