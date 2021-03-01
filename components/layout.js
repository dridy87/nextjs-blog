import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Navbar, Container } from 'react-bootstrap'

import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'


const name = '김영균'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  return (

    <div style={{'display': 'flex'}}>
      <Navbar fixed="top" expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#" >billboard 50</Navbar.Brand>

        </Container>
      </Navbar>
      <div style={{marginTop:"3em",width: '100%'}}>
      <Sidebar.Pushable as={Segment}>

      <Sidebar
        as={Menu}
        animation='uncover'

        icon='labeled'
        inverted
        vertical
        visible
        width='thin'

      >
        <Menu.Item as='a'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Link href='/'>
        <Menu.Item as='a'>
          <Icon name='music' />
          billboard
        </Menu.Item>
        </Link>
        <Link href='/first'>
        <Menu.Item as='a'>
      
          <Icon name='chart line' />
          Channels
               
        </Menu.Item>
        </Link> 
      </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <main>{children}</main>
            {!home && (
              <div className={styles.backToHome}>
                <Link href="/">
                  <a>← Back to home</a>
                </Link>
              </div>
            )}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      </div>
    </div>
  )
}

