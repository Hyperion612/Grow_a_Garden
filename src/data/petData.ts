export interface Pet {
  id: string;
  name: string;
  emoji: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  buff: string;
  buffValue: string;
  description: string;
  eggLevel: number;
  dropChance: number;
}

export const PETS: Pet[] = [
  // Common pets (from Egg Lvl 1)
  { id: 'bee', name: 'Bee', emoji: '🐝', rarity: 'Common', buff: 'Growth Speed', buffValue: '+5%', description: 'Пчёлка ускоряет рост растений', eggLevel: 1, dropChance: 0.30 },
  { id: 'butterfly', name: 'Butterfly', emoji: '🦋', rarity: 'Common', buff: 'Mutation Chance', buffValue: '+10%', description: 'Бабочка повышает шанс мутации', eggLevel: 1, dropChance: 0.25 },
  { id: 'turtle', name: 'Turtle', emoji: '🐢', rarity: 'Common', buff: 'Sell Price', buffValue: '+10%', description: 'Черепашка увеличивает цену продажи', eggLevel: 1, dropChance: 0.20 },
  
  // Uncommon pets (from Egg Lvl 2)
  { id: 'fox', name: 'Fox', emoji: '🦊', rarity: 'Uncommon', buff: 'Coin Bonus', buffValue: '+15%', description: 'Лисичка даёт больше монет за урожай', eggLevel: 2, dropChance: 0.25 },
  { id: 'wolf', name: 'Wolf', emoji: '🐺', rarity: 'Uncommon', buff: 'Protection', buffValue: 'Guard', description: 'Волк охраняет ферму от воров', eggLevel: 2, dropChance: 0.20 },
  { id: 'owl', name: 'Owl', emoji: '🦉', rarity: 'Uncommon', buff: 'Vision', buffValue: 'See Rare', description: 'Сова видит редкие семена в магазине', eggLevel: 2, dropChance: 0.15 },
  
  // Rare pets (from Egg Lvl 3)
  { id: 'eagle', name: 'Eagle', emoji: '🦅', rarity: 'Rare', buff: 'Auto Harvest', buffValue: 'Nearby', description: 'Орёл автоматически собирает ближайшие грядки', eggLevel: 3, dropChance: 0.20 },
  { id: 'panda', name: 'Panda', emoji: '🐼', rarity: 'Rare', buff: 'Rain Bonus', buffValue: '+100% coins', description: 'Панда удваивает монеты в дождь', eggLevel: 3, dropChance: 0.15 },
  { id: 'octopus', name: 'Octopus', emoji: '🐙', rarity: 'Rare', buff: 'Auto Water', buffValue: '5 min', description: 'Осьминог поливает все грядки раз в 5 минут', eggLevel: 3, dropChance: 0.10 },
  
  // Epic pets (from Egg Lvl 4)
  { id: 'dragon', name: 'Dragon', emoji: '🐉', rarity: 'Epic', buff: 'All Stats', buffValue: '+25%', description: 'Дракон улучшает все показатели на 25%', eggLevel: 4, dropChance: 0.15 },
  { id: 'babyDragon', name: 'Baby Dragon', emoji: '🐲', rarity: 'Epic', buff: 'Growth Speed', buffValue: '+30%', description: 'Маленький дракон ускоряет рост на 30%', eggLevel: 4, dropChance: 0.12 },
  { id: 'lion', name: 'Lion', emoji: '🦁', rarity: 'Epic', buff: 'Legendary Price', buffValue: 'x3', description: 'Лев утраивает цену Legendary растений', eggLevel: 4, dropChance: 0.10 },
  
  // Legendary pets (from Egg Lvl 5)
  { id: 'unicorn', name: 'Unicorn', emoji: '🦄', rarity: 'Legendary', buff: 'Mutation + Price', buffValue: '+50%/+20%', description: 'Единорог: +50% мутации, +20% цена', eggLevel: 5, dropChance: 0.08 },
  { id: 'phoenix', name: 'Phoenix', emoji: '🔥', rarity: 'Legendary', buff: 'Revive', buffValue: 'Auto', description: 'Феникс воскрешает засохшие растения', eggLevel: 5, dropChance: 0.05 },
  
  // Mythic pet (special)
  { id: 'trex', name: 'T-Rex', emoji: '🦖', rarity: 'Mythic', buff: 'Ultimate', buffValue: 'x10 1hr', description: 'T-Rex: x10 цена одного растения каждый час', eggLevel: 5, dropChance: 0.02 },
];

export const EGGS = [
  { level: 1, name: 'Обычное Яйцо', emoji: '🥚', cost: 500, incubationTime: 60, color: '#D4A574' },
  { level: 2, name: 'Необычное Яйцо', emoji: '🥚', cost: 2000, incubationTime: 300, color: '#22C55E' },
  { level: 3, name: 'Редкое Яйцо', emoji: '🥚', cost: 10000, incubationTime: 900, color: '#3B82F6' },
  { level: 4, name: 'Эпическое Яйцо', emoji: '🥚', cost: 50000, incubationTime: 1800, color: '#A855F7' },
  { level: 5, name: 'Легендарное Яйцо', emoji: '🥚', cost: 200000, incubationTime: 3600, color: '#F59E0B' },
];
