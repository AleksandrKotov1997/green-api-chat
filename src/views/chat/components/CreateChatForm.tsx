import { Alert, Button, Form, Input } from "antd";

import type { CreateChatFormValues } from "../types";

type Props = {
  isSubmitting: boolean;
  errorMessage: string | null;
  onSubmit: (values: CreateChatFormValues) => Promise<void>;
};

export const CreateChatForm = ({
  isSubmitting,
  errorMessage,
  onSubmit,
}: Props) => {
  return (
    <Form<CreateChatFormValues>
      className="chat-form"
      layout="vertical"
      requiredMark={false}
      onFinish={onSubmit}
    >
      <Form.Item
        label="ID Instance"
        name="idInstance"
        rules={[
          {
            required: true,
            message: "Enter ID Instance.",
          },
        ]}
      >
        <Input placeholder="Enter ID Instance" disabled={isSubmitting} />
      </Form.Item>

      <Form.Item
        label="API Token Instance"
        name="apiTokenInstance"
        rules={[
          {
            required: true,
            message: "Enter API Token Instance.",
          },
        ]}
      >
        <Input.Password
          placeholder="Enter API Token Instance"
          disabled={isSubmitting}
        />
      </Form.Item>

      <Form.Item
        label="Phone number"
        name="phoneNumber"
        rules={[
          {
            required: true,
            message: "Enter phone number.",
          },
          {
            pattern: /^[0-9]+$/,
            message: "Phone number must contain digits only.",
          },
        ]}
      >
        <Input
          inputMode="numeric"
          placeholder="77001234567"
          disabled={isSubmitting}
        />
      </Form.Item>

      {errorMessage && <Alert type="error" title={errorMessage} showIcon />}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting} block>
          Create chat
        </Button>
      </Form.Item>
    </Form>
  );
};
