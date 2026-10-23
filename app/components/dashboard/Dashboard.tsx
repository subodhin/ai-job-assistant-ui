"use client";

import { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Tag,
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

type JobResult = {
  id?: string | number;
  title?: string;
  skills?: string[];
  salary?: string;
  location?: string;
  job_url?: string;
};

type AgentResponse = {
  intent?: { intent?: string } | string;
  response?: {
    intent?: string;
    agent?: string;
    filters?: {
      title?: string;
      skills?: string[];
      location?: string;
    };
    results?: JobResult[];
    [key: string]: unknown;
  } | string;
  user_id?: string;
};

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
  const [jobResults, setJobResults] = useState<JobResult[]>([]);
  const [jobSearchSummary, setJobSearchSummary] = useState("");

  async function handleSend(messageText?: string) {
    const content = (messageText ?? input).trim();

    if (!content || isResponding) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);
    setInput("");
    setIsResponding(true);
    setJobResults([]);
    setJobSearchSummary("");

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

      const response = await fetch(`${apiBaseUrl}/ai-agent-context`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "user_001", query: content }),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(`API request failed (${response.status}): ${details}`);
      }

      const data: AgentResponse = await response.json();
      const agentResponse = data.response;
      let assistantContent = "Your request completed, but no answer was returned.";

      if (agentResponse && typeof agentResponse === "object") {
        const results = Array.isArray(agentResponse.results)
          ? agentResponse.results
          : [];

        if (results.length > 0) {
          setJobResults(results);
          const filters = agentResponse.filters;
          const title = filters?.title || "Job search";
          const skills = filters?.skills?.length
            ? filters.skills.join(", ")
            : "Relevant skills";
          const location = filters?.location || "Any location";
          setJobSearchSummary(`${title} · ${skills} · ${location}`);
          assistantContent = `I found ${results.length} job listings for your search. Review the details below and open any listing to learn more.`;
        } else {
          assistantContent = JSON.stringify(agentResponse, null, 2);
        }
      } else if (typeof agentResponse === "string") {
        assistantContent = agentResponse;
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistantContent,
        timestamp: new Date(),
      };
      setMessages((previousMessages) => [...previousMessages, assistantMessage]);
    } catch (error) {
      console.error("Failed to call FastAPI:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          error instanceof Error
            ? `I couldn't complete your request. ${error.message}`
            : "I couldn't connect to the backend. Please check that FastAPI is running and CORS is configured.",
        timestamp: new Date(),
      };
      setMessages((previousMessages) => [...previousMessages, errorMessage]);
    } finally {
      setIsResponding(false);
    }
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
    setJobResults([]);
    setJobSearchSummary("");
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

                {jobResults.length > 0 && (
                  <div style={{ margin: "8px 0 12px 44px", maxWidth: 760 }}>
                    <div style={{ marginBottom: 10 }}>
                      <Text strong style={{ display: "block", fontSize: 16 }}>
                        Job search results
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {jobSearchSummary} · {jobResults.length} listings
                      </Text>
                    </div>

                    <div style={{ display: "grid", gap: 10 }}>
                      {jobResults.map((job, index) => (
                        <Card
                          key={job.id ?? `${job.title ?? "job"}-${index}`}
                          size="small"
                          styles={{ body: { padding: "12px 14px" } }}
                          style={{ borderRadius: 10, borderColor: "#e6eaf0" }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                            <div style={{ minWidth: 0 }}>
                              <Text strong style={{ fontSize: 14 }}>
                                {index + 1}. {job.title || "Untitled position"}
                              </Text>
                              <div style={{ marginTop: 5, display: "flex", flexWrap: "wrap", gap: 6 }}>
                                <Tag style={{ marginInlineEnd: 0 }}>{job.location || "Location not provided"}</Tag>
                                <Tag color="green" style={{ marginInlineEnd: 0 }}>
                                  {job.salary?.trim() || "Salary not provided"}
                                </Tag>
                              </div>
                            </div>
                            {job.job_url && (
                              <a
                                href={job.job_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ whiteSpace: "nowrap", fontWeight: 600, fontSize: 13 }}
                              >
                                View job ↗
                              </a>
                            )}
                          </div>

                          {!!job.skills?.length && (
                            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 5 }}>
                              {job.skills.slice(0, 6).map((skill) => (
                                <Tag key={skill} style={{ marginInlineEnd: 0, marginBottom: 0 }}>
                                  {skill.trim()}
                                </Tag>
                              ))}
                              {job.skills.length > 6 && (
                                <Text type="secondary" style={{ fontSize: 12, alignSelf: "center" }}>
                                  +{job.skills.length - 6} more
                                </Text>
                              )}
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

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