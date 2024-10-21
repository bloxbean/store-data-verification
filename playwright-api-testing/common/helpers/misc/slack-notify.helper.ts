import axios from "axios";

const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";

export const sendSlackNotification = async (message: string) => {
  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: message,
    });
    console.log("Notification sent to Slack successfully");
  } catch (error) {
    console.error("Error sending notification to Slack:", error);
  }
};
