import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
}

const cannedResponses: { [key: string]: string } = {
  contraception:
    'There are several contraception methods: condoms, pills, injectables, IUDs, and implants. Choose the one that fits your life and health needs.',
  hiv:
    'HIV prevention includes regular testing, condoms, PrEP for high-risk individuals, and avoiding sharing needles. Confidential testing is available in many clinics.',
  mental:
    'Mental wellness starts with rest, sharing feelings, and getting support. If you feel overwhelmed, our professionals can offer private guidance.',
};

export function ChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: "Hi! I'm your safe health companion. Ask me about contraception, HIV prevention, mental health, or cycle care.",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const text = input.toLowerCase();
      const response =
        cannedResponses.contraception && text.includes('contraception')
          ? cannedResponses.contraception
          : text.includes('hiv') || text.includes('aids')
          ? cannedResponses.hiv
          : text.includes('mental') || text.includes('stress')
          ? cannedResponses.mental
          : 'Thank you for your question. For more detailed support, connect with a provider or browse the marketplace.';
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, content: response, sender: 'bot' },
      ]);
    }, 1200);
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-sm">
      <CardContent className="p-0">
        <div className="bg-purple-600 text-white p-5 rounded-t-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold">Nsobanuza Health Bot</p>
              <p className="text-sm text-purple-100">Confidential assistance in Kinyarwanda, English, and French.</p>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-2xl p-3 ${
                message.sender === 'bot'
                  ? 'bg-gray-100 text-gray-800 self-start'
                  : 'bg-purple-600 text-white self-end'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-gray-200 p-4 bg-white rounded-b-3xl">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about HIV prevention, contraception, or mental health"
              className="flex-1"
            />
            <Button onClick={handleSend} className="rounded-2xl">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
            <Badge variant="outline">Contraception</Badge>
            <Badge variant="outline">HIV Prevention</Badge>
            <Badge variant="outline">Mental Health</Badge>
            <Badge variant="outline">Cycle Care</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}