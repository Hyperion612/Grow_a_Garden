export interface Seed {
  id: string;
  name: string;
  displayName: string;
  emoji: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  cost: number;
  sellPrice: number;
  growthTime: number; // seconds
  color: string;
  xp: number;
  mutationChance: number;
  weatherBoost?: string;
  seasonBoost?: string;
}

export const SEEDS: Seed[] = [
  // COMMON (8 seeds)
  { id: 'carrot', name: 'Carrot', displayName: 'Морковь', emoji: '🥕', rarity: 'Common', cost: 5, sellPrice: 15, growthTime: 10, color: '#FF8C00', xp: 5, mutationChance: 0.01, weatherBoost: 'rainy', seasonBoost: 'spring' },
  { id: 'potato', name: 'Potato', displayName: 'Картофель', emoji: '🥔', rarity: 'Common', cost: 8, sellPrice: 20, growthTime: 15, color: '#8B7355', xp: 5, mutationChance: 0.01, weatherBoost: 'cloudy' },
  { id: 'tomato', name: 'Tomato', displayName: 'Томат', emoji: '🍅', rarity: 'Common', cost: 10, sellPrice: 25, growthTime: 20, color: '#FF4444', xp: 7, mutationChance: 0.01, weatherBoost: 'rainy', seasonBoost: 'summer' },
  { id: 'lettuce', name: 'Lettuce', displayName: 'Салат', emoji: '🥬', rarity: 'Common', cost: 7, sellPrice: 18, growthTime: 12, color: '#32CD32', xp: 5, mutationChance: 0.01, weatherBoost: 'rainy' },
  { id: 'corn', name: 'Corn', displayName: 'Кукуруза', emoji: '🌽', rarity: 'Common', cost: 12, sellPrice: 30, growthTime: 25, color: '#FFD700', xp: 8, mutationChance: 0.01, seasonBoost: 'summer' },
  { id: 'onion', name: 'Onion', displayName: 'Лук', emoji: '🧅', rarity: 'Common', cost: 6, sellPrice: 16, growthTime: 14, color: '#DAA520', xp: 5, mutationChance: 0.01 },
  { id: 'pepper', name: 'Pepper', displayName: 'Перец', emoji: '🌶️', rarity: 'Common', cost: 15, sellPrice: 35, growthTime: 30, color: '#DC143C', xp: 10, mutationChance: 0.02, weatherBoost: 'sunny' },
  { id: 'mushroom', name: 'Mushroom', displayName: 'Гриб', emoji: '🍄', rarity: 'Common', cost: 20, sellPrice: 50, growthTime: 60, color: '#8B4513', xp: 15, mutationChance: 0.02, weatherBoost: 'rainy' },

  // UNCOMMON (7 seeds)
  { id: 'strawberry', name: 'Strawberry', displayName: 'Клубника', emoji: '🍓', rarity: 'Uncommon', cost: 50, sellPrice: 120, growthTime: 60, color: '#FF1493', xp: 20, mutationChance: 0.02, seasonBoost: 'spring' },
  { id: 'blueberry', name: 'Blueberry', displayName: 'Черника', emoji: '🫐', rarity: 'Uncommon', cost: 60, sellPrice: 140, growthTime: 75, color: '#4169E1', xp: 22, mutationChance: 0.02, weatherBoost: 'cloudy' },
  { id: 'watermelon', name: 'Watermelon', displayName: 'Арбуз', emoji: '🍉', rarity: 'Uncommon', cost: 80, sellPrice: 180, growthTime: 120, color: '#228B22', xp: 30, mutationChance: 0.02, seasonBoost: 'summer' },
  { id: 'grape', name: 'Grape', displayName: 'Виноград', emoji: '🍇', rarity: 'Uncommon', cost: 70, sellPrice: 160, growthTime: 90, color: '#800080', xp: 25, mutationChance: 0.02 },
  { id: 'peach', name: 'Peach', displayName: 'Персик', emoji: '🍑', rarity: 'Uncommon', cost: 90, sellPrice: 200, growthTime: 150, color: '#FFDAB9', xp: 35, mutationChance: 0.02, seasonBoost: 'summer' },
  { id: 'pineapple', name: 'Pineapple', displayName: 'Ананас', emoji: '🍍', rarity: 'Uncommon', cost: 100, sellPrice: 220, growthTime: 180, color: '#FFD700', xp: 40, mutationChance: 0.03, weatherBoost: 'sunny' },
  { id: 'cherry', name: 'Cherry', displayName: 'Вишня', emoji: '🍒', rarity: 'Uncommon', cost: 75, sellPrice: 170, growthTime: 100, color: '#DC143C', xp: 28, mutationChance: 0.02, seasonBoost: 'spring' },

  // RARE (6 seeds)
  { id: 'sunflower', name: 'Sunflower', displayName: 'Подсолнух', emoji: '🌻', rarity: 'Rare', cost: 200, sellPrice: 500, growthTime: 300, color: '#FFD700', xp: 60, mutationChance: 0.03, weatherBoost: 'sunny', seasonBoost: 'summer' },
  { id: 'rose', name: 'Rose', displayName: 'Роза', emoji: '🌹', rarity: 'Rare', cost: 300, sellPrice: 700, growthTime: 420, color: '#FF0000', xp: 80, mutationChance: 0.03, seasonBoost: 'spring' },
  { id: 'cactus', name: 'Cactus', displayName: 'Кактус', emoji: '🌵', rarity: 'Rare', cost: 250, sellPrice: 600, growthTime: 360, color: '#2E8B57', xp: 70, mutationChance: 0.03, weatherBoost: 'sunny' },
  { id: 'bamboo', name: 'Bamboo', displayName: 'Бамбук', emoji: '🎋', rarity: 'Rare', cost: 400, sellPrice: 900, growthTime: 600, color: '#006400', xp: 100, mutationChance: 0.03, weatherBoost: 'rainy' },
  { id: 'tulip', name: 'Tulip', displayName: 'Тюльпан', emoji: '🌷', rarity: 'Rare', cost: 350, sellPrice: 800, growthTime: 480, color: '#FF69B4', xp: 90, mutationChance: 0.03, seasonBoost: 'spring' },
  { id: 'bonsai', name: 'Bonsai', displayName: 'Бонсай', emoji: '🌳', rarity: 'Rare', cost: 500, sellPrice: 1000, growthTime: 900, color: '#228B22', xp: 120, mutationChance: 0.04 },

  // EPIC (5 seeds)
  { id: 'orchid', name: 'Orchid', displayName: 'Орхидея', emoji: '🪻', rarity: 'Epic', cost: 1000, sellPrice: 2500, growthTime: 1200, color: '#9400D3', xp: 200, mutationChance: 0.04, weatherBoost: 'rainy' },
  { id: 'crystalFlower', name: 'CrystalFlower', displayName: 'Кристальный Цветок', emoji: '💎', rarity: 'Epic', cost: 1500, sellPrice: 3500, growthTime: 1800, color: '#00CED1', xp: 300, mutationChance: 0.04, weatherBoost: 'snowy' },
  { id: 'fireFlower', name: 'FireFlower', displayName: 'Огненный Цветок', emoji: '🔥', rarity: 'Epic', cost: 2000, sellPrice: 4500, growthTime: 2400, color: '#FF4500', xp: 400, mutationChance: 0.04, weatherBoost: 'storm' },
  { id: 'moonFlower', name: 'MoonFlower', displayName: 'Лунный Цветок', emoji: '🌙', rarity: 'Epic', cost: 2500, sellPrice: 5000, growthTime: 3000, color: '#C0C0C0', xp: 500, mutationChance: 0.05 },
  { id: 'thunderVine', name: 'ThunderVine', displayName: 'Громовая Лоза', emoji: '⚡', rarity: 'Epic', cost: 3000, sellPrice: 5500, growthTime: 3600, color: '#FFD700', xp: 600, mutationChance: 0.05, weatherBoost: 'storm' },

  // LEGENDARY (3 seeds)
  { id: 'starBloom', name: 'StarBloom', displayName: 'Звёздный Цветок', emoji: '⭐', rarity: 'Legendary', cost: 5000, sellPrice: 15000, growthTime: 3600, color: '#FFD700', xp: 1000, mutationChance: 0.05, weatherBoost: 'rainbow' },
  { id: 'voidRose', name: 'VoidRose', displayName: 'Роза Пустоты', emoji: '🖤', rarity: 'Legendary', cost: 10000, sellPrice: 20000, growthTime: 7200, color: '#1a1a2e', xp: 2000, mutationChance: 0.06 },
  { id: 'cosmicTree', name: 'CosmicTree', displayName: 'Космическое Дерево', emoji: '🌌', rarity: 'Legendary', cost: 25000, sellPrice: 50000, growthTime: 10800, color: '#4B0082', xp: 5000, mutationChance: 0.07 },

  // MYTHIC (1 seed)
  { id: 'worldTree', name: 'WorldTree', displayName: 'Мировое Древо', emoji: '🌍', rarity: 'Mythic', cost: 50000, sellPrice: 150000, growthTime: 21600, color: '#00FF7F', xp: 10000, mutationChance: 0.1, weatherBoost: 'meteor' },
];

