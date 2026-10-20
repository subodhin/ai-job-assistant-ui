"use client";

import { Avatar, Button, Input, Layout, Menu, Typography } from "antd";

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

const { Sider, Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

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

export default function Dashboard() {
  return (
    <Layout className="dashboard-layout">
      {/* Left sidebar */}
      <Sider width={250} className="dashboard-sider">
        <div className="brand">
          <div className="brand-icon">
            <RobotOutlined />
          </div>

          <div>
            <Text className="brand-title">AI Job Assistant</Text>
            <Text className="brand-subtitle">Your career companion</Text>
          </div>
        </div>

        <Text className="sidebar-label">WORKSPACE</Text>

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
              <Text className="sidebar-user-name">Subodhi</Text>
              <Text className="sidebar-user-role">Personal workspace</Text>
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

                <Button icon={<PlusOutlined />} className="new-chat-button">
                  New chat
                </Button>
              </div>

              <div className="chat-messages">
                {/* Assistant message */}
                <div className="message-row">
                  <Avatar
                    className="assistant-avatar"
                    icon={<RobotOutlined />}
                  />

                  <div className="message-content">
                    <Text className="message-author">AI Assistant</Text>

                    <div className="message-bubble assistant-bubble">
                      <Paragraph>
                        Hi Subodhi! 👋 Im your AI Job Assistant.
                      </Paragraph>

                      <Paragraph>
                        I can help you discover job opportunities, identify
                        skill gaps, understand job descriptions, and explore
                        your next career move.
                      </Paragraph>

                      <Paragraph className="message-last-paragraph">
                        What would you like to work on today?
                      </Paragraph>
                    </div>
                  </div>
                </div>

                {/* Example user message */}
                <div className="message-row user-message-row">
                  <div className="message-content user-message-content">
                    <Text className="message-author user-author">You</Text>

                    <div className="message-bubble user-bubble">
                      Find remote AI Engineer opportunities that I can work on
                      from Sri Lanka.
                    </div>
                  </div>

                  <Avatar className="user-avatar">S</Avatar>
                </div>

                {/* Example assistant response */}
                <div className="message-row">
                  <Avatar
                    className="assistant-avatar"
                    icon={<RobotOutlined />}
                  />

                  <div className="message-content">
                    <Text className="message-author">AI Assistant</Text>

                    <div className="message-bubble assistant-bubble">
                      Absolutely! I can help you search for suitable remote AI
                      engineering roles and assess their location and time-zone
                      requirements.
                      <div className="suggestion-list">
                        <Text className="suggestion-label">Try asking:</Text>

                        <button className="suggestion-chip">
                          Find global remote AI jobs
                        </button>

                        <button className="suggestion-chip">
                          Analyse my skill gaps
                        </button>

                        <button className="suggestion-chip">
                          Match my profile to a job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message composer */}
              <div className="composer">
                <Input.TextArea
                  placeholder="Ask about jobs, skills, salaries, or career opportunities..."
                  autoSize={{ minRows: 2, maxRows: 5 }}
                  className="composer-input"
                />

                <div className="composer-footer">
                  <div className="composer-tools">
                    <Button
                      type="text"
                      icon={<PaperClipOutlined />}
                      aria-label="Attach a file"
                    />

                    <Button
                      type="text"
                      icon={<AudioOutlined />}
                      aria-label="Voice input"
                    />

                    <Text className="composer-hint">
                      AI-generated answers may need verification.
                    </Text>
                  </div>

                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    className="send-button"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </section>

            {/* Reserved space for future features */}
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

                <Text className="placeholder-title">Job Recommendations</Text>

                <Text className="placeholder-description">
                  Relevant opportunities based on your skills and goals.
                </Text>
              </div>

              <div className="feature-placeholder">
                <div className="placeholder-icon">
                  <BankOutlined />
                </div>

                <Text className="placeholder-title">Resume Insights</Text>

                <Text className="placeholder-description">
                  Review your experience and identify areas to improve.
                </Text>
              </div>

              <div className="feature-placeholder">
                <div className="placeholder-icon">
                  <BankOutlined />
                </div>

                <Text className="placeholder-title">Saved Conversations</Text>

                <Text className="placeholder-description">
                  Return to previous questions and career discussions.
                </Text>
              </div>

              <div className="workspace-note">
                <RobotOutlined />

                <Text>More AI-powered tools will appear here.</Text>
              </div>
            </aside>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
