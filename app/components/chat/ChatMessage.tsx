import { Avatar, Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import type { Message } from "@/app/types/chat";

const { Text } = Typography;

type ChatMessageProps = {
  message: Message;
};

export default function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-row ${
        isUser ? "user-message-row" : ""
      }`}
    >
      {!isUser && (
        <Avatar
          className="assistant-avatar"
          icon={<RobotOutlined />}
        />
      )}

      <div
        className={`message-content ${
          isUser ? "user-message-content" : ""
        }`}
      >
        <Text
          className={`message-author ${
            isUser ? "user-author" : ""
          }`}
        >
          {isUser ? "You" : "AI Assistant"}
        </Text>

        <div
          className={`message-bubble ${
            isUser ? "user-bubble" : "assistant-bubble"
          }`}
        >
          {message.content}
        </div>
      </div>

      {isUser && (
        <Avatar className="user-avatar">S</Avatar>
      )}
    </div>
  );
}