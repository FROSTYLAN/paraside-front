import React, { useState } from 'react'
import { Col, Container, FlexboxGrid, Sidebar } from 'rsuite'
import { ChatList } from './components/chat-list'
import { Conversation } from './components/conversation'

export const Chat = () => {
  const [contact, setContact] = useState()

  return (
    <FlexboxGrid
      justify='center'
      style={{ height: 'calc(100vh - 14rem)' }}
    >
      <FlexboxGrid.Item as={Col} sm={18} style={{ alignSelf: 'stretch' }}>
        <Container style={{ height: '100%' }}>
          <Sidebar
            style={{ borderRight: '1px solid var(--color-lightgray)' }}
            width={480}
          >
            <ChatList contact={contact} setContact={setContact} />
          </Sidebar>
          <Container style={{ padding: '2.4rem 0 0 3.2rem' }}>
            <Conversation contact={contact} />
          </Container>
        </Container>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  )
}
