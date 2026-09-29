export interface PlotUpgrade {
  level: number;
  size: string;
  beds: number;
  cost: number;
  description: string;
}

export interface Building {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  effect: string;
  description: string;
}

export const PLOT_UPGRADES: PlotUpgrade[] = [
  { level: 1, size: '6x6', beds: 36, cost: 0, description: 'Стартовый участок' },
  { level: 2, size: '8x8', beds: 64, cost: 5000, description: 'Расширение участка' },
  { level: 3, size: '10x10', beds: 100, cost: 25000, description: 'Большая ферма' },
  { level: 4, size: '12x12', beds: 144, cost: 100000, description: 'Огромная ферма' },
  { level: 5, size: '15x15', beds: 225, cost: 500000, description: 'Мега-ферма' },
];

export const BUILDINGS: Building[] = [
  { id: 'house', name: 'Дом', emoji: '🏠', cost: 10000, effect: 'Спавн-поинт', description: 'Точка появления на участке' },
  { id: 'well', name: 'Колодец', emoji: '🚰', cost: 25000, effect: 'Рост x1.2', description: 'Ускоряет рост всех растений на 20%' },
  { id: 'apiary', name: 'Пасека', emoji: '🐝', cost: 50000, effect: 'Урожай x1.3', description: 'Увеличивает урожай на 30%' },
  { id: 'greenhouse', name: 'Теплица', emoji: '🌟', cost: 150000, effect: 'Ночной рост', description: 'Растения растут и ночью' },
  { id: 'tractor', name: 'Трактор', emoji: '🚜', cost: 200000, effect: 'Автосбор', description: 'Автоматически собирает урожай' },
  { id: 'fair', name: 'Ярмарка', emoji: '🎪', cost: 500000, effect: 'Продажа x1.5', description: 'Увеличивает цену продажи на 50%' },
];

export const SHOP_TYPES = [
  { id: 'seeds', name: 'Семенной магазин', emoji: '🥕', description: 'Продажа всех видов семян' },
  { id: 'pets', name: 'Магазин питомцев', emoji: '🐝', description: 'Яйца и питомцы' },
  { id: 'upgrades', name: 'Магазин апгрейдов', emoji: '🏗️', description: 'Улучшения участка' },
  { id: 'cosmetics', name: 'Магазин косметики', emoji: '🎨', description: 'Скины растений, эмоции' },
  { id: 'premium', name: 'Премиум-магазин', emoji: '💎', description: 'За Robux (VIP, x2 монеты)' },
  { id: 'recycler', name: 'Переработчик', emoji: '♻️', description: 'Обмен растений на монеты' },
];

export const CURRENCIES = [
  { id: 'coins', name: 'Монеты', emoji: '💰', description: 'Основная валюта', color: '#FFD700' },
  { id: 'gems', name: 'Гемы', emoji: '💎', description: 'Премиум валюта', color: '#00CED1' },
  { id: 'xp', name: 'Опыт', emoji: '⭐', description: 'Прокачка уровня', color: '#A855F7' },
  { id: 'tickets', name: 'Билеты', emoji: '🎟️', description: 'Валюта событий', color: '#FF69B4' },
];

export const LEVEL_REWARDS = [
  { level: 10, reward: '500 монет + Uncommon яйцо', emoji: '🎁' },
  { level: 25, reward: '5,000 монет + Rare яйцо', emoji: '🎁' },
  { level: 50, reward: '25,000 монет + Epic яйцо', emoji: '🎁' },
  { level: 75, reward: '100,000 монет + Legendary яйцо', emoji: '🎁' },
  { level: 100, reward: '500,000 монет + Mythic питомец', emoji: '🎁' },
];

export const WEATHER_TYPES = [
  { id: 'sunny', name: 'Sunny', emoji: '☀️', effect: 'Базовая скорость', growthMod: 1.0, mutationMod: 1.0, duration: 300 },
  { id: 'cloudy', name: 'Cloudy', emoji: '☁️', effect: '+10% рост', growthMod: 1.1, mutationMod: 1.0, duration: 300 },
  { id: 'rainy', name: 'Rainy', emoji: '🌧️', effect: '+25% рост, +10% мутации', growthMod: 1.25, mutationMod: 1.1, duration: 300 },
  { id: 'storm', name: 'Storm', emoji: '⛈️', effect: '+50% рост, 5% засуха', growthMod: 1.5, mutationMod: 1.2, duration: 300 },
  { id: 'snowy', name: 'Snowy', emoji: '❄️', effect: 'x0.7 рост, Frozen мутация', growthMod: 0.7, mutationMod: 1.3, duration: 300 },
  { id: 'rainbow', name: 'Rainbow', emoji: '🌈', effect: 'x2 ко всему (30 сек)', growthMod: 2.0, mutationMod: 2.0, duration: 30 },
  { id: 'tornado', name: 'Tornado', emoji: '🌪️', effect: 'Разрушает 3 грядки', growthMod: 0.5, mutationMod: 0.5, duration: 60 },
  { id: 'meteor', name: 'Meteor', emoji: '☄️', effect: '1% Mythic семя', growthMod: 1.0, mutationMod: 1.5, duration: 120 },
];

export const SEASONS = [
  { id: 'spring', name: 'Весна', emoji: '🌸', boost: 'Common/Uncommon +20%', duration: 1800 },
  { id: 'summer', name: 'Лето', emoji: '☀️', boost: 'Rare/Epic +20%', duration: 1800 },
  { id: 'autumn', name: 'Осень', emoji: '🍂', boost: 'Legendary +20%', duration: 1800 },
  { id: 'winter', name: 'Зима', emoji: '❄️', boost: 'Все цены +50%', duration: 1800 },
];

export const QUESTS = [
  { id: 'plant20', name: 'Посади 20 растений', target: 20, reward: 500, type: 'plant' },
  { id: 'harvest10rare', name: 'Собери 10 Rare растений', target: 10, reward: 2000, type: 'harvest_rare' },
  { id: 'sell10k', name: 'Продай на 10,000 монет', target: 10000, reward: 5000, type: 'sell' },
  { id: 'mutation1', name: 'Получи 1 мутацию', target: 1, reward: 1000, type: 'mutation' },
  { id: 'play30', name: 'Поиграй 30 минут', target: 30, reward: 3000, type: 'time' },
  { id: 'invite', name: 'Пригласи друга', target: 1, reward: 10000, type: 'invite' },
];
