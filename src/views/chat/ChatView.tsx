import { useState } from "react";

import type { GreenApiCredentials } from "~/api";

import { ActiveChatView } from "./ActiveChatView";
import { CreateChatForm } from "./components";
import { useCreateChat } from "./hooks";
import type { Chat, CreateChatFormValues } from "./types";

import "./chat.css";

type ChatSession = {
  credentials: GreenApiCredentials;
  chat: Chat;
};

export const ChatView = () => {
  const [session, setSession] = useState<ChatSession | null>(null);

  const { createChat, isCreating, errorMessage } = useCreateChat();

  const handleCreateChat = async (
    values: CreateChatFormValues,
  ): Promise<void> => {
    const credentials: GreenApiCredentials = {
      idInstance: values.idInstance,
      apiTokenInstance: values.apiTokenInstance,
    };

    const chat = await createChat({
      credentials,
      phoneNumber: values.phoneNumber,
    });

    if (!chat) {
      return;
    }

    setSession({
      credentials,
      chat,
    });
  };

  if (session) {
    return (
      <ActiveChatView credentials={session.credentials} chat={session.chat} />
    );
  }

  return (
    <main className="chat-page">
      <div className="chat-setup">
        <section className="chat-setup__content">
          <div className="chat-setup__header">
            <span className="chat-setup__brand">MAX</span>

            <h1 className="chat-setup__title">Create chat</h1>

            <p className="chat-setup__description">
              Enter your GREEN-API credentials and recipient phone number.
            </p>
          </div>

          <CreateChatForm
            isSubmitting={isCreating}
            errorMessage={errorMessage}
            onSubmit={handleCreateChat}
          />
        </section>
      </div>
    </main>
  );
};
