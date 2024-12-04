import { useState, useEffect } from 'react'

type Message = {
  id: string
  content: string
  sender: 'user' | 'llm'
}

export function useLlmChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages')
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  const addMessage = (content: string, sender: 'user' | 'llm') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
    }
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  const sendMessage = async (content: string) => {
    addMessage(content, 'user')
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Dummy response
    const response = "This is a dummy response from the LLM."
    addMessage(response, 'llm')
    setIsLoading(false)
  }

  return { messages, isLoading, sendMessage }
}

