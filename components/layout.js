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

    <div>
      <Navbar fixed="top" expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#" >Navbar</Navbar.Brand>

        </Container>
      </Navbar>
      <div style={{marginTop:"3em"}}>
      <Sidebar.Pushable as={Segment}>

      <Sidebar
        as={Menu}
        animation='uncover'

        icon='labeled'
        inverted
        vertical
        visible='true'
        width='thin'

      >
        <Menu.Item as='a'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Games
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
          Channels
        </Menu.Item>
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

