# web-services

```import React, { useState } from 'react';
import { Search, Menu, ShoppingCart, Bell, Zap, Star, ChevronDown, Layers, Globe, Filter, Sparkles } from 'lucide-react';

const EpicMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [darkMode, setDarkMode] = useState(true);

  const categories = ['All', 'Weapons', 'Armor', 'Mods', 'Characters', 'Vehicles', 'Collectibles'];
  
  // Sample trending items data
  const trendingItems = [
    { id: 1, name: 'Cosmic Blade', price: '2,400', currency: 'Ξ', rarity: 'Legendary', seller: 'CryptoWarrior', img: '/api/placeholder/100/100' },
    { id: 2, name: 'Void Shield', price: '1,850', currency: 'Ξ', rarity: 'Epic', seller: 'NebulaTrade', img: '/api/placeholder/100/100' },
    { id: 3, name: 'Quantum Core', price: '3,200', currency: 'Ξ', rarity: 'Mythical', seller: 'StardustMerchant', img: '/api/placeholder/100/100' },
    { id: 4, name: 'Plasma Rifle', price: '980', currency: 'Ξ', rarity: 'Rare', seller: 'GalacticEmporium', img: '/api/placeholder/100/100' },
  ];
  
  // Marketplace listings data
  const listings = [
    { id: 101, name: 'Ethereal Wings', price: '4,750', currency: 'Ξ', category: 'Armor', rarity: 'Celestial', seller: 'CosmicTrader', img: '/api/placeholder/220/130' },
    { id: 102, name: 'Dragonfury Blade', price: '5,200', currency: 'Ξ', category: 'Weapons', rarity: 'Mythical', seller: 'LegendaryLoot', img: '/api/placeholder/220/130' },
    { id: 103, name: 'Quantum Stealth Suit', price: '6,800', currency: 'Ξ', category: 'Armor', rarity: 'Legendary', seller: 'PhantomDealer', img: '/api/placeholder/220/130' },
    { id: 104, name: 'Nebula Rider', price: '12,000', currency: 'Ξ', category: 'Vehicles', rarity: 'Celestial', seller: 'StardustMerchant', img: '/api/placeholder/220/130' },
    { id: 105, name: 'Chronos Time Mod', price: '8,400', currency: 'Ξ', category: 'Mods', rarity: 'Celestial', seller: 'QuantumCollector', img: '/api/placeholder/220/130' },
    { id: 106, name: 'Phoenix Champion', price: '15,750', currency: 'Ξ', category: 'Characters', rarity: 'Mythical', seller: 'EternalTrader', img: '/api/placeholder/220/130' },
  ];

  const rarityColors = {
    'Common': 'bg-gray-500',
    'Uncommon': 'bg-green-500',
    'Rare': 'bg-blue-500',
    'Epic': 'bg-purple-500',
    'Legendary': 'bg-yellow-500',
    'Mythical': 'bg-pink-500',
    'Celestial': 'bg-cyan-400',
  };

  // Background gradient based on dark mode
  const bgStyle = darkMode 
    ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white' 
    : 'bg-gradient-to-br from-slate-100 via-white to-gray-100 text-gray-900';

  return (
    <div className={`min-h-screen ${bgStyle}`}>
      {/* Header */}
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-cyan-400" size={24} />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                NEXUS MARKET
              </span>
            </div>
            
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for items, sellers, collections..." 
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-800 transition"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-800 transition">
                <Globe size={20} className="text-gray-300" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-800 transition">
                <Bell size={20} className="text-gray-300" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-800 transition">
                <ShoppingCart size={20} className="text-gray-300" />
              </button>
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-sm font-bold">NX</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-cyan-900/90 z-10"></div>
        <img src="/api/placeholder/1200/300" alt="Marketplace Banner" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                Trade Beyond Boundaries
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
              Discover rare artifacts, legendary weapons, and cosmic treasures across the multiverse
            </p>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition">
              Explore the Marketplace
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="border-b border-gray-700 sticky top-0 z-30 bg-opacity-95 backdrop-blur-sm" style={{ backgroundColor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex space-x-1 overflow-x-auto no-scrollbar">
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    activeCategory === category 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700">
                <Filter size={16} />
                <span>Filters</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700">
                <Layers size={16} />
                <span>Sort</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Trending Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Zap className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-bold">Trending Now</h2>
            </div>
            <button className="text-cyan-400 hover:text-cyan-300 font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingItems.map(item => (
              <div key={item.id} className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="relative">
                  <img src={item.img} alt={item.name} className="w-full h-32 object-cover" />
                  <div className={`absolute top-2 right-2 ${rarityColors[item.rarity]} px-2 py-1 rounded text-xs font-bold`}>
                    {item.rarity}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">by {item.seller}</span>
                    <div className="flex items-center text-yellow-500">
                      <Star size={14} className="fill-yellow-500" />
                      <Star size={14} className="fill-yellow-500" />
                      <Star size={14} className="fill-yellow-500" />
                      <Star size={14} className="fill-yellow-500" />
                      <Star size={14} className="fill-yellow-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xl">{item.currency}{item.price}</span>
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded px-3 py-1 text-sm">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Main Listings */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Listings</h2>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">View:</span>
              <button className="bg-gray-800 p-2 rounded">
                <Layers size={16} />
              </button>
              <button className="p-2">
                <Menu size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(item => (
              <div key={item.id} className="group bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
                <div className="relative">
                  <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
                  <div className={`absolute top-3 right-3 ${rarityColors[item.rarity]} px-2 py-1 rounded-md text-xs font-bold`}>
                    {item.rarity}
                  </div>
                  <div className="absolute top-3 left-3 bg-gray-900 bg-opacity-80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl group-hover:text-purple-400 transition">{item.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-white font-medium">4.9</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-sm">by <span className="text-cyan-400 hover:underline cursor-pointer">{item.seller}</span></span>
                    <span className="text-gray-400 text-sm">Stock: 1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-400 text-xs">Current price</span>
                      <div className="font-bold text-2xl">{item.currency}{item.price}</div>
                    </div>
                    <button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg border border-gray-700">
              Load More Items
            </button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="text-cyan-400" size={20} />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                  NEXUS MARKET
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate marketplace for digital assets across the multiverse.
              </p>
              <div className="flex space-x-4">
                <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-cyan-400">𝕏</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-cyan-400">ᴅ</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-cyan-400">ɪɢ</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Marketplace</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400">All Items</a></li>
                <li><a href="#" className="hover:text-cyan-400">Featured</a></li>
                <li><a href="#" className="hover:text-cyan-400">New Arrivals</a></li>
                <li><a href="#" className="hover:text-cyan-400">Trending</a></li>
                <li><a href="#" className="hover:text-cyan-400">Special Offers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Account</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400">Profile</a></li>
                <li><a href="#" className="hover:text-cyan-400">Inventory</a></li>
                <li><a href="#" className="hover:text-cyan-400">Collections</a></li>
                <li><a href="#" className="hover:text-cyan-400">Watchlist</a></li>
                <li><a href="#" className="hover:text-cyan-400">Settings</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400">FAQ</a></li>
                <li><a href="#" className="hover:text-cyan-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-cyan-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2025 Nexus Market. All rights across the multiverse reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EpicMarketplace;
```