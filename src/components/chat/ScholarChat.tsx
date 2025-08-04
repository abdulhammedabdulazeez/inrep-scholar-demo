"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Loader2,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";
import { useGeneralStore } from "@/store/generalStore";
import React from "react";

// Message component for individual chat messages
interface MessageProps {
  message: {
    id: string;
    role: "user" | "assistant" | "data" | "system";
    content: string;
  };
  isLoading?: boolean;
}

function Message({ message, isLoading }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 mb-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0",
          isUser
            ? "bg-blue-600"
            : "bg-gradient-to-r from-purple-600 to-blue-600"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content */}
      <div
        className={cn("flex-1 min-w-0", isUser ? "text-right" : "text-left")}
      >
        <div
          className={cn(
            "inline-block px-4 py-3 rounded-2xl text-sm max-w-full break-words",
            isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
          )}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Scholar is thinking...</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{message.content}</div>
          )}
        </div>

        {/* Timestamp */}
        <div
          className={cn(
            "text-xs text-gray-500 mt-1",
            isUser ? "text-right" : "text-left"
          )}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

// Quick actions component
const quickActions = [
  "How do I bulk import documents?",
  "How to assign reviewers?",
  "What are the document statuses?",
  "How to manage user permissions?",
];

interface QuickActionProps {
  action: string;
  onClick: (action: string) => void;
}

function QuickAction({ action, onClick }: QuickActionProps) {
  return (
    <button
      onClick={() => onClick(action)}
      className="text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
    >
      {action}
    </button>
  );
}

export default function ScholarChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ id: string; role: "user" | "assistant"; content: string }>
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userRole = useUserStore((state) => state?.role || undefined);
  const uniName = useGeneralStore((state) => state.affiliatedUni);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    setTimeout(() => {
      const messagesContainer = document.querySelector(".overflow-y-auto");
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  };

  // Auto-scroll when messages change
  React.useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/scholar-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage = {
        id: Date.now().toString(),
        role: "assistant" as const,
        content: data.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now().toString(),
        role: "assistant" as const,
        content:
          "Sorry, I'm having trouble connecting to my knowledge base. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-20 right-6 h-auto px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
      >
        <MessageCircle className="h-5 w-5 mr-2" />
        Ask Scholar
      </Button>

      {/* Chat Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
        <DrawerContent className="h-screen bg-white">
          <div className="flex flex-col h-full">
            {/* Header - Fixed */}
            <div className="flex-shrink-0 border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      Scholar AI Assistant
                    </h2>
                    <p className="text-sm text-gray-500">
                      Ask me anything about admin features
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Welcome to Scholar AI!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      I'm here to help you with admin tasks and answer questions
                      about the dashboard.
                    </p>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Try asking me about:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {quickActions.map((action, index) => (
                          <QuickAction
                            key={index}
                            action={action}
                            onClick={handleQuickAction}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <Message key={message.id} message={message} />
                  ))
                )}

                {/* Loading message */}
                {isLoading && (
                  <Message
                    message={{
                      id: "loading",
                      role: "assistant",
                      content: "",
                    }}
                    isLoading={true}
                  />
                )}
              </div>
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="flex-shrink-0 border-t bg-white p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Scholar anything..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!input.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>

              {/* Quick Actions - Only show when no messages */}
              {messages.length === 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Try asking about:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action, index) => (
                      <QuickAction
                        key={index}
                        action={action}
                        onClick={handleQuickAction}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
