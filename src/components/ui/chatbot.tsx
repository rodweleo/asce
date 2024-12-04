"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from 'lucide-react'
import { useLlmChat } from '@/hooks/use-llm-chat'

export function Chatbot() {
    const { messages, isLoading, sendMessage } = useLlmChat()
    const [input, setInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            sendMessage(input)
            setInput('')
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end ' : 'justify-start'
                            }`}
                    >
                        <div
                            className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse gap-2' : 'flex-row'
                                }`}
                        >
                            <Avatar className="w-8 h-8">
                                <AvatarImage
                                    src={
                                        message.sender === 'user'
                                            ? '/placeholder.svg?height=32&width=32'
                                            : '/images/DALL_E-2024-12-03-11.13-removebg-preview.png'
                                    }
                                    alt={message.sender === 'user' ? 'User' : 'LLM'}
                                />
                                <AvatarFallback>
                                    {message.sender === 'user' ? 'U' : 'A'}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className={`p-2 rounded-lg ${message.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-900'
                                    }`}
                            >
                                {message.content}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="/images/DALL_E-2024-12-03-11.13-removebg-preview.png" alt="asceflow.ai" />
                                <AvatarFallback>L</AvatarFallback>
                            </Avatar>
                            <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading}>
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

