import axios from "axios";

const SLACK_WEBHOOK_URL = "YOU_DESIRE_WEBHOOK_URL";

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