export const RARITY_COLORS: Record<string, string> = {
  Common: '#9CA3AF',
  Uncommon: '#22C55E',
  Rare: '#3B82F6',
  Epic: '#A855F7',
  Legendary: '#F59E0B',
  Mythic: '#EF4444',
};

export const RARITY_BG: Record<string, string> = {
  Common: 'bg-gray-500/20 border-gray-500',
  Uncommon: 'bg-green-500/20 border-green-500',
  Rare: 'bg-blue-500/20 border-blue-500',
  Epic: 'bg-purple-500/20 border-purple-500',
  Legendary: 'bg-yellow-500/20 border-yellow-500',
  Mythic: 'bg-red-500/20 border-red-500',
};

export const MUTATIONS = [
  { id: 'golden', name: 'Golden', emoji: '✨', multiplier: 5, chance: 0.01, color: '#FFD700' },
  { id: 'rainbow', name: 'Rainbow', emoji: '🌈', multiplier: 10, chance: 0.005, color: '#FF69B4' },
  { id: 'frozen', name: 'Frozen', emoji: '❄️', multiplier: 3, chance: 0.02, color: '#87CEEB' },
  { id: 'electric', name: 'Electric', emoji: '⚡', multiplier: 7, chance: 0.008, color: '#FFD700' },
  { id: 'giant', name: 'Giant', emoji: '🏔️', multiplier: 4, chance: 0.015, color: '#8B4513' },
];
