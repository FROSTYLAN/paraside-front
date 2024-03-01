import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Loader } from 'rsuite';
import styles from './chat-list.module.scss'
import { useGetUserChats } from '@/api/user-match'

//     id: 9,
//     name: 'Rogger',
//     email: 'rogger.ortiz.br@gmail.com',
//     lastMessage: 'Last message 1',
//     unreadMessages: 3,
//     lastMessageDate: '2021-01-01',
//     lastMessageTime: '12:00',
//     lastMessageAuthor: 'Author 1',
//     lastMessageAuthorId: 1,
//     lastMessageAuthorAvatar: 'https://via.placeholder.com/150',
//     lastMessageAuthorIsOnline: true,
//     lastMessageAuthorIsTyping: true 

export const ChatList = ({ setContact }) => {

  const { data: chats, isLoading } = useGetUserChats({})
  const [selectedChatId, setSelectedChatId] = useState(null)
  const handleClick = (chat) => {
    setSelectedChatId(chat.user_id)
    setContact(chat)
  }

  console.log(chats);

  return (
    <div className={styles.chatList}>
      {isLoading ? (
        <Loader center size='md' />
      ) : (
        chats.data.map((chat) => (
          <div
            key={chat.user_id}
            className={clsx(styles.chat, {
              [styles.active]: selectedChatId === chat.user_id
            })}
            onClick={() => handleClick(chat)}
          >
            <div className={styles.chatAvatar}>
              <img
                src={chat.lastMessageAuthorAvatar}
                alt={chat.lastMessageAuthor}
              />
            </div>
            <div className={styles.chatInfo}>
              <div className={styles.chatName}>{chat.name}</div>
              <div className={styles.chatLastMessage}>{chat.lastMessage}</div>
            </div>
            <div className={styles.chatDate}>{chat.lastMessageDate}</div>
            {selectedChatId !== chat.user_id && (chat.new_messages !== "0") && (
              <div className={styles.chatBadge}>
                <span>{chat.new_messages}</span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

ChatList.propTypes = {
  setContact: PropTypes.func.isRequired
}
