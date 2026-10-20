"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  Input,
  Layout,
  Menu,
  Typography,
} from "antd";

import {
  AudioOutlined,
  BankOutlined,
  FileTextOutlined,
  MessageOutlined,
  PaperClipOutlined,
  PlusOutlined,
  RobotOutlined,
  SendOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import type { Message } from "@/app/types/chat";
import ChatMessage from "@/app/components/chat/ChatMessage";

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;

const menuItems = [
  {
    key: "chat",
    icon: <MessageOutlined />,
    label: "Chat Assistant",
  },
  {
    key: "jobs",
    icon: <BankOutlined />,
    label: "Job Search",
  },
  {
    key: "documents",
    icon: <FileTextOutlined />,
    label: "Documents",
  },
];

const initialMessage: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi Subodhi! 👋 I'm your AI Job Assistant. I can help you discover job opportunities, identify skill gaps, understand job descriptions, and explore your next career move. What would you like to work on today?",
  timestamp: new Date(),
};

const suggestedPrompts = [
  "Find global remote AI jobs",
  "Analyse my skill gaps",
  "Match my profile to a job",
];

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([
    initialMessage,
  ]);

  const [input, setInput] = useState("");

  const [isResponding, setIsResponding] = useState(false);

  function handleSend(messageText?: string) {
    const content = (messageText ?? input).trim();

    if (!content || isResponding) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setInput("");
    setIsResponding(true);

    // Temporary response until the FastAPI backend is connected.
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Thanks for your question! Your message has been received. Once we connect the FastAPI backend, I'll be able to provide AI-powered answers using your job intelligence system.",
        timestamp: new Date(),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);

      setIsResponding(false);
    }, 700);
  }

  function handleNewChat() {
    setMessages([
      {
        ...initialMessage,
        id: crypto.randomUUID(),
        timestamp: new Date(),
      },
    ]);

    setInput("");
    setIsResponding(false);
  }

  return (
    <Layout className="dashboard-layout">
      {/* Left sidebar */}
      <Sider width={250} className="dashboard-sider">
        <div className="brand">
          <div className="brand-icon">
            <RobotOutlined />
          </div>

          <div>
            <Text className="brand-title">
              AI Job Assistant
            </Text>

            <Text className="brand-subtitle">
              Your career companion
            </Text>
          </div>
        </div>

        <Text className="sidebar-label">
          WORKSPACE
        </Text>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={["chat"]}
          items={menuItems}
          className="sidebar-menu"
        />

        <div className="sidebar-bottom">
          <Menu
            theme="dark"
            mode="inline"
            selectable={false}
            items={[
              {
                key: "settings",
                icon: <SettingOutlined />,
                label: "Settings",
              },
            ]}
            className="sidebar-menu"
          />

          <div className="sidebar-user">
            <Avatar size={38}>S</Avatar>

            <div className="sidebar-user-info">
              <Text className="sidebar-user-name">
                Subodhi
              </Text>

              <Text className="sidebar-user-role">
                Personal workspace
              </Text>
            </div>
          </div>
        </div>
      </Sider>

      {/* Main dashboard */}
      <Layout className="dashboard-main">
        <Header className="dashboard-header">
          <div>
            <Title level={4} className="welcome-title">
              Welcome, Subodhi
            </Title>

            <Text className="welcome-subtitle">
              Lets take the next step in your career.
            </Text>
          </div>

          <Avatar size={42}>S</Avatar>
        </Header>

        <Content className="dashboard-content">
          <div className="dashboard-grid">
            {/* Chat panel */}
            <section className="chat-card">
              <div className="chat-header">
                <div className="chat-heading">
                  <div className="chat-icon">
                    <RobotOutlined />
                  </div>

                  <div>
                    <Title level={4} className="chat-title">
                      AI Career Assistant
                    </Title>

                    <Text className="chat-description">
                      Ask questions about jobs, skills, and your career.
                    </Text>
                  </div>
                </div>

                <Button
                  icon={<PlusOutlined />}
                  className="new-chat-button"
                  onClick={handleNewChat}
                >
                  New chat
                </Button>
              </div>

              {/* Dynamic conversation */}
              <div className="chat-messages">
                {messages.map((item) => (
                  <ChatMessage
                    key={item.id}
                    message={item}
                  />
                ))}

                {isResponding && (
                  <div className="message-row">
                    <Avatar
                      className="assistant-avatar"
                      icon={<RobotOutlined />}
                    />

                    <div className="message-content">
                      <Text className="message-author">
                        AI Assistant
                      </Text>

                      <div className="message-bubble assistant-bubble">
                        Thinking...
                      </div>
                    </div>
                  </div>
                )}

                {/* Suggested prompts appear in an empty conversation */}
                {messages.length === 1 && (
                  <div className="suggestion-list">
                    <Text className="suggestion-label">
                      Try asking:
                    </Text>

                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        className="suggestion-chip"
                        onClick={() => handleSend(prompt)}
                        disabled={isResponding}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Message composer */}
              <div className="composer">
                <Input.TextArea
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  onPressEnter={(event) => {
                    if (!event.shiftKey) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about jobs, skills, salaries, or career opportunities..."
                  autoSize={{
                    minRows: 2,
                    maxRows: 5,
                  }}
                  className="composer-input"
                />

                <div className="composer-footer">
                  <div className="composer-tools">
                    <Button
                      type="text"
                      icon={<PaperClipOutlined />}
                      aria-label="Attach a file"
                      title="File attachments coming soon"
                    />

                    <Button
                      type="text"
                      icon={<AudioOutlined />}
                      aria-label="Voice input"
                      title="Voice input coming soon"
                    />

                    <Text className="composer-hint">
                      AI-generated answers may need verification.
                    </Text>
                  </div>

                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    className="send-button"
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isResponding}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </section>

            {/* Right workspace panel */}
            <aside className="insights-card">
              <div className="insights-header">
                <Title level={5} className="insights-title">
                  Your Workspace
                </Title>

                <Text className="insights-subtitle">
                  Your career tools, all in one place.
                </Text>
              </div>

              <div className="feature-placeholder">
                <div className="placeholder-icon">
                  <BankOutlined />
                </div>

                <Text className="placeholder-title">
                  Job Recommendations
                </Text>

                <Text className="placeholder-description">
                  Relevant opportunities based on your skills and goals.
                </Text>
              </div>

              <div className="feature-placeholder">
                <div className="placeholder-icon">
                  <FileTextOutlined />
                </div>

                <Text className="placeholder-title">
                  Resume Insights
                </Text>

                <Text className="placeholder-description">
                  Review your experience and identify areas to improve.
                </Text>
              </div>

              <div className="feature-placeholder">
                <div className="placeholder-icon">
                  <MessageOutlined />
                </div>

                <Text className="placeholder-title">
                  Saved Conversations
                </Text>

                <Text className="placeholder-description">
                  Return to previous questions and career discussions.
                </Text>
              </div>

              <div className="workspace-note">
                <RobotOutlined />

                <Text>
                  More AI-powered tools will appear here.
                </Text>
              </div>
            </aside>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}