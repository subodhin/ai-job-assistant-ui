
"use client";

import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Progress,
  Divider,
  List,
  Space,
} from "antd";

import {
  CheckCircleOutlined,
  WarningOutlined,
  BookOutlined,
  RocketOutlined,
  BarChartOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

// Types matching the FastAPI response

type Skill = {
  skill: string;
  job_count: number;
  frequency_percentage: number;
  priority: string;
};

type Recommendation = {
  skill: string;
  priority: string;
  reason: string;
  learning_action: string;
};

type RoadmapStep = {
  step: number;
  topic: string;
  goal: string;
};

type ProjectIdea = {
  title: string;
  description: string;
  technologies: string[];
  learning_outcomes: string[];
};

export type SkillGapData = {
  target_role: string;

  overview: {
    jobs_analysed: number;
    profile_skill_count: number;
    profile_skills_found_in_sample: number;
    high_priority_gaps: number;
    skill_coverage: number;
  };

  skill_assessment: {
    profile_skills: string[];
    matched_in_sample: Skill[];
    high_priority_gaps: Skill[];
    medium_priority_gaps: Skill[];
    low_priority_gaps: Skill[];
  };

  recommendations: {
    summary: string;
    top_recommendations: Recommendation[];
    learning_roadmap: RoadmapStep[];
    project_idea?: string | ProjectIdea;
  };

  data_quality: {
    sample_size: number;
    warning: string;
  };
};

type Props = {
  data: SkillGapData;
};

function SkillList({
  title,
  skills,
  color,
}: {
  title: string;
  skills: Skill[];
  color: string;
}) {
  return (
    <Card
      title={title}
      bordered={false}
      style={{ borderRadius: 12, height: "100%" }}
    >
      {skills.length === 0 ? (
        <Text type="secondary">No skills in this category.</Text>
      ) : (
        <List
          dataSource={skills}
          renderItem={(item) => (
            <List.Item>
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <Text strong>{item.skill}</Text>
                  <Tag color={color}>
                    {item.frequency_percentage}%
                  </Tag>
                </div>

                <Text type="secondary" style={{ fontSize: 12 }}>
                  Appears in {item.job_count} of analysed jobs
                </Text>

                <Progress
                  percent={item.frequency_percentage}
                  showInfo={false}
                  size="small"
                  strokeColor={color}
                />
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
}

export default function SkillGapResults({ data }: Props) {
  const { overview, skill_assessment, recommendations } = data;

  const metrics = [
    {
      title: "Jobs Analysed",
      value: overview.jobs_analysed,
      suffix: "",
    },
    {
      title: "Your Profile Skills",
      value: overview.profile_skill_count,
      suffix: "",
    },
    {
      title: "Found in Job Sample",
      value: overview.profile_skills_found_in_sample,
      suffix: "",
    },
    {
      title: "High Priority Gaps",
      value: overview.high_priority_gaps,
      suffix: "",
    },
  ];

  return (
    <div style={{ width: "100%", marginTop: 12 }}>
      {/* Header */}

      <div style={{ marginBottom: 20 }}>
        <Space>
          <BarChartOutlined style={{ fontSize: 22, color: "#1677ff" }} />
          <Title level={4} style={{ margin: 0 }}>
            Skill Gap Analysis
          </Title>
        </Space>

        <Paragraph type="secondary" style={{ marginTop: 6 }}>
          Career readiness assessment for{" "}
          <Text strong>{data.target_role}</Text>
        </Paragraph>
      </div>

      {/* Overview cards */}

      <Row gutter={[12, 12]}>
        {metrics.map((metric) => (
          <Col xs={12} md={6} key={metric.title}>
            <Card bordered={false} style={{ borderRadius: 12 }}>
              <Text type="secondary">{metric.title}</Text>

              <Title level={2} style={{ margin: "8px 0 0" }}>
                {metric.value}
                {metric.suffix}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Skill coverage */}

      <Card
        bordered={false}
        style={{ marginTop: 16, borderRadius: 12 }}
      >
        <Title level={5}>Relevant Skill Coverage</Title>

        <Progress
          percent={overview.skill_coverage}
          strokeColor="#1677ff"
          size="default"
        />

        <Text type="secondary">
          Based on relevant skills identified in the analysed job sample.
          This is not an overall employability score.
        </Text>
      </Card>

      {/* Existing skills */}

      <Card
        bordered={false}
        style={{ marginTop: 16, borderRadius: 12 }}
      >
        <Space>
          <CheckCircleOutlined style={{ color: "#16a34a" }} />
          <Title level={5} style={{ margin: 0 }}>
            Your Existing Skills
          </Title>
        </Space>

        <div style={{ marginTop: 16 }}>
          {skill_assessment.profile_skills.map((skill) => (
            <Tag
              color="success"
              key={skill}
              style={{ padding: "5px 10px", marginBottom: 8 }}
            >
              {skill}
            </Tag>
          ))}
        </div>

        <Divider />

        <Text strong>Found in analysed job postings</Text>

        <div style={{ marginTop: 12 }}>
          {skill_assessment.matched_in_sample.map((skill) => (
            <Tag color="green" key={skill.skill}>
              {skill.skill} · {skill.frequency_percentage}%
            </Tag>
          ))}
        </div>

        <Text
          type="secondary"
          style={{ display: "block", marginTop: 10, fontSize: 12 }}
        >
          A profile skill not appearing in the sample is not necessarily
          a skill gap.
        </Text>
      </Card>

      {/* Skill gaps */}

      <div style={{ marginTop: 24 }}>
        <Space style={{ marginBottom: 14 }}>
          <WarningOutlined style={{ color: "#faad14" }} />
          <Title level={4} style={{ margin: 0 }}>
            Skills to Develop
          </Title>
        </Space>

        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <SkillList
              title="High Priority"
              skills={skill_assessment.high_priority_gaps}
              color="#ef4444"
            />
          </Col>

          <Col xs={24} md={12}>
            <SkillList
              title="Medium Priority"
              skills={skill_assessment.medium_priority_gaps}
              color="#faad14"
            />
          </Col>

          <Col xs={24}>
            <SkillList
              title="Lower Priority"
              skills={skill_assessment.low_priority_gaps}
              color="#1677ff"
            />
          </Col>
        </Row>
      </div>

      {/* AI recommendations */}

      <Card
        bordered={false}
        style={{ marginTop: 24, borderRadius: 12 }}
      >
        <Space>
          <BulbOutlined style={{ color: "#1677ff", fontSize: 20 }} />
          <Title level={4} style={{ margin: 0 }}>
            AI Career Recommendations
          </Title>
        </Space>

        <Paragraph style={{ marginTop: 16 }}>
          {recommendations.summary}
        </Paragraph>

        <Divider />

        {recommendations.top_recommendations.map((item) => (
          <Card
            key={item.skill}
            size="small"
            style={{ marginBottom: 12, borderRadius: 10 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <Text strong>{item.skill}</Text>

              <Tag
                color={
                  item.priority === "high"
                    ? "red"
                    : item.priority === "medium"
                    ? "orange"
                    : "blue"
                }
              >
                {item.priority} priority
              </Tag>
            </div>

            <Paragraph style={{ marginTop: 10, marginBottom: 6 }}>
              {item.reason}
            </Paragraph>

            <Text type="secondary">
              <strong>Learning action:</strong> {item.learning_action}
            </Text>
          </Card>
        ))}
      </Card>

      {/* Learning roadmap */}

      <Card
        bordered={false}
        style={{ marginTop: 16, borderRadius: 12 }}
      >
        <Space>
          <BookOutlined style={{ color: "#1677ff", fontSize: 20 }} />
          <Title level={4} style={{ margin: 0 }}>
            Your Learning Roadmap
          </Title>
        </Space>

        <List
          style={{ marginTop: 16 }}
          dataSource={recommendations.learning_roadmap}
          renderItem={(item) => (
            <List.Item>
              <Space align="start">
                <Tag color="blue">{item.step}</Tag>

                <div>
                  <Text strong>{item.topic}</Text>

                  <Paragraph
                    type="secondary"
                    style={{ marginBottom: 0 }}
                  >
                    {item.goal}
                  </Paragraph>
                </div>
              </Space>
            </List.Item>
          )}
        />
      </Card>

      {/* Project idea */}

      {recommendations.project_idea && (
        <Card
          bordered={false}
          style={{ marginTop: 16, borderRadius: 12 }}
        >
          <Space>
            <RocketOutlined style={{ color: "#1677ff", fontSize: 20 }} />
            <Title level={4} style={{ margin: 0 }}>
              Recommended Project
            </Title>
          </Space>

          {typeof recommendations.project_idea === "string" ? (
            <Paragraph style={{ marginTop: 16 }}>
              {recommendations.project_idea}
            </Paragraph>
          ) : (
            <div style={{ marginTop: 16 }}>
              <Title level={5}>
                {recommendations.project_idea.title}
              </Title>

              <Paragraph>
                {recommendations.project_idea.description}
              </Paragraph>

              <Text strong>Technologies</Text>

              <div style={{ marginTop: 8 }}>
                {recommendations.project_idea.technologies.map((tech) => (
                  <Tag key={tech} color="blue">
                    {tech}
                  </Tag>
                ))}
              </div>

              <Divider />

              <Text strong>Learning Outcomes</Text>

              <List
                size="small"
                dataSource={recommendations.project_idea.learning_outcomes}
                renderItem={(outcome) => (
                  <List.Item>{outcome}</List.Item>
                )}
              />
            </div>
          )}
        </Card>
      )}

      {/* Data quality */}

      <Card
        bordered={false}
        style={{
          marginTop: 16,
          borderRadius: 12,
          background: "#fffbe6",
        }}
      >
        <Text strong>Analysis limitations</Text>

        <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>
          {data.data_quality.warning}
        </Paragraph>

        <Text type="secondary" style={{ fontSize: 12 }}>
          Sample size: {data.data_quality.sample_size} job postings.
        </Text>
      </Card>
    </div>
  );
}
