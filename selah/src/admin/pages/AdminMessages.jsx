import { useEffect, useState } from 'react'
import {
  Check,
  Clock3,
  Mail,
  MessageCircle,
  Trash2,
  User,
  RotateCcw,
} from 'lucide-react'

import AdminSidebar from '../components/AdminSidebar'

const API_URL = 'https://selah-qsla.onrender.com/api'

function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionId, setActionId] = useState('')

  const token = localStorage.getItem('selah_admin_token')

  useEffect(() => {
    if (!token) {
      window.location.href = '/admin/login'
      return
    }

    fetchMessages()
  }, [])

  // =====================================================
  // LOAD MESSAGES
  // =====================================================
  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_URL}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Could not load messages.',
        )
      }

      setMessages(data.messages || [])
    } catch (error) {
      console.error(error)

      setError(
        error.message || 'Could not load messages.',
      )
    } finally {
      setLoading(false)
    }
  }

  // =====================================================
  // MARK AS READ
  // =====================================================
  const markAsRead = async (id) => {
    try {
      setActionId(id)

      const response = await fetch(
        `${API_URL}/messages/${id}/read`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Could not mark message as read.',
        )
      }

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message._id === id
            ? {
                ...message,
                read: true,
              }
            : message,
        ),
      )
    } catch (error) {
      alert(
        error.message ||
          'Something went wrong.',
      )
    } finally {
      setActionId('')
    }
  }

  // =====================================================
  // MARK AS UNREAD
  // =====================================================
  const markAsUnread = async (id) => {
    try {
      setActionId(id)

      const response = await fetch(
        `${API_URL}/messages/${id}/unread`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Could not mark message as unread.',
        )
      }

      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message._id === id
            ? {
                ...message,
                read: false,
              }
            : message,
        ),
      )
    } catch (error) {
      alert(
        error.message ||
          'Something went wrong.',
      )
    } finally {
      setActionId('')
    }
  }

  // =====================================================
  // DELETE MESSAGE
  // =====================================================
  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this message?',
    )

    if (!confirmed) return

    try {
      setActionId(id)

      const response = await fetch(
        `${API_URL}/messages/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message ||
            'Could not delete message.',
        )
      }

      setMessages((currentMessages) =>
        currentMessages.filter(
          (message) => message._id !== id,
        ),
      )
    } catch (error) {
      alert(
        error.message ||
          'Something went wrong.',
      )
    } finally {
      setActionId('')
    }
  }

  // =====================================================
  // UNREAD COUNT
  // =====================================================
  const unreadCount = messages.filter(
    (message) => !message.read,
  ).length

  return (
    <div className="min-h-screen bg-[#f5efe6] text-[#2c211b]">
      <AdminSidebar />

      <main className="lg:ml-72">
        <div className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">

            {/* HEADER */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a65d3b]">
                  Communication
                </p>

                <h1 className="mt-2 font-display text-4xl text-[#2c211b] sm:text-5xl">
                  Messages
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#2c211b]/55">
                  View and manage messages sent through the Selah website.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-[#2c211b]/10 bg-white px-4 py-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a65d3b]/10 text-[#a65d3b]">
                  <MessageCircle size={19} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2c211b]/40">
                    Unread
                  </p>

                  <p className="mt-0.5 text-lg font-semibold text-[#2c211b]">
                    {unreadCount}
                  </p>
                </div>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-8 rounded-2xl border border-[#a65d3b]/20 bg-[#a65d3b]/10 px-5 py-4 text-sm text-[#7c3f29]">
                {error}
              </div>
            )}

            {/* LOADING */}
            {loading ? (
              <div className="mt-10 rounded-[2rem] border border-[#2c211b]/10 bg-white p-12 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#2c211b]/10 border-t-[#a65d3b]" />

                <p className="mt-4 text-sm text-[#2c211b]/50">
                  Loading messages...
                </p>
              </div>
            ) : messages.length === 0 ? (
              /* EMPTY STATE */
              <div className="mt-10 rounded-[2rem] border border-[#2c211b]/10 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2c211b]/5 text-[#2c211b]/35">
                  <MessageCircle size={28} />
                </div>

                <h2 className="mt-6 font-display text-2xl text-[#2c211b]">
                  No messages yet
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#2c211b]/50">
                  When visitors send a message through your website,
                  their messages will appear here.
                </p>
              </div>
            ) : (
              /* MESSAGES */
              <div className="mt-10 space-y-4">
                {messages.map((message) => (
                  <article
                    key={message._id}
                    className={`group rounded-[2rem] border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 ${
                      message.read
                        ? 'border-[#2c211b]/10'
                        : 'border-[#a65d3b]/20'
                    }`}
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                      {/* MESSAGE INFO */}
                      <div className="min-w-0 flex-1">

                        {/* TOP */}
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2c211b]/5 text-[#2c211b]/60">
                            <User size={19} />
                          </div>

                          <div className="min-w-0">
                            <h2 className="font-display text-xl text-[#2c211b]">
                              {message.name}
                            </h2>

                            <a
                              href={`mailto:${message.email}`}
                              className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-[#2c211b]/45 transition-colors hover:text-[#a65d3b]"
                            >
                              <Mail size={13} />
                              {message.email}
                            </a>
                          </div>

                          {!message.read && (
                            <span className="rounded-full bg-[#a65d3b]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a65d3b]">
                              New
                            </span>
                          )}
                        </div>

                        {/* DATE */}
                        <div className="mt-5 flex items-center gap-2 text-xs text-[#2c211b]/35">
                          <Clock3 size={14} />

                          {new Date(
                            message.createdAt,
                          ).toLocaleString()}
                        </div>

                        {/* MESSAGE */}
                        <div className="mt-5 rounded-2xl bg-[#f5efe6] p-5">
                          <p className="whitespace-pre-wrap text-sm leading-7 text-[#2c211b]/70">
                            {message.message}
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex shrink-0 flex-row flex-wrap gap-2 lg:flex-col">

                        {!message.read ? (
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(message._id)
                            }
                            disabled={
                              actionId === message._id
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2c211b]/10 px-4 py-3 text-xs font-semibold text-[#2c211b]/70 transition hover:border-[#394337]/30 hover:bg-[#394337]/5 hover:text-[#394337] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Check size={15} />
                            Mark read
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              markAsUnread(message._id)
                            }
                            disabled={
                              actionId === message._id
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2c211b]/10 px-4 py-3 text-xs font-semibold text-[#2c211b]/70 transition hover:border-[#a65d3b]/30 hover:bg-[#a65d3b]/5 hover:text-[#a65d3b] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <RotateCcw size={15} />
                            Mark unread
                          </button>
                        )}

                        <a
                          href={`mailto:${message.email}?subject=Re: Selah Coffee`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2c211b] px-4 py-3 text-xs font-semibold text-[#f5efe6] transition hover:-translate-y-0.5 hover:bg-[#6f4e37]"
                        >
                          <Mail size={15} />
                          Reply
                        </a>

                        <button
                          type="button"
                          onClick={() =>
                            deleteMessage(message._id)
                          }
                          disabled={
                            actionId === message._id
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#a65d3b]/15 px-4 py-3 text-xs font-semibold text-[#a65d3b] transition hover:bg-[#a65d3b]/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminMessages