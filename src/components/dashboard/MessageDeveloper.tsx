import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const MessageDeveloper: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending email
    try {
      // In a real app, this would send to lupinter33@gmail.com
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="bg-black/90 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Mail className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-mono font-bold text-green-400 mb-2">
            Message Developer
          </h2>
          <p className="text-green-600 font-mono">
            Send a message directly to PlankDev
          </p>
        </div>

        {/* Contact Info */}
        <div className="mb-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Mail className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-mono">lupinter33@gmail.com</span>
          </div>
          <p className="text-green-600 text-sm font-mono">
            Messages will be sent directly to the developer's email
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-green-400 font-mono text-sm mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-green-400 font-mono text-sm mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Your Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-green-400 font-mono text-sm mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 h-40 resize-none"
              placeholder="Type your message here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-mono text-lg px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>{sending ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-green-600 font-mono text-sm">
          <p>Response time: Usually within 24 hours</p>
          <p className="mt-1">For urgent matters, contact via WhatsApp: 083824299082</p>
        </div>
      </div>
    </div>
  );
};

export default MessageDeveloper;