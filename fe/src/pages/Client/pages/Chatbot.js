import { useEffect, useRef, useState } from 'react';
import '../styles/Chatbot.scss';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      content: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      quickReplies: ['Giờ làm việc', 'Liên hệ', 'Dịch vụ'],
    },
  ]);

  const responses = {
    'xin chào': 'Xin chào! Tôi có thể giúp gì cho bạn?',
    hello: 'Hello! How can I help you?',
    'giờ làm việc': 'Chúng tôi làm việc từ 8:00 - 18:00, Thứ 2 - Thứ 6. \nThứ 7: 8:00 - 12:00',
    'liên hệ': '📞 Hotline: 0123456789\n📧 Email: huynnse183313@fpt.edu.vn\n🏢 Đại học FPT',
    'dịch vụ': {
      content: '• Đăng ký hiến máu\n• Quà tặng\n• Giải đáp thắc mắc',
      quickReplies: ['Đăng ký hiến máu', 'Quà tặng', 'Giải đáp thắc mắc']
    },
    'đăng ký hiến máu': '🩸 Vui lòng điền vào form đăng ký hiến máu  hoặc đến trực tiếp trung tâm Blood Bridge để thực hiện quy trình.',
    'quà tặng': '🎁 Vui lòng đăng nhập để xem và đổi các phần quà hấp dẫn dành cho người hiến máu.',
    'giải đáp thắc mắc': '❓ Bạn vui lòng liên hệ Hotline: 1900-6848 để được giải đáp chi tiết mọi thắc mắc.',
    default: 'Xin lỗi, tôi chưa hiểu câu hỏi. Bạn có thể diễn đạt lại hoặc liên hệ hotline.',
  };

  const chatEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (content) => {
    if (!content) return;
    setMessages((prev) => [...prev, { sender: 'user', content }]);
    setIsTyping(true);
    setTimeout(() => {
      const lower = content.toLowerCase();
      const matchedKey = Object.keys(responses).find((key) => lower === key.toLowerCase()) || 'default';
      const response = responses[matchedKey];

      if (typeof response === 'string') {
        setMessages((prev) => [...prev, { sender: 'bot', content: response }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', content: response.content, quickReplies: response.quickReplies }]);
      }

      setIsTyping(false);
    }, 800);
  };

  const handleQuickReply = (text) => {
    sendMessage(text);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="chatbot-container">
      <div className="chat-button" onClick={toggleChat}>💬</div>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Hỗ trợ khách hàng</span>
            <button onClick={toggleChat}>✖</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                {msg.quickReplies && (
                  <div className="quick-replies">
                    {msg.quickReplies.map((reply, i) => (
                      <button key={i} className="quick-reply" onClick={() => handleQuickReply(reply)}>
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && <div className="message bot">Đang nhập...</div>}
            <div ref={chatEndRef} />
          </div>
          <ChatInput onSend={sendMessage} />
        </div>
      )}
    </div>
  );
};

const ChatInput = ({ onSend }) => {
  const [value, setValue] = useState('');
  const handleSend = () => {
    onSend(value);
    setValue('');
  };
  return (
    <div className="chat-input">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập tin nhắn..."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <button onClick={handleSend}>➤</button>
    </div>
  );
};

export default Chatbot;