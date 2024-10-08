"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { Cross } from 'lucide-react';

export function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) {
      console.error("Prompt vazio!");
      return;
    }

    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages); 
    setLoading(true); 
    setInput(''); 

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        messages: updatedMessages, 
      }),
    });

    if (res.ok) {
      const data = await res.json();

      const newMessage = {
        role: data.content.role,
        content: data.content.content
      };

      setMessages([...updatedMessages, newMessage]);
    } else {
      console.error('Erro ao chamar a API');
    }

    setLoading(false); 
  };

  return (
    <Card className="w-[90%] sm:w-[50%]">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center"><Cross color="red" size={30}/> HealthAI</CardTitle>
        <CardDescription>
        Assistente de inteligência artificial focada em fornecer informações detalhadas e precisas sobre o programa Previne Brasil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full space-y-4 pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex gap-3 text-slate-600 text-sm mb-5"
            >
              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>ML</AvatarFallback>
                  <AvatarImage src="https://github.com/mateuslevi12.png" />
                </Avatar>
              )}

              {message.role === "assistant" && (
                <Avatar>
                  <AvatarFallback>AI</AvatarFallback>
                  <AvatarImage src="./favicon.ico" />
                </Avatar>
              )}

              <p className="leading-relaxed">
                <span className="block font-bold text-slate-700">
                  {message.role === "user" ? "Usuário" : "IA"}:
                </span>
                {message.content}
              </p>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 text-slate-600 text-sm mb-5">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
                <AvatarImage src="./favicon.ico"/>
              </Avatar>
              <p className="leading-relaxed">
                <span className="block font-bold text-slate-700">IA:</span>
                Carregando... Isso pode demorar um pouco.
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="Como posso ajudar você?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
