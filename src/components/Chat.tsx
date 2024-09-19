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
import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    api: "api/chat",
  });

  console.log("messages")
  console.log(messages)
  console.log(data)

  return (
    <Card className="w-[90%] sm:w-[50%]">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>
          Using Vercel SDK to create a chat bot.
        </CardDescription>
      </CardHeader>
      <CardContent >
        <ScrollArea className="h-[400px] w-full space-y-4 pr-4">
        {messages.map((message) => {
          return (
            <>
              <div
                key={message.id}
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
                    <AvatarImage src="https://github.com/termux.png" />
                  </Avatar>
                )}

                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    {message.role === "user" ? "Usuário" : "IA"}:
                  </span>
                  {message.content}
                </p>
              </div>
            </>
          );
        })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="How can I help you?"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
