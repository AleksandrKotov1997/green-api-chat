import { Button, Input, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

type Props = {
  isSending: boolean;
  errorMessage: string | null;
  onSend: (text: string) => Promise<boolean>;
};

export const MessageComposer = ({ isSending, errorMessage, onSend }: Props) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    const message = text.trim();

    if (!message || isSending) {
      return;
    }

    const isSent = await onSend(message);

    if (isSent) {
      setText("");
    }
  };

  return (
    <div className="message-composer">
      {errorMessage && (
        <Text className="message-composer__error" type="danger">
          {errorMessage}
        </Text>
      )}

      <div className="message-composer__content">
        <Input.TextArea
          className="message-composer__input"
          value={text}
          placeholder="Write a message"
          autoSize={{ minRows: 1, maxRows: 4 }}
          disabled={isSending}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || event.shiftKey) {
              return;
            }

            event.preventDefault();
            void handleSend();
          }}
        />

        <Button
          className="message-composer__send"
          type="primary"
          loading={isSending}
          disabled={!text.trim() || isSending}
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
