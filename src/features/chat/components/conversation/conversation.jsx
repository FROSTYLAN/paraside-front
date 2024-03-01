import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { Button, Content, Divider, Footer, Header, Input, Loader, Message } from 'rsuite'
import { useUser } from '@/hooks/use-user'
import { getAuthToken } from '../../../../services/token-service'
import PropTypes from 'prop-types'
import './styles.css'

const apiUrl = import.meta.env.VITE_API_BASE_URL

export const Conversation = ({ contact }) => {
  const [socket, setSocket] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState()
  const { user } = useUser()

  const messageRef = useRef()

  const token = getAuthToken()

  useEffect(() => {
    if (!token) return

    const handleSignIn = async () => {
      try {
        const socket = io(apiUrl, {
          query: { token },
          transports: ['websocket']
        })
        socket.connect()

        setSocket(socket)
      } catch {
        setLoading(false)
        setError('Error al autenticar')
      }
    }
    handleSignIn()
  }, [])

  useEffect(() => {
    if (!contact || !token) return

    const getMessages = async () => {
      setMessages([])
      messageRef.current?.focus()

      try {
        const response = await fetch(
          `${apiUrl}/api/user-message/${contact?.user_id}`,
          {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )

        const data = await response.json()
        setMessages(data)
      } catch {
        setMessages([])
      }
    }
    getMessages()
  }, [contact, token])

  useEffect(() => {
    if (!socket) {
      return
    }

    function onConnect() {
      setLoading(false)
      setError('')
    }

    function onConnectError(error) {
      setLoading(false)
      setError(error.message)
    }

    function onTypingResponse(body) {
      setTyping(body)
    }

    function onNoTypingResponse() {
      setTyping()
    }

    function onMessageResponse(body) {
      setMessages((prevState) => [...prevState, body])
    }

    socket.on('connect', onConnect)
    socket.on('connect_error', onConnectError)
    socket.on('typingResponse', onTypingResponse)
    socket.on('noTypingResponse', onNoTypingResponse)
    socket.on('messageResponse', onMessageResponse)

    return () => {
      socket.off('connect', onConnect)
      socket.off('connect_error', onConnectError)
      socket.off('typingResponse', onTypingResponse)
      socket.off('noTypingResponse', onNoTypingResponse)
      socket.off('messageResponse', onMessageResponse)
    }
  }, [socket])

  const handleChangeMessage = (value) => {
    if (value?.trim() && user && contact) {
      socket.emit('typing', {
        from_user_id: user.id,
        to_user_id: contact.user_id
      });

    } else {
      socket.emit('noTyping');
    }

    setMessage(value);
  }

  const handleSendMessage = (event) => {
    event.preventDefault()

    if (!message?.trim() || !user || !contact) {
      return
    }

    const body = {
      from_user_id: user.id,
      to_user_id: contact.user_id,
      message,
      created_at: new Date()
    }
    socket.emit('noTyping')
    socket.emit('message', body)

    setMessage('')
    setMessages((prevState) => [...prevState, body])
  }

  if (!contact) {
    return (
      <Message type='info'>
        Selecciona un contacto para comenzar a chatear
      </Message>
    )
  }

  if (loading) {
    return <Loader size='md' backdrop center content='Cargando mensajes...' />
  }

  if (error) {
    return <Message type='error'>{error}</Message>
  }

  return (
    <>
      <Header style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <img
          src='https://via.placeholder.com/50'
          alt='Avatar'
          style={{ borderRadius: '50%' }}
        />
        <div>
          <h3>{contact.name}</h3>
          <small>En línea</small>
        </div>
      </Header>
      <Divider className='mt-24 mb-0' />
      <Content className='scroll-content' style={{
        margin: '1rem 0 0 0',
        overflowX: 'auto',
        height: '100px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
      }}>
        {messages.map((message) => {
          const isMine = message.from_user_id === user.id

          return (
            <div
              key={message.id}
              style={{
                marginBottom: '0.8rem',
                display: 'flex',
                justifyContent: isMine ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  maxWidth: '60%'
                }}
              >
                <div
                  style={{
                    padding: '1.6rem',
                    backgroundColor: isMine
                      ? 'var(--color-secondary)'
                      : 'var(--color-lightgray)',
                    color: isMine ? 'var(--color-white)' : 'var(--color-black)',
                    borderRadius: '2.4rem'
                  }}
                >
                  <p>{message.message}</p>
                </div>
                <small style={{ marginLeft: isMine ? 'auto' : 'unset' }}>
                  {message.time}
                </small>
              </div>
            </div>
          )
        })}
      </Content>
      <Footer style={{ padding: '1rem 0' }}>
        <form onSubmit={handleSendMessage}>
          {typing?.from_user_id === contact.user_id &&
            typing?.to_user_id === user.id && <small>escribiendo...</small>}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <Input
              type='text'
              placeholder='Escribe un mensaje...'
              ref={messageRef}
              value={message}
              onChange={handleChangeMessage}
            />
            <Button appearance='primary' type='submit'>
              Enviar
            </Button>
          </div>
        </form>
      </Footer>
    </>
  )
}

Conversation.propTypes = {
  contact: PropTypes.object
}
