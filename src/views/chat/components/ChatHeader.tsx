import { Typography } from "antd";

const { Text, Title } = Typography;

type Props = {
  phoneNumber: string;
};

export const ChatHeader = ({ phoneNumber }: Props) => {
  return (
    <header className="chat-header">
      <div className="chat-header__content">
        <Title className="chat-header__title" level={5}>
          MAX Chat
        </Title>

        <Text className="chat-header__phone" type="secondary">
          +{phoneNumber}
        </Text>
      </div>
    </header>
  );
};
