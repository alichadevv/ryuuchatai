import React from 'react';
import { Star, User } from 'lucide-react';

const Rating: React.FC = () => {
  const ratings = [
    { id: 1, name: 'Alex Johnson', rating: 5, message: 'Amazing hacker community platform! The security features are top-notch.' },
    { id: 2, name: 'Sarah Chen', rating: 5, message: 'RyuuIzumi has the best penetration testing tools. Highly recommend!' },
    { id: 3, name: 'Mike Rodriguez', rating: 5, message: 'Excellent platform for cybersecurity enthusiasts. Great community support.' },
    { id: 4, name: 'Emma Wilson', rating: 5, message: 'The chat features are incredible. Perfect for secure communications.' },
    { id: 5, name: 'David Kim', rating: 5, message: 'PlankDev is a genius! This platform changed my approach to security testing.' },
    { id: 6, name: 'Lisa Thompson', rating: 5, message: 'Best hacker community I have ever joined. The tools are professional grade.' },
    { id: 7, name: 'James Brown', rating: 5, message: 'Outstanding platform with cutting-edge security features.' },
    { id: 8, name: 'Maria Garcia', rating: 5, message: 'RyuuIzumi provides everything needed for ethical hacking. Love it!' },
    { id: 9, name: 'Chris Lee', rating: 5, message: 'The interface is amazing and the community is very helpful.' },
    { id: 10, name: 'Anna Davis', rating: 5, message: 'Professional-grade security tools in an easy-to-use platform.' },
    { id: 11, name: 'Robert Taylor', rating: 5, message: 'Incredible platform for cybersecurity professionals. Highly recommended!' },
    { id: 12, name: 'Jessica Miller', rating: 5, message: 'RyuuIzumi has revolutionized my penetration testing workflow.' },
    { id: 13, name: 'Michael Anderson', rating: 5, message: 'Best security platform available. The developer is incredibly skilled.' },
    { id: 14, name: 'Rachel White', rating: 5, message: 'Amazing community and excellent security features. 10/10!' },
    { id: 15, name: 'Kevin Martinez', rating: 5, message: 'PlankDev created something truly special. This platform is fantastic!' },
    { id: 16, name: 'Sophia Johnson', rating: 5, message: 'The security tools are professional-grade. Excellent work!' },
    { id: 17, name: 'Daniel Wilson', rating: 5, message: 'Perfect platform for ethical hackers. Great community support.' },
    { id: 18, name: 'Olivia Brown', rating: 5, message: 'RyuuIzumi is the future of cybersecurity platforms.' },
    { id: 19, name: 'William Jones', rating: 5, message: 'Outstanding platform with incredible security features.' },
    { id: 20, name: 'Grace Lee', rating: 5, message: 'Best hacker community platform I have ever used!' },
    { id: 21, name: 'Thomas Garcia', rating: 5, message: 'RyuuIzumi provides everything needed for security testing.' },
    { id: 22, name: 'Isabella Davis', rating: 5, message: 'Amazing platform with excellent developer support.' },
    { id: 23, name: 'Mason Rodriguez', rating: 5, message: 'The security tools are incredibly advanced. Love this platform!' },
    { id: 24, name: 'Ava Thompson', rating: 5, message: 'PlankDev is a mastermind! This platform is incredible.' },
    { id: 25, name: 'Ethan Wilson', rating: 5, message: 'Best cybersecurity platform available. Highly recommend!' },
    { id: 26, name: 'Mia Johnson', rating: 5, message: 'RyuuIzumi has changed my approach to ethical hacking.' },
    { id: 27, name: 'Alexander Brown', rating: 5, message: 'Outstanding platform with professional-grade security tools.' },
    { id: 28, name: 'Charlotte Lee', rating: 5, message: 'Incredible community and amazing security features.' },
    { id: 29, name: 'Benjamin Garcia', rating: 5, message: 'RyuuIzumi is the ultimate platform for security professionals.' },
    { id: 30, name: 'Amelia Davis', rating: 5, message: 'Perfect platform for cybersecurity enthusiasts. 5 stars!' }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="bg-black/90 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-mono font-bold text-green-400 mb-2">
            User Ratings
          </h2>
          <p className="text-green-600 font-mono">
            What our community members say about RyuuIzumi
          </p>
        </div>

        {/* Overall Rating */}
        <div className="text-center mb-8 p-6 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex justify-center mb-2">
            {renderStars(5)}
          </div>
          <div className="text-3xl font-mono font-bold text-green-400 mb-2">5.0</div>
          <p className="text-green-600 font-mono">Based on {ratings.length} reviews</p>
        </div>

        {/* Ratings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ratings.map((rating) => (
            <div
              key={rating.id}
              className="bg-black/50 border border-green-500/30 rounded-lg p-6 hover:border-green-400 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-green-400 font-mono font-bold text-sm">{rating.name}</h3>
                  <div className="flex items-center space-x-2">
                    {renderStars(rating.rating)}
                  </div>
                </div>
              </div>
              
              <p className="text-green-300 font-mono text-sm leading-relaxed">
                "{rating.message}"
              </p>
            </div>
          ))}
        </div>

        {/* Add Your Rating */}
        <div className="mt-8 text-center">
          <h3 className="text-green-400 font-mono text-lg font-bold mb-4">
            Share Your Experience
          </h3>
          <div className="flex justify-center space-x-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                className="text-gray-600 hover:text-yellow-400 transition-colors"
              >
                <Star className="w-8 h-8" />
              </button>
            ))}
          </div>
          <textarea
            placeholder="Write your review..."
            className="w-full max-w-md mx-auto px-4 py-3 bg-black/50 border border-green-500/50 rounded-lg text-green-300 font-mono focus:outline-none focus:border-green-400 h-24 resize-none"
          />
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-mono px-6 py-2 rounded-lg transition-colors">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rating;