import { notification } from "antd";
const [api] = notification.useNotification();

//notificationType: 'success', 'info', 'warning', 'error'
export const notify = (title, content, notificationType: NotificationType = 'info') => {
  api[notificationType]({
    message: title,
    description: content,
  });
};
