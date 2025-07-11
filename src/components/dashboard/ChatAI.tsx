import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Code, Zap, Terminal } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Hello! I'm Ryuu Izumi AI, your AI assistant. I can help you with:

• Penetration testing techniques
• Searching for news information
• Providing AI explanations
• AI task functions
• AI feature recommendations
• Programming and scripting for security

What do you want to know about ai today?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('penetration') || input.includes('pentest')) {
      return `For penetration testing, I recommend following these steps:
      
Di tengah gempuran teknologi digital, Artificial Intelligence (AI) telah menjelma menjadi pusat revolusi industri modern. Mulai dari chatbot hingga mobil tanpa pengemudi, AI tak lagi sekadar istilah futuristik, melainkan sudah menjadi kenyataan yang akrab dengan keseharian kita.

Namun, bagaimana cara yang tepat untuk mulai memahami dan menerapkan AI? Berikut ini adalah langkah-langkah strategis yang dapat dijadikan panduan:

🔍 1. Menentukan Tujuan dengan Jelas
Sebelum melangkah terlalu jauh, penting untuk mengetahui: untuk apa AI dibutuhkan? Apakah untuk mempercepat layanan pelanggan, menganalisis data penjualan, atau menciptakan sistem rekomendasi? Tujuan yang jelas akan menentukan jalur implementasi yang tepat.

📊 2. Persiapan dan Pengolahan Data
Dalam dunia AI, data adalah “bahan baku” utama. Proses ini mencakup mengumpulkan data, membersihkan, dan menyusunnya dalam format yang bisa dibaca mesin. Tanpa data yang baik, algoritma AI tak akan bekerja optimal.

🧰 3. Memilih Teknologi dan Algoritma yang Sesuai
Setiap permasalahan membutuhkan pendekatan berbeda. Untuk visual, gunakan CNN (Convolutional Neural Network). Untuk teks, pertimbangkan LSTM atau Transformer. Teknologi harus disesuaikan dengan jenis data dan tujuan.

🧪 4. Proses Pelatihan dan Uji Model
Inilah saatnya ‘melatih’ AI. Data dimasukkan ke dalam model, lalu dilakukan proses training agar sistem belajar membuat prediksi. Setelah itu, model diuji menggunakan data berbeda untuk menilai akurasinya.

🚀 5. Implementasi ke Dunia Nyata
Setelah lulus uji, AI siap diterapkan. Ini bisa berupa integrasi dalam aplikasi, sistem backend, atau bahkan perangkat pintar. Tahap ini juga menyangkut keamanan, keandalan, dan efisiensi penggunaan AI.

🔄 6. Evaluasi dan Penyempurnaan Berkala
AI bukan sistem sekali jadi. Ia butuh pemantauan dan pembaruan berkala. Data bisa berubah, tren bisa bergeser, dan AI harus menyesuaikan diri melalui retraining atau fine-tuning.

🛠️ Beberapa Tools Populer dalam Dunia AI

TensorFlow & PyTorch: Untuk deep learning dan eksperimen skala besar

scikit-learn: Ideal untuk machine learning klasik

Jupyter Notebook: Tempat coding sambil dokumentasi

Google Colab: Alternatif gratis berbasis cloud

Hugging Face: Surga bagi pecinta NLP dan model open source

🎯 Kesimpulan
AI bukan sekadar robot canggih, tapi juga alat bantu yang bisa mendongkrak efisiensi, kreativitas, bahkan produktivitas manusia. Asalkan digunakan dengan strategi yang tepat, AI bisa menjadi partner terbaik di era modern ini.

Would you like me to elaborate on any specific phase?`;
    }

    if (input.includes('code') || input.includes('programming')) {
      return `I can help you with secure coding practices! Here are some key principles:

• **Input validation**: Always validate and sanitize user input
• **Authentication**: Implement strong authentication mechanisms
• **Authorization**: Ensure proper access controls
• **Encryption**: Use encryption for sensitive data
• **Error handling**: Don't expose sensitive information in errors
• **SQL injection prevention**: Use parameterized queries
• **XSS prevention**: Sanitize output and use CSP headers

What specific language or vulnerability would you like to discuss?`;
    }

    if (input.includes('vulnerability') || input.includes('security')) {
      return `Common security vulnerabilities to watch for:

**OWASP Top 10:**
1. Injection attacks (SQL, NoSQL, OS)
2. Broken authentication
3. Sensitive data exposure
4. XML external entities (XXE)
5. Broken access control
6. Security misconfigurations
7. Cross-site scripting (XSS)
8. Insecure deserialization
9. Known vulnerabilities in components
10. Insufficient logging & monitoring

Each requires specific mitigation strategies. Which one interests you most?`;
    }

    if (input.includes('information') || input.includes('recommend')) {
      return `🤖 Apa Itu Artificial Intelligence (AI)?

Artificial Intelligence (AI) atau Kecerdasan Buatan adalah cabang ilmu komputer yang bertujuan menciptakan mesin atau sistem yang dapat meniru kecerdasan manusia. Mulai dari belajar, mengambil keputusan, memecahkan masalah, hingga mengenali suara dan gambar — AI memungkinkan mesin melakukan hal-hal yang dulunya hanya bisa dilakukan oleh otak manusia.

🔍 Sejarah Singkat AI

Konsep AI sudah muncul sejak tahun 1950-an, saat ilmuwan komputer Alan Turing mengajukan pertanyaan legendaris: "Bisakah mesin berpikir?"
Namun, baru di era digital saat ini AI berkembang pesat berkat kemajuan komputasi, Big Data, dan algoritma pembelajaran mesin (machine learning).


---

🧠 Jenis-Jenis AI

Jenis AI	Penjelasan

Narrow AI (ANI)	Kecerdasan untuk tugas khusus, seperti Siri, Google Translate, Chatbot
General AI (AGI)	Setara dengan otak manusia, masih dalam tahap pengembangan teoritis
Super AI (ASI)	Melebihi kecerdasan manusia — masih fiksi ilmiah untuk saat ini

🛠️ Bagaimana AI Bekerja?

AI bekerja berdasarkan tiga komponen utama:

1. Data – Sebanyak mungkin dan berkualitas tinggi.
2. Algoritma – Seperti otak yang belajar dari data.
3. Komputasi – Kemampuan mesin memproses informasi (semakin cepat, semakin pintar).


Contohnya, saat kamu menggunakan Netflix, AI menganalisis film yang kamu tonton, lalu merekomendasikan tontonan lain berdasarkan pola kebiasaanmu.

📚 Contoh Penerapan AI di Kehidupan Sehari-Hari

Google Assistant / Siri / Alexa: Asisten pintar berbasis suara

E-commerce: Rekomendasi produk di Shopee, Tokopedia, Amazon
Media Sosial: Algoritma TikTok & Instagram yang menyesuaikan feed
Kesehatan: Diagnosa penyakit lewat gambar X-ray
Finansial: AI mendeteksi penipuan transaksi bank
Crypto: Bot trading dan analisis grafik otomatis

🔧 Tools & Teknologi Populer dalam AI

Python (bahasa pemrograman utama untuk AI)
TensorFlow, PyTorch (library machine learning)
scikit-learn, Keras, Hugging Face (untuk NLP & data science)
Jupyter Notebook (coding interaktif dan visualisasi data)

🚨 Tantangan & Etika AI

AI bukan tanpa risiko. Beberapa isu penting meliputi:

Privasi Data

Bias Algoritma (AI bisa salah jika datanya berat sebelah)
Pengangguran karena otomatisasi
Penyalahgunaan teknologi (deepfake, AI untuk serangan siber)

Karena itu, etika dalam penggunaan AI menjadi sangat penting dan harus diatur dengan bijak.

What type of security testing are you planning?`;
    }

    return `I understand you're asking about "${userInput}". As a ai AI, I can provide guidance on:

• Security best practices
• Vulnerability assessment
• Penetration testing methodologies
• Secure coding techniques
• Tool recommendations
• Incident response procedures

Could you be more specific about what aspect of ai you'd like to explore? I'm here to help you learn and implement secure practices!`;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-black/90 border border-green-500/30 rounded-xl overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="p-6 border-b border-green-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-mono font-bold text-green-400">
                Ryuu Izumi AI
              </h2>
              <p className="text-green-600 font-mono">
                Your Ai Assistant
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 max-h-[calc(100vh-400px)]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-green-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                  <span className="font-mono text-xs">
                    {message.type === 'user' ? 'You' : 'RyuuIzumi AI'}
                  </span>
                </div>
                <pre className="font-mono text-sm whitespace-pre-wrap">
                  {message.content}
                </pre>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-green-300 px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <span className="font-mono text-xs">RyuuIzumi AI</span>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span className="font-mono text-sm ml-2">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-green-500/30">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about cybersecurity..."
              className="flex-1 px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="p-4 border-t border-green-500/30">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setInput('How do I perform a penetration test?')}
              className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 font-mono text-sm hover:bg-green-600/30 transition-colors"
            >
              <Terminal className="w-4 h-4 inline mr-1" />
              Penetration Testing
            </button>
            <button
              onClick={() => setInput('What are common security vulnerabilities?')}
              className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 font-mono text-sm hover:bg-green-600/30 transition-colors"
            >
              <Zap className="w-4 h-4 inline mr-1" />
              Vulnerabilities
            </button>
            <button
              onClick={() => setInput('Show me secure coding practices')}
              className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400 font-mono text-sm hover:bg-green-600/30 transition-colors"
            >
              <Code className="w-4 h-4 inline mr-1" />
              Secure Coding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;