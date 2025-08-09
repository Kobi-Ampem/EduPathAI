import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Briefcase, Heart, Search } from 'lucide-react';
import { Screen, Tip } from '../types';
import { tips } from '../data/tipsData';

interface TipsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const TipsScreen: React.FC<TipsScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'academic' | 'career' | 'mental-health'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Tips', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'academic', label: 'Academic', icon: BookOpen, color: 'bg-green-500' },
    { id: 'career', label: 'Career', icon: Briefcase, color: 'bg-purple-500' },
    { id: 'mental-health', label: 'Mental Health', icon: Heart, color: 'bg-pink-500' },
  ];

  const filteredTips = tips.filter(tip => {
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <button
          onClick={() => onNavigate('welcome')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">
          Tips & Guidance
        </h1>
        <div className="w-10" />
      </div>

      {/* Search */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tips..."
            className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tips List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
          
          {filteredTips.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No tips found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TipCard: React.FC<{ tip: Tip }> = ({ tip }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-green-100 text-green-800';
      case 'career': return 'bg-purple-100 text-purple-800';
      case 'mental-health': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-2">
          {tip.title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tip.category)}`}>
          {tip.category.replace('-', ' ')}
        </span>
      </div>
      
      <p className={`text-gray-600 leading-relaxed mb-4 ${isExpanded ? '' : 'line-clamp-3'}`}>
        {tip.content}
      </p>

      {tip.content.length > 150 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {tip.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tip.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TipsScreen;