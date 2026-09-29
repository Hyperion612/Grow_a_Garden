import { useState } from 'react';
import { SEEDS, RARITY_COLORS, RARITY_BG, MUTATIONS } from './data/seedData';
import { PETS, EGGS } from './data/petData';
import { PLOT_UPGRADES, BUILDINGS, SHOP_TYPES, CURRENCIES, WEATHER_TYPES, SEASONS, QUESTS, LEVEL_REWARDS } from './data/upgradeData';
import { CODE_FILES } from './data/codeFiles';

type Tab = 'overview' | 'seeds' | 'pets' | 'upgrades' | 'weather' | 'code' | 'guide';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedCodeFile, setSelectedCodeFile] = useState(0);
  const [selectedSeedRarity, setSelectedSeedRarity] = useState<string>('All');
  const [copiedFile, setCopiedFile] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; emoji: string }[] = [
    { id: 'overview', label: 'Обзор', emoji: '🌱' },
    { id: 'seeds', label: 'Семена', emoji: '🌾' },
    { id: 'pets', label: 'Питомцы', emoji: '🐝' },
    { id: 'upgrades', label: 'Апгрейды', emoji: '🏗️' },
    { id: 'weather', label: 'Погода', emoji: '🌦️' },
    { id: 'code', label: 'Код Lua', emoji: '💻' },
    { id: 'guide', label: 'Установка', emoji: '📖' },
  ];

  const filteredSeeds = selectedSeedRarity === 'All' 
    ? SEEDS 
    : SEEDS.filter(s => s.rarity === selectedSeedRarity);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(index);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#1a2332] to-[#0d1b2a] text-white">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-emerald-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl animate-bounce">🌱</div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-yellow-400 bg-clip-text text-transparent">
                  Grow a Garden: Ultimate
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Roblox Simulation Game — Полный проект с исходным кодом
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold">
                v2.0 READY
              </span>
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-bold">
                30+ Seeds
              </span>
              <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-bold">
                15 Pets
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0f1923]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Семян', value: '30+', emoji: '🌱', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
                { label: 'Питомцев', value: '15', emoji: '🐝', color: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30' },
                { label: 'Мутаций', value: '5', emoji: '✨', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
                { label: 'Погод', value: '8', emoji: '🌦️', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
              ].map((stat, i) => (
                <div key={i} className={`bg-gradient-to-br ${stat.color} border ${stat.border} rounded-xl p-4 text-center`}>
                  <div className="text-3xl mb-2">{stat.emoji}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Architecture */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📦</span> Архитектура проекта
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-emerald-400 font-bold">ServerScriptService/</h3>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm space-y-1">
                    {['GameManager', 'PlayerManager', 'PlotManager', 'SeedManager', 'ShopManager', 'PetManager', 'WeatherManager', 'QuestManager', 'TradeManager', 'LeaderboardManager', 'AntiCheat'].map(f => (
                      <div key={f} className="text-gray-300 flex items-center gap-2">
                        <span className="text-emerald-400">├─</span> {f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-blue-400 font-bold">ReplicatedStorage/</h3>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm space-y-1">
                    {['Remotes/', 'Modules/', '  ├── GameConfig', '  ├── SeedData', '  ├── PetData', '  ├── UpgradeData', '  └── UIEffects', 'Assets/'].map(f => (
                      <div key={f} className="text-gray-300">{f}</div>
                    ))}
                  </div>
                  <h3 className="text-purple-400 font-bold mt-4">StarterPlayerScripts/</h3>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm space-y-1">
                    {['ClientMain', 'UIController', 'InputController', 'FarmController', 'ShopController', 'InventoryController'].map(f => (
                      <div key={f} className="text-gray-300 flex items-center gap-2">
                        <span className="text-purple-400">├─</span> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Система семян', desc: '30+ видов, 6 уровней редкости, мутации', emoji: '🌱' },
                { title: 'Участок', desc: '5 уровней расширения, 6 построек', emoji: '🏡' },
                { title: 'Питомцы', desc: '15 видов, 5 уровней яиц, баффы', emoji: '🐝' },
                { title: 'Погода', desc: '8 типов погоды, 4 сезона', emoji: '🌦️' },
                { title: 'Задания', desc: 'Ежедневные квесты, стрики', emoji: '📜' },
                { title: 'Экономика', desc: '6 магазинов, 4 валюты, 100 уровней', emoji: '💰' },
                { title: 'Социальные', desc: 'Торговля, кооператив, подарки', emoji: '👥' },
                { title: 'Античит', desc: 'Rate limiting, валидация, логи', emoji: '🛡️' },
                { title: 'Сохранение', desc: 'DataStore, автосохранение, BindToClose', emoji: '💾' },
              ].map((feature, i) => (
                <div key={i} className="bg-[#1a2332] border border-white/10 rounded-xl p-4 hover:border-emerald-500/30 transition-all">
                  <div className="text-2xl mb-2">{feature.emoji}</div>
                  <h3 className="font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Currencies */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">💰 Валюты и экономика</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CURRENCIES.map(c => (
                  <div key={c.id} className="bg-black/30 rounded-lg p-3 text-center border border-white/5">
                    <div className="text-2xl">{c.emoji}</div>
                    <div className="font-bold mt-1">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEEDS TAB */}
        {activeTab === 'seeds' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {['All', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'].map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedSeedRarity(r)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    selectedSeedRarity === r
                      ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {r === 'All' ? '🌍 Все' : r}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSeeds.map(seed => (
                <div
                  key={seed.id}
                  className={`rounded-xl p-4 border ${RARITY_BG[seed.rarity]} bg-[#1a2332] hover:scale-[1.02] transition-all`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{seed.emoji}</span>
                      <div>
                        <h3 className="font-bold text-white">{seed.displayName}</h3>
                        <p className="text-xs" style={{ color: RARITY_COLORS[seed.rarity] }}>
                          {seed.rarity}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-black/30 px-2 py-1 rounded">{seed.name}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-black/30 rounded p-2 text-center">
                      <div className="text-xs text-gray-400">Цена</div>
                      <div className="text-yellow-400 font-bold">💰{seed.cost}</div>
                    </div>
                    <div className="bg-black/30 rounded p-2 text-center">
                      <div className="text-xs text-gray-400">Продажа</div>
                      <div className="text-green-400 font-bold">💰{seed.sellPrice}</div>
                    </div>
                    <div className="bg-black/30 rounded p-2 text-center">
                      <div className="text-xs text-gray-400">Рост</div>
                      <div className="text-blue-400 font-bold">{seed.growthTime}с</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <span>⭐{seed.xp} XP</span>
                    <span>•</span>
                    <span>🎲 {Math.round(seed.mutationChance * 100)}% мутация</span>
                    {seed.weatherBoost && <><span>•</span><span>🌧️ {seed.weatherBoost}</span></>}
                  </div>
                </div>
              ))}
            </div>

            {/* Mutations */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">✨ Мутации</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {MUTATIONS.map(m => (
                  <div key={m.id} className="bg-black/30 rounded-lg p-3 text-center border border-white/5">
                    <div className="text-2xl">{m.emoji}</div>
                    <div className="font-bold text-sm mt-1">{m.name}</div>
                    <div className="text-xs text-yellow-400">x{m.multiplier} цена</div>
                    <div className="text-xs text-gray-400">{(m.chance * 100).toFixed(1)}% шанс</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PETS TAB */}
        {activeTab === 'pets' && (
          <div className="space-y-6">
            {/* Eggs */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🥚 Яйца питомцев</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {EGGS.map(egg => (
                  <div key={egg.level} className="bg-black/30 rounded-lg p-4 text-center border border-white/5 hover:border-yellow-500/30 transition-all">
                    <div className="text-3xl mb-2">{egg.emoji}</div>
                    <div className="font-bold text-sm">{egg.name}</div>
                    <div className="text-yellow-400 text-xs mt-1">💰 {egg.cost.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs">⏱️ {egg.incubationTime}с</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pets Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PETS.map(pet => (
                <div
                  key={pet.id}
                  className={`rounded-xl p-4 border ${RARITY_BG[pet.rarity]} bg-[#1a2332] hover:scale-[1.02] transition-all`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{pet.emoji}</span>
                    <div>
                      <h3 className="font-bold text-white">{pet.name}</h3>
                      <p className="text-xs" style={{ color: RARITY_COLORS[pet.rarity] }}>
                        {pet.rarity} • Egg Lvl {pet.eggLevel}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">{pet.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded">
                      {pet.buff}: {pet.buffValue}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {(pet.dropChance * 100).toFixed(0)}% шанс
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UPGRADES TAB */}
        {activeTab === 'upgrades' && (
          <div className="space-y-6">
            {/* Plot Upgrades */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🏡 Уровни участка</h2>
              <div className="space-y-3">
                {PLOT_UPGRADES.map(upgrade => (
                  <div key={upgrade.level} className="flex items-center gap-4 bg-black/30 rounded-lg p-4 border border-white/5">
                    <div className="text-2xl font-bold text-emerald-400 w-8">L{upgrade.level}</div>
                    <div className="flex-1">
                      <div className="font-bold">{upgrade.size} = {upgrade.beds} грядок</div>
                      <div className="text-sm text-gray-400">{upgrade.description}</div>
                    </div>
                    <div className="text-yellow-400 font-bold">
                      {upgrade.cost === 0 ? 'Бесплатно' : `💰 ${upgrade.cost.toLocaleString()}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buildings */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🏗️ Постройки</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BUILDINGS.map(b => (
                  <div key={b.id} className="bg-black/30 rounded-lg p-4 border border-white/5 hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{b.emoji}</span>
                      <div>
                        <h3 className="font-bold">{b.name}</h3>
                        <p className="text-xs text-emerald-400">{b.effect}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{b.description}</p>
                    <div className="text-yellow-400 font-bold mt-2">💰 {b.cost.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shops */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🛒 Магазины</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SHOP_TYPES.map(s => (
                  <div key={s.id} className="bg-black/30 rounded-lg p-4 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{s.emoji}</span>
                      <div>
                        <h3 className="font-bold">{s.name}</h3>
                        <p className="text-xs text-gray-400">{s.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Level Rewards */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">⭐ Награды за уровни</h2>
              <div className="space-y-2">
                {LEVEL_REWARDS.map(r => (
                  <div key={r.level} className="flex items-center gap-4 bg-black/30 rounded-lg p-3 border border-white/5">
                    <span className="text-xl">{r.emoji}</span>
                    <div className="font-bold text-purple-400">Уровень {r.level}</div>
                    <div className="text-gray-300 text-sm">{r.reward}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WEATHER TAB */}
        {activeTab === 'weather' && (
          <div className="space-y-6">
            {/* Weather Types */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🌦️ Типы погоды</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {WEATHER_TYPES.map(w => (
                  <div key={w.id} className="bg-black/30 rounded-lg p-4 border border-white/5 hover:border-blue-500/30 transition-all">
                    <div className="text-3xl text-center mb-2">{w.emoji}</div>
                    <h3 className="font-bold text-center">{w.name}</h3>
                    <p className="text-xs text-gray-400 text-center mt-1">{w.effect}</p>
                    <div className="flex justify-between mt-3 text-xs">
                      <span className="text-green-400">Рост: x{w.growthMod}</span>
                      <span className="text-purple-400">Мут: x{w.mutationMod}</span>
                    </div>
                    <div className="text-xs text-gray-500 text-center mt-1">⏱️ {w.duration}с</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasons */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">📅 Сезоны (каждые 30 минут)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SEASONS.map(s => (
                  <div key={s.id} className="bg-black/30 rounded-lg p-4 text-center border border-white/5">
                    <div className="text-4xl mb-2">{s.emoji}</div>
                    <h3 className="font-bold">{s.name}</h3>
                    <p className="text-xs text-emerald-400 mt-1">{s.boost}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quests */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">📜 Ежедневные задания</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {QUESTS.map(q => (
                  <div key={q.id} className="bg-black/30 rounded-lg p-4 border border-white/5">
                    <h3 className="font-bold text-sm">{q.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                        Цель: {q.target}
                      </span>
                      <span className="text-yellow-400 text-sm font-bold">💰 {q.reward.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CODE TAB */}
        {activeTab === 'code' && (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* File List */}
            <div className="lg:w-72 shrink-0">
              <div className="bg-[#1a2332] border border-white/10 rounded-xl p-4 sticky top-20">
                <h3 className="font-bold text-sm text-gray-400 mb-3">📁 Файлы проекта</h3>
                <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                  {CODE_FILES.map((file, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedCodeFile(i)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                        selectedCodeFile === i
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="font-mono truncate">{file.name}</div>
                      <div className="text-[10px] text-gray-500 truncate">{file.path}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Display */}
            <div className="flex-1 min-w-0">
              <div className="bg-[#1a2332] border border-white/10 rounded-xl overflow-hidden">
                {/* File Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-white/5">
                  <div>
                    <div className="font-mono text-sm text-emerald-400">{CODE_FILES[selectedCodeFile].path}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{CODE_FILES[selectedCodeFile].description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      CODE_FILES[selectedCodeFile].type === 'Script' ? 'bg-blue-500/20 text-blue-400' :
                      CODE_FILES[selectedCodeFile].type === 'LocalScript' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {CODE_FILES[selectedCodeFile].type}
                    </span>
                    <button
                      onClick={() => copyToClipboard(CODE_FILES[selectedCodeFile].code, selectedCodeFile)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-all"
                    >
                      {copiedFile === selectedCodeFile ? '✅ Скопировано!' : '📋 Копировать'}
                    </button>
                  </div>
                </div>
                
                {/* Code Content */}
                <div className="p-4 overflow-x-auto max-h-[70vh] overflow-y-auto">
                  <pre className="text-xs leading-relaxed">
                    <code className="text-gray-300 font-mono whitespace-pre">
                      {CODE_FILES[selectedCodeFile].code}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GUIDE TAB */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            {/* Installation */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">📥 Инструкция по установке в Roblox Studio</h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Создайте новый Place', desc: 'Откройте Roblox Studio → File → New → Baseplate' },
                  { step: 2, title: 'Создайте структуру папок', desc: 'Создайте все папки по структуре: ServerScriptService, ReplicatedStorage/Modules, ReplicatedStorage/Remotes' },
                  { step: 3, title: 'Скопируйте GameConfig.lua', desc: 'Создайте ModuleScript в ReplicatedStorage/Modules, вставьте код из вкладки "Код Lua"' },
                  { step: 4, title: 'Скопируйте SeedData.lua', desc: 'Создайте ModuleScript в ReplicatedStorage/Modules, вставьте код каталога семян' },
                  { step: 5, title: 'Скопируйте серверные скрипты', desc: 'PlayerManager, PlotManager, ShopManager, PetManager, WeatherManager, AntiCheat → ServerScriptService' },
                  { step: 6, title: 'Скопируйте GameManager.lua', desc: 'Создайте Script в ServerScriptService — это главный скрипт инициализации' },
                  { step: 7, title: 'Создайте ClientMain.lua', desc: 'LocalScript в StarterPlayer/StarterPlayerScripts' },
                  { step: 8, title: 'Создайте карту', desc: 'Добавьте Baseplate, Plots folder, SpawnLocation' },
                  { step: 9, title: 'Тестируйте!', desc: 'Нажмите Play в Studio для тестирования' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testing */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🧪 Тестирование</h2>
              <div className="space-y-3">
                {[
                  'Запустите Play в Studio — проверьте загрузку UI',
                  'Проверьте Output на ошибки (Ctrl+3)',
                  'Попробуйте купить семена через BuySeed RemoteEvent',
                  'Проверьте сохранение: Play → посадите → Stop → Play снова',
                  'Тестируйте погоду: измените WeatherManager таймер на 10 сек',
                  'Проверьте DataStore в Game Settings → Security → Enable Studio Access',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span className="text-gray-300 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">🗺️ Roadmap развития (3 месяца)</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-emerald-400 font-bold mb-2">Месяц 1: Core Gameplay</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Полировка UI/UX, анимации, звуки</li>
                    <li>• Балансировка экономики (тест на 50 игроках)</li>
                    <li>• Добавление 3D-моделей растений</li>
                    <li>• Система достижений</li>
                    <li>• Tutorial для новых игроков</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-blue-400 font-bold mb-2">Месяц 2: Social & Events</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Кооперативные фермы (2-4 игрока)</li>
                    <li>• Первый сезонный ивент</li>
                    <li>• Система друзей и подарков</li>
                    <li>• Еженедельные челленджи</li>
                    <li>• Game Passes и Dev Products</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-purple-400 font-bold mb-2">Месяц 3: Content & Scale</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Новые зоны (Океан, Вулкан, Космос)</li>
                    <li>• Рейды на 4 игрока</li>
                    <li>• Система кланов</li>
                    <li>• Оптимизация для мобильных</li>
                    <li>• Маркетинг: иконка, описание, трейлер</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-[#1a2332] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">✅ Чек-лист перед публикацией</h2>
              <div className="grid md:grid-cols-2 gap-2">
                {[
                  'Все RemoteEvents созданы',
                  'DataStore включен в настройках',
                  'AntiCheat протестирован',
                  'UI адаптирован под мобильные',
                  'Звуки и музыка добавлены',
                  'Game icon и thumbnail созданы',
                  'Game description написано',
                  'Game Passes настроены',
                  'Spawn location работает',
                  'Тест на 20+ игроках пройден',
                  'Ошибки в Output исправлены',
                  'FPS стабильно 60+',
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-600 bg-black/30 text-emerald-500 focus:ring-emerald-500" />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>🌱 Grow a Garden: Ultimate — Roblox Game Project</p>
          <p className="mt-1">Полный исходный код для Roblox Studio • Luau • ProfileService</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
