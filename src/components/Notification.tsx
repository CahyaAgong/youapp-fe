import { useEffect, useState } from "react";

interface NotificationProps {
  messages: string[];
  duration?: number;
}

export default function Notification(props: NotificationProps) {
  const { messages, duration = 3000 } = props

  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null; 

  return (
    <div className="px-4 py-3 rounded-lg bg-blue-400 text-blue-50 font-semibold text-sm">
      {messages.length > 0 && messages.map((msg: string, idx) => (<span key={idx}>{msg}</span>))}
    </div>
  )
}