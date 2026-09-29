export interface CodeFile {
  path: string;
  name: string;
  type: 'Script' | 'ModuleScript' | 'LocalScript';
  category: string;
  code: string;
  description: string;
}

export const CODE_FILES: CodeFile[] = [
  {
    path: 'ReplicatedStorage/Modules/GameConfig',
    name: 'GameConfig.lua',
    type: 'ModuleScript',
    category: 'Config',
    description: 'Центральный файл конфигурации — все настройки игры в одном месте',
    code: `--!strict
--[[
    GameConfig.lua — ReplicatedStorage/Modules/GameConfig
    Все настройки игры в одном месте для лёгкой балансировки
]]

local GameConfig = {}

-- ═══════════════════════════════════════════
-- 🎮 ОБЩИЕ НАСТРОЙКИ
-- ═══════════════════════════════════════════
GameConfig.GAME = {
    MAX_PLAYERS = 20,
    AUTO_SAVE_INTERVAL = 60,        -- секунд
    RATE_LIMIT_ACTIONS = 5,         -- действий в секунду
    RATE_LIMIT_WINDOW = 1,          -- окно в секундах
    MAX_PARTICLES = 100,            -- лимит партиклов
    TARGET_FPS = 60,
    PLOT_SPACING = 4,               -- расстояние между грядками (studs)
    BED_SIZE = 3,                   -- размер грядки (studs)
}

-- ═══════════════════════════════════════════
-- 💰 ЭКОНОМИКА
-- ═══════════════════════════════════════════
GameConfig.ECONOMY = {
    STARTING_COINS = 100,
    STARTING_GEMS = 0,
    LEVEL_COIN_BONUS = 0.05,        -- +5% за уровень
    SELL_MULTIPLIER = 1.0,          -- базовый множитель продажи
    MUTATION_PRICE_MULTIPLIERS = {
        Golden = 5,
        Rainbow = 10,
        Frozen = 3,
        Electric = 7,
        Giant = 4,
    },
    RECYCLE_RATIO = 0.5,            -- 50% от цены продажи
}

-- ═══════════════════════════════════════════
-- 🌱 СЕМЕНА — НАСТРОЙКИ МУТАЦИЙ
-- ═══════════════════════════════════════════
GameConfig.MUTATIONS = {
    BASE_CHANCE = 0.01,             -- 1% базовый шанс
    Golden = { chance = 0.01, multiplier = 5, color = Color3.fromRGB(255, 215, 0) },
    Rainbow = { chance = 0.005, multiplier = 10, color = Color3.fromRGB(255, 105, 180) },
    Frozen = { chance = 0.02, multiplier = 3, color = Color3.fromRGB(135, 206, 235) },
    Electric = { chance = 0.008, multiplier = 7, color = Color3.fromRGB(255, 255, 0) },
    Giant = { chance = 0.015, multiplier = 4, color = Color3.fromRGB(139, 69, 19) },
    CAN_STACK = true,               -- мутации могут комбинироваться
    MAX_STACK = 3,                  -- максимум комбинаций
}

-- ═══════════════════════════════════════════
-- 🏠 УЧАСТКИ
-- ═══════════════════════════════════════════
GameConfig.PLOTS = {
    LEVELS = {
        [1] = { size = 6, beds = 36, cost = 0 },
        [2] = { size = 8, beds = 64, cost = 5000 },
        [3] = { size = 10, beds = 100, cost = 25000 },
        [4] = { size = 12, beds = 144, cost = 100000 },
        [5] = { size = 15, beds = 225, cost = 500000 },
    },
    BUILDINGS = {
        house = { cost = 10000, effect = "spawn" },
        well = { cost = 25000, effect = "growth", value = 1.2 },
        apiary = { cost = 50000, effect = "harvest", value = 1.3 },
        greenhouse = { cost = 150000, effect = "nightGrowth" },
        tractor = { cost = 200000, effect = "autoHarvest" },
        fair = { cost = 500000, effect = "sellPrice", value = 1.5 },
    },
}

-- ═══════════════════════════════════════════
-- 🌦️ ПОГОДА
-- ═══════════════════════════════════════════
GameConfig.WEATHER = {
    CHANGE_INTERVAL = 300,          -- 5 минут
    TYPES = {
        sunny = { growthMod = 1.0, mutationMod = 1.0, weight = 30 },
        cloudy = { growthMod = 1.1, mutationMod = 1.0, weight = 20 },
        rainy = { growthMod = 1.25, mutationMod = 1.1, weight = 20 },
        storm = { growthMod = 1.5, mutationMod = 1.2, weight = 10, droughtRisk = 0.05 },
        snowy = { growthMod = 0.7, mutationMod = 1.3, weight = 10 },
        rainbow = { growthMod = 2.0, mutationMod = 2.0, weight = 2, duration = 30 },
        tornado = { growthMod = 0.5, mutationMod = 0.5, weight = 5, destroyBeds = 3 },
        meteor = { growthMod = 1.0, mutationMod = 1.5, weight = 3, mythicChance = 0.01 },
    },
}

-- ═══════════════════════════════════════════
-- 📅 СЕЗОНЫ
-- ═══════════════════════════════════════════
GameConfig.SEASONS = {
    CHANGE_INTERVAL = 1800,         -- 30 минут
    ORDER = { "spring", "summer", "autumn", "winter" },
    BOOSTS = {
        spring = { rarities = {"Common", "Uncommon"}, multiplier = 1.2 },
        summer = { rarities = {"Rare", "Epic"}, multiplier = 1.2 },
        autumn = { rarities = {"Legendary"}, multiplier = 1.2 },
        winter = { allPrices = true, multiplier = 1.5 },
    },
}

-- ═══════════════════════════════════════════
-- 📜 ЗАДАНИЯ
-- ═══════════════════════════════════════════
GameConfig.QUESTS = {
    DAILY_COUNT = 3,
    RESET_HOUR = 0,                 -- час сброса (UTC)
    STREAK_REWARDS = {
        [7] = { type = "egg", level = 5 },
        [30] = { type = "pet", rarity = "Mythic" },
    },
}

-- ═══════════════════════════════════════════
-- ⭐ УРОВНИ
-- ═══════════════════════════════════════════
GameConfig.LEVELS = {
    MAX_LEVEL = 100,
    XP_FORMULA = function(level: number): number
        return math.floor(100 * (level ^ 1.5))
    end,
    COIN_BONUS_PER_LEVEL = 0.05,
    MILESTONE_REWARDS = {
        [10] = { coins = 500, egg = 2 },
        [25] = { coins = 5000, egg = 3 },
        [50] = { coins = 25000, egg = 4 },
        [75] = { coins = 100000, egg = 5 },
        [100] = { coins = 500000, pet = "Mythic" },
    },
}

-- ═══════════════════════════════════════════
-- 🛡️ АНТИЧИТ
-- ═══════════════════════════════════════════
GameConfig.ANTICHEAT = {
    MAX_ACTIONS_PER_SECOND = 5,
    TELEPORT_THRESHOLD = 50,        -- studs
    SUSPICIOUS_KICK_THRESHOLD = 10, -- предупреждений до кика
    LOG_SUSPICIOUS = true,
    BAN_DURATION = 86400,           -- 24 часа
}

-- ═══════════════════════════════════════════
-- 🐝 ПИТОМЦЫ — ЯЙЦА
-- ═══════════════════════════════════════════
GameConfig.EGGS = {
    [1] = { cost = 500, incubationTime = 60, name = "Обычное Яйцо" },
    [2] = { cost = 2000, incubationTime = 300, name = "Необычное Яйцо" },
    [3] = { cost = 10000, incubationTime = 900, name = "Редкое Яйцо" },
    [4] = { cost = 50000, incubationTime = 1800, name = "Эпическое Яйцо" },
    [5] = { cost = 200000, incubationTime = 3600, name = "Легендарное Яйцо" },
}

GameConfig.PET_MERGE_COUNT = 3      -- 3 питомца = 1 улучшенный

return GameConfig`
  },
  {
    path: 'ReplicatedStorage/Modules/SeedData',
    name: 'SeedData.lua',
    type: 'ModuleScript',
    category: 'Data',
    description: 'Каталог всех 30+ семян с полными данными',
    code: `--!strict
--[[
    SeedData.lua — ReplicatedStorage/Modules/SeedData
    Полный каталог семян: 30+ видов, 6 уровней редкости
]]

local SeedData = {}

-- Типы
export type SeedInfo = {
    id: string,
    name: string,
    displayName: string,
    emoji: string,
    rarity: string,
    cost: number,
    sellPrice: number,
    growthTime: number,
    color: Color3,
    xp: number,
    mutationChance: number,
    weatherBoost: string?,
    seasonBoost: string?,
}

-- ═══════════════════════════════════════════
-- 🌱 COMMON (8 семян)
-- ═══════════════════════════════════════════
local COMMON_SEEDS = {
    carrot = {
        id = "carrot", name = "Carrot", displayName = "Морковь", emoji = "🥕",
        rarity = "Common", cost = 5, sellPrice = 15, growthTime = 10,
        color = Color3.fromRGB(255, 140, 0), xp = 5, mutationChance = 0.01,
        weatherBoost = "rainy", seasonBoost = "spring",
    },
    potato = {
        id = "potato", name = "Potato", displayName = "Картофель", emoji = "🥔",
        rarity = "Common", cost = 8, sellPrice = 20, growthTime = 15,
        color = Color3.fromRGB(139, 115, 85), xp = 5, mutationChance = 0.01,
        weatherBoost = "cloudy",
    },
    tomato = {
        id = "tomato", name = "Tomato", displayName = "Томат", emoji = "🍅",
        rarity = "Common", cost = 10, sellPrice = 25, growthTime = 20,
        color = Color3.fromRGB(255, 68, 68), xp = 7, mutationChance = 0.01,
        weatherBoost = "rainy", seasonBoost = "summer",
    },
    lettuce = {
        id = "lettuce", name = "Lettuce", displayName = "Салат", emoji = "🥬",
        rarity = "Common", cost = 7, sellPrice = 18, growthTime = 12,
        color = Color3.fromRGB(50, 205, 50), xp = 5, mutationChance = 0.01,
        weatherBoost = "rainy",
    },
    corn = {
        id = "corn", name = "Corn", displayName = "Кукуруза", emoji = "🌽",
        rarity = "Common", cost = 12, sellPrice = 30, growthTime = 25,
        color = Color3.fromRGB(255, 215, 0), xp = 8, mutationChance = 0.01,
        seasonBoost = "summer",
    },
    onion = {
        id = "onion", name = "Onion", displayName = "Лук", emoji = "🧅",
        rarity = "Common", cost = 6, sellPrice = 16, growthTime = 14,
        color = Color3.fromRGB(218, 165, 32), xp = 5, mutationChance = 0.01,
    },
    pepper = {
        id = "pepper", name = "Pepper", displayName = "Перец", emoji = "🌶️",
        rarity = "Common", cost = 15, sellPrice = 35, growthTime = 30,
        color = Color3.fromRGB(220, 20, 60), xp = 10, mutationChance = 0.02,
        weatherBoost = "sunny",
    },
    mushroom = {
        id = "mushroom", name = "Mushroom", displayName = "Гриб", emoji = "🍄",
        rarity = "Common", cost = 20, sellPrice = 50, growthTime = 60,
        color = Color3.fromRGB(139, 69, 19), xp = 15, mutationChance = 0.02,
        weatherBoost = "rainy",
    },
}

-- ═══════════════════════════════════════════
-- 🌿 UNCOMMON (7 семян)
-- ═══════════════════════════════════════════
local UNCOMMON_SEEDS = {
    strawberry = {
        id = "strawberry", name = "Strawberry", displayName = "Клубника", emoji = "🍓",
        rarity = "Uncommon", cost = 50, sellPrice = 120, growthTime = 60,
        color = Color3.fromRGB(255, 20, 147), xp = 20, mutationChance = 0.02,
        seasonBoost = "spring",
    },
    blueberry = {
        id = "blueberry", name = "Blueberry", displayName = "Черника", emoji = "🫐",
        rarity = "Uncommon", cost = 60, sellPrice = 140, growthTime = 75,
        color = Color3.fromRGB(65, 105, 225), xp = 22, mutationChance = 0.02,
        weatherBoost = "cloudy",
    },
    watermelon = {
        id = "watermelon", name = "Watermelon", displayName = "Арбуз", emoji = "🍉",
        rarity = "Uncommon", cost = 80, sellPrice = 180, growthTime = 120,
        color = Color3.fromRGB(34, 139, 34), xp = 30, mutationChance = 0.02,
        seasonBoost = "summer",
    },
    grape = {
        id = "grape", name = "Grape", displayName = "Виноград", emoji = "🍇",
        rarity = "Uncommon", cost = 70, sellPrice = 160, growthTime = 90,
        color = Color3.fromRGB(128, 0, 128), xp = 25, mutationChance = 0.02,
    },
    peach = {
        id = "peach", name = "Peach", displayName = "Персик", emoji = "🍑",
        rarity = "Uncommon", cost = 90, sellPrice = 200, growthTime = 150,
        color = Color3.fromRGB(255, 218, 185), xp = 35, mutationChance = 0.02,
        seasonBoost = "summer",
    },
    pineapple = {
        id = "pineapple", name = "Pineapple", displayName = "Ананас", emoji = "🍍",
        rarity = "Uncommon", cost = 100, sellPrice = 220, growthTime = 180,
        color = Color3.fromRGB(255, 215, 0), xp = 40, mutationChance = 0.03,
        weatherBoost = "sunny",
    },
    cherry = {
        id = "cherry", name = "Cherry", displayName = "Вишня", emoji = "🍒",
        rarity = "Uncommon", cost = 75, sellPrice = 170, growthTime = 100,
        color = Color3.fromRGB(220, 20, 60), xp = 28, mutationChance = 0.02,
        seasonBoost = "spring",
    },
}

-- ═══════════════════════════════════════════
-- 💙 RARE (6 семян)
-- ═══════════════════════════════════════════
local RARE_SEEDS = {
    sunflower = {
        id = "sunflower", name = "Sunflower", displayName = "Подсолнух", emoji = "🌻",
        rarity = "Rare", cost = 200, sellPrice = 500, growthTime = 300,
        color = Color3.fromRGB(255, 215, 0), xp = 60, mutationChance = 0.03,
        weatherBoost = "sunny", seasonBoost = "summer",
    },
    rose = {
        id = "rose", name = "Rose", displayName = "Роза", emoji = "🌹",
        rarity = "Rare", cost = 300, sellPrice = 700, growthTime = 420,
        color = Color3.fromRGB(255, 0, 0), xp = 80, mutationChance = 0.03,
        seasonBoost = "spring",
    },
    cactus = {
        id = "cactus", name = "Cactus", displayName = "Кактус", emoji = "🌵",
        rarity = "Rare", cost = 250, sellPrice = 600, growthTime = 360,
        color = Color3.fromRGB(46, 139, 87), xp = 70, mutationChance = 0.03,
        weatherBoost = "sunny",
    },
    bamboo = {
        id = "bamboo", name = "Bamboo", displayName = "Бамбук", emoji = "🎋",
        rarity = "Rare", cost = 400, sellPrice = 900, growthTime = 600,
        color = Color3.fromRGB(0, 100, 0), xp = 100, mutationChance = 0.03,
        weatherBoost = "rainy",
    },
    tulip = {
        id = "tulip", name = "Tulip", displayName = "Тюльпан", emoji = "🌷",
        rarity = "Rare", cost = 350, sellPrice = 800, growthTime = 480,
        color = Color3.fromRGB(255, 105, 180), xp = 90, mutationChance = 0.03,
        seasonBoost = "spring",
    },
    bonsai = {
        id = "bonsai", name = "Bonsai", displayName = "Бонсай", emoji = "🌳",
        rarity = "Rare", cost = 500, sellPrice = 1000, growthTime = 900,
        color = Color3.fromRGB(34, 139, 34), xp = 120, mutationChance = 0.04,
    },
}

-- ═══════════════════════════════════════════
-- 💜 EPIC (5 семян)
-- ═══════════════════════════════════════════
local EPIC_SEEDS = {
    orchid = {
        id = "orchid", name = "Orchid", displayName = "Орхидея", emoji = "🪻",
        rarity = "Epic", cost = 1000, sellPrice = 2500, growthTime = 1200,
        color = Color3.fromRGB(148, 0, 211), xp = 200, mutationChance = 0.04,
        weatherBoost = "rainy",
    },
    crystalFlower = {
        id = "crystalFlower", name = "CrystalFlower", displayName = "Кристальный Цветок", emoji = "💎",
        rarity = "Epic", cost = 1500, sellPrice = 3500, growthTime = 1800,
        color = Color3.fromRGB(0, 206, 209), xp = 300, mutationChance = 0.04,
        weatherBoost = "snowy",
    },
    fireFlower = {
        id = "fireFlower", name = "FireFlower", displayName = "Огненный Цветок", emoji = "🔥",
        rarity = "Epic", cost = 2000, sellPrice = 4500, growthTime = 2400,
        color = Color3.fromRGB(255, 69, 0), xp = 400, mutationChance = 0.04,
        weatherBoost = "storm",
    },
    moonFlower = {
        id = "moonFlower", name = "MoonFlower", displayName = "Лунный Цветок", emoji = "🌙",
        rarity = "Epic", cost = 2500, sellPrice = 5000, growthTime = 3000,
        color = Color3.fromRGB(192, 192, 192), xp = 500, mutationChance = 0.05,
    },
    thunderVine = {
        id = "thunderVine", name = "ThunderVine", displayName = "Громовая Лоза", emoji = "⚡",
        rarity = "Epic", cost = 3000, sellPrice = 5500, growthTime = 3600,
        color = Color3.fromRGB(255, 215, 0), xp = 600, mutationChance = 0.05,
        weatherBoost = "storm",
    },
}

-- ═══════════════════════════════════════════
-- 🌟 LEGENDARY (3 семени)
-- ═══════════════════════════════════════════
local LEGENDARY_SEEDS = {
    starBloom = {
        id = "starBloom", name = "StarBloom", displayName = "Звёздный Цветок", emoji = "⭐",
        rarity = "Legendary", cost = 5000, sellPrice = 15000, growthTime = 3600,
        color = Color3.fromRGB(255, 215, 0), xp = 1000, mutationChance = 0.05,
        weatherBoost = "rainbow",
    },
    voidRose = {
        id = "voidRose", name = "VoidRose", displayName = "Роза Пустоты", emoji = "🖤",
        rarity = "Legendary", cost = 10000, sellPrice = 20000, growthTime = 7200,
        color = Color3.fromRGB(26, 26, 46), xp = 2000, mutationChance = 0.06,
    },
    cosmicTree = {
        id = "cosmicTree", name = "CosmicTree", displayName = "Космическое Дерево", emoji = "🌌",
        rarity = "Legendary", cost = 25000, sellPrice = 50000, growthTime = 10800,
        color = Color3.fromRGB(75, 0, 130), xp = 5000, mutationChance = 0.07,
    },
}

-- ═══════════════════════════════════════════
-- 🔴 MYTHIC (1 семя)
-- ═══════════════════════════════════════════
local MYTHIC_SEEDS = {
    worldTree = {
        id = "worldTree", name = "WorldTree", displayName = "Мировое Древо", emoji = "🌍",
        rarity = "Mythic", cost = 50000, sellPrice = 150000, growthTime = 21600,
        color = Color3.fromRGB(0, 255, 127), xp = 10000, mutationChance = 0.1,
        weatherBoost = "meteor",
    },
}

-- ═══════════════════════════════════════════
-- 📋 ОБЪЕДИНЁННЫЙ КАТАЛОГ
-- ═══════════════════════════════════════════
SeedData.ALL_SEEDS = {}
for _, category in ipairs({COMMON_SEEDS, UNCOMMON_SEEDS, RARE_SEEDS, EPIC_SEEDS, LEGENDARY_SEEDS, MYTHIC_SEEDS}) do
    for id, seed in pairs(category) do
        SeedData.ALL_SEEDS[id] = seed
    end
end

SeedData.BY_RARITY = {
    Common = COMMON_SEEDS,
    Uncommon = UNCOMMON_SEEDS,
    Rare = RARE_SEEDS,
    Epic = EPIC_SEEDS,
    Legendary = LEGENDARY_SEEDS,
    Mythic = MYTHIC_SEEDS,
}

-- Получить семя по ID
function SeedData.GetSeed(seedId: string): SeedInfo?
    return SeedData.ALL_SEEDS[seedId]
end

-- Получить все семена редкости
function SeedData.GetSeedsByRarity(rarity: string): {SeedInfo}
    local result = {}
    for _, seed in pairs(SeedData.BY_RARITY[rarity] or {}) do
        table.insert(result, seed)
    end
    return result
end

-- Получить цену продажи с учётом мутаций
function SeedData.GetSellPrice(seedId: string, mutations: {string}?): number
    local seed = SeedData.GetSeed(seedId)
    if not seed then return 0 end
    
    local price = seed.sellPrice
    if mutations then
        for _, mut in ipairs(mutations) do
            local config = require(game.ReplicatedStorage.Modules.GameConfig)
            local mutConfig = config.MUTATIONS[mut]
            if mutConfig then
                price *= mutConfig.multiplier
            end
        end
    end
    return math.floor(price)
end

return SeedData`
  },
  {
    path: 'ServerScriptService/PlayerManager',
    name: 'PlayerManager.lua',
    type: 'ModuleScript',
    category: 'Server',
    description: 'Загрузка/сохранение данных игрока, статистика, уровни',
    code: `--!strict
--[[
    PlayerManager.lua — ServerScriptService/PlayerManager
    Управление данными игрока: загрузка, сохранение, статистика
    Использует ProfileService для надёжного сохранения
]]

local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local RunService = game:GetService("RunService")

local GameConfig = require(game.ReplicatedStorage.Modules.GameConfig)

local PlayerManager = {}
PlayerManager.__index = PlayerManager

-- Хранилище данных игроков
local playerData: {[Player]: any} = {}
local playerProfiles: {[Player]: any} = {}

-- ═══════════════════════════════════════════
-- 📦 СТРУКТУРА ДАННЫХ ИГРОКА
-- ═══════════════════════════════════════════
local DEFAULT_DATA = {
    -- Валюты
    coins = 100,
    gems = 0,
    xp = 0,
    level = 1,
    eventTickets = 0,
    
    -- Инвентарь семян
    inventory = {},  -- {seedId = count}
    
    -- Грядки (состояние)
    beds = {},  -- {bedIndex = {seedId, plantedAt, mutations, progress}}
    
    -- Питомцы
    pets = {},  -- {{id, level, xp, equipped}}
    activePet = nil,
    
    -- Участок
    plotLevel = 1,
    buildings = {},  -- {buildingId = true}
    
    -- Задания
    dailyQuests = {},
    lastQuestReset = 0,
    questStreak = 0,
    lastLoginDate = "",
    
    -- Косметика
    skins = {},
    emotes = {},
    
    -- Статистика
    stats = {
        totalPlanted = 0,
        totalHarvested = 0,
        totalSold = 0,
        totalCoinsEarned = 0,
        totalMutations = 0,
        totalPlayTime = 0,
        legendaryHarvested = 0,
    },
    
    -- Настройки
    settings = {
        soundEnabled = true,
        musicVolume = 0.5,
        sfxVolume = 0.7,
        graphicsQuality = "medium",
    },
}

-- ═══════════════════════════════════════════
-- 💾 ЗАГРУЗКА ДАННЫХ
-- ═══════════════════════════════════════════
function PlayerManager.LoadPlayer(player: Player): boolean
    local success, data = pcall(function()
        local store = DataStoreService:GetDataStore("PlayerData_v2")
        local key = "Player_" .. player.UserId
        local savedData = store:GetAsync(key)
        
        if savedData then
            -- Мердж с дефолтными данными (для новых полей)
            local merged = table.clone(DEFAULT_DATA)
            for key, value in pairs(savedData) do
                if type(value) == "table" and type(merged[key]) == "table" then
                    for k, v in pairs(value) do
                        merged[key][k] = v
                    end
                else
                    merged[key] = value
                end
            end
            return merged
        else
            return table.clone(DEFAULT_DATA)
        end
    end)
    
    if success and data then
        playerData[player] = data
        -- Проверка стрика
        PlayerManager.CheckDailyStreak(player)
        -- Генерация ежедневных заданий
        PlayerManager.GenerateDailyQuests(player)
        return true
    else
        warn("[PlayerManager] Не удалось загрузить данные для " .. player.Name)
        playerData[player] = table.clone(DEFAULT_DATA)
        return false
    end
end

-- ═══════════════════════════════════════════
-- 💾 СОХРАНЕНИЕ ДАННЫХ
-- ═══════════════════════════════════════════
function PlayerManager.SavePlayer(player: Player): boolean
    local data = playerData[player]
    if not data then return false end
    
    local success, err = pcall(function()
        local store = DataStoreService:GetDataStore("PlayerData_v2")
        local key = "Player_" .. player.UserId
        store:SetAsync(key, data)
    end)
    
    if not success then
        warn("[PlayerManager] Ошибка сохранения для " .. player.Name .. ": " .. tostring(err))
    end
    return success
end

-- ═══════════════════════════════════════════
-- 🔄 АВТОСОХРАНЕНИЕ
-- ═══════════════════════════════════════════
function PlayerManager.StartAutoSave()
    task.spawn(function()
        while true do
            task.wait(GameConfig.GAME.AUTO_SAVE_INTERVAL)
            for player, _ in pairs(playerData) do
                if player and player.Parent then
                    PlayerManager.SavePlayer(player)
                end
            end
        end
    end)
end

-- ═══════════════════════════════════════════
-- 💰 ВАЛЮТЫ
-- ═══════════════════════════════════════════
function PlayerManager.AddCoins(player: Player, amount: number): boolean
    local data = playerData[player]
    if not data or amount <= 0 then return false end
    
    -- Бонус от уровня
    local levelBonus = 1 + (data.level * GameConfig.ECONOMY.LEVEL_COIN_BONUS)
    local finalAmount = math.floor(amount * levelBonus)
    
    data.coins += finalAmount
    data.stats.totalCoinsEarned += finalAmount
    
    -- Уведомление клиенту
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("CoinsUpdated")
    if remote then
        remote:FireClient(player, data.coins, finalAmount)
    end
    
    return true
end

function PlayerManager.RemoveCoins(player: Player, amount: number): boolean
    local data = playerData[player]
    if not data or data.coins < amount then return false end
    
    data.coins -= amount
    return true
end

function PlayerManager.AddXP(player: Player, amount: number)
    local data = playerData[player]
    if not data then return end
    
    data.xp += amount
    
    -- Проверка повышения уровня
    local xpNeeded = GameConfig.LEVELS.XP_FORMULA(data.level)
    while data.xp >= xpNeeded and data.level < GameConfig.LEVELS.MAX_LEVEL do
        data.xp -= xpNeeded
        data.level += 1
        xpNeeded = GameConfig.LEVELS.XP_FORMULA(data.level)
        
        -- Награда за уровень
        PlayerManager.GiveLevelReward(player, data.level)
        
        -- Уведомление
        local remote = game.ReplicatedStorage.Remotes:FindFirstChild("LevelUp")
        if remote then
            remote:FireClient(player, data.level)
        end
    end
    
    -- Обновление клиента
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("XPUpdated")
    if remote then
        remote:FireClient(player, data.xp, data.level)
    end
end

-- ═══════════════════════════════════════════
-- 🎁 НАГРАДЫ ЗА УРОВЕНЬ
-- ═══════════════════════════════════════════
function PlayerManager.GiveLevelReward(player: Player, level: number)
    local reward = GameConfig.LEVELS.MILESTONE_REWARDS[level]
    if not reward then return end
    
    if reward.coins then
        PlayerManager.AddCoins(player, reward.coins)
    end
    
    -- Отправить уведомление о награде
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("LevelReward")
    if remote then
        remote:FireClient(player, level, reward)
    end
end

-- ═══════════════════════════════════════════
-- 📅 СТРИК ЗАХОДОВ
-- ═══════════════════════════════════════════
function PlayerManager.CheckDailyStreak(player: Player)
    local data = playerData[player]
    if not data then return end
    
    local today = os.date("%Y-%m-%d")
    local yesterday = os.date("%Y-%m-%d", os.time() - 86400)
    
    if data.lastLoginDate == today then
        return -- Уже заходил сегодня
    elseif data.lastLoginDate == yesterday then
        data.questStreak += 1
    else
        data.questStreak = 1
    end
    
    data.lastLoginDate = today
    
    -- Награда за стрик
    local streakReward = GameConfig.QUESTS.STREAK_REWARDS[data.questStreak]
    if streakReward then
        local remote = game.ReplicatedStorage.Remotes:FindFirstChild("StreakReward")
        if remote then
            remote:FireClient(player, data.questStreak, streakReward)
        end
    end
end

-- ═══════════════════════════════════════════
-- 📜 ЕЖЕДНЕВНЫЕ ЗАДАНИЯ
-- ═══════════════════════════════════════════
function PlayerManager.GenerateDailyQuests(player: Player)
    local data = playerData[player]
    if not data then return end
    
    local currentTime = os.time()
    local hoursSinceReset = (currentTime - data.lastQuestReset) / 3600
    
    if hoursSinceReset < 24 and #data.dailyQuests > 0 then
        return -- Ещё не время сбрасывать
    end
    
    -- Генерация 3 случайных заданий
    local allQuests = GameConfig.QUESTS.POOL or {
        {id = "plant20", name = "Посади 20 растений", target = 20, reward = 500, type = "plant"},
        {id = "harvest10rare", name = "Собери 10 Rare", target = 10, reward = 2000, type = "harvest_rare"},
        {id = "sell10k", name = "Продай на 10,000", target = 10000, reward = 5000, type = "sell"},
        {id = "mutation1", name = "Получи мутацию", target = 1, reward = 1000, type = "mutation"},
        {id = "play30", name = "Поиграй 30 минут", target = 30, reward = 3000, type = "time"},
    }
    
    -- Перемешивание и выбор 3
    local shuffled = table.clone(allQuests)
    for i = #shuffled, 2, -1 do
        local j = math.random(1, i)
        shuffled[i], shuffled[j] = shuffled[j], shuffled[i]
    end
    
    data.dailyQuests = {}
    for i = 1, math.min(3, #shuffled) do
        data.dailyQuests[i] = {
            id = shuffled[i].id,
            name = shuffled[i].name,
            target = shuffled[i].target,
            progress = 0,
            reward = shuffled[i].reward,
            completed = false,
        }
    end
    
    data.lastQuestReset = currentTime
end

-- ═══════════════════════════════════════════
-- 🔍 ГЕТТЕРЫ
-- ═══════════════════════════════════════════
function PlayerManager.GetData(player: Player): any?
    return playerData[player]
end

function PlayerManager.GetCoins(player: Player): number
    local data = playerData[player]
    return data and data.coins or 0
end

function PlayerManager.GetLevel(player: Player): number
    local data = playerData[player]
    return data and data.level or 1
end

function PlayerManager.HasSeeds(player: Player, seedId: string, count: number): boolean
    local data = playerData[player]
    if not data then return false end
    return (data.inventory[seedId] or 0) >= count
end

function PlayerManager.AddSeed(player: Player, seedId: string, count: number)
    local data = playerData[player]
    if not data then return end
    data.inventory[seedId] = (data.inventory[seedId] or 0) + count
end

function PlayerManager.RemoveSeed(player: Player, seedId: string, count: number): boolean
    local data = playerData[player]
    if not data then return false end
    local current = data.inventory[seedId] or 0
    if current < count then return false end
    data.inventory[seedId] = current - count
    return true
end

-- ═══════════════════════════════════════════
-- 🚪 ИНИЦИАЛИЗАЦИЯ
-- ═══════════════════════════════════════════
function PlayerManager.Init()
    -- Загрузка при входе
    Players.PlayerAdded:Connect(function(player)
        PlayerManager.LoadPlayer(player)
    end)
    
    -- Сохранение при выходе
    Players.PlayerRemoving:Connect(function(player)
        PlayerManager.SavePlayer(player)
        playerData[player] = nil
    end)
    
    -- Сохранение при закрытии сервера
    game:BindToClose(function()
        for player, _ in pairs(playerData) do
            PlayerManager.SavePlayer(player)
        end
    end)
    
    -- Авто-сохранение
    PlayerManager.StartAutoSave()
    
    -- Загрузка уже подключённых (для Studio тестирования)
    for _, player in ipairs(Players:GetPlayers()) do
        if not playerData[player] then
            PlayerManager.LoadPlayer(player)
        end
    end
end

return PlayerManager`
  },
  {
    path: 'ServerScriptService/PlotManager',
    name: 'PlotManager.lua',
    type: 'ModuleScript',
    category: 'Server',
    description: 'Управление участками, грядками, посадка, рост, сбор',
    code: `--!strict
--[[
    PlotManager.lua — ServerScriptService/PlotManager
    Управление участками игроков: грядки, посадка, рост, сбор урожая
]]

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local GameConfig = require(game.ReplicatedStorage.Modules.GameConfig)
local SeedData = require(game.ReplicatedStorage.Modules.SeedData)
local PlayerManager = require(script.Parent.PlayerManager)

local PlotManager = {}

-- Состояние участков
local plots: {[Player]: any} = {}

-- ═══════════════════════════════════════════
-- 🏗️ СОЗДАНИЕ УЧАСТКА
-- ═══════════════════════════════════════════
function PlotManager.CreatePlot(player: Player): any
    local data = PlayerManager.GetData(player)
    if not data then return nil end
    
    local plotLevel = data.plotLevel or 1
    local config = GameConfig.PLOTS.LEVELS[plotLevel]
    local gridSize = config.size
    
    local plot = {
        player = player,
        level = plotLevel,
        gridSize = gridSize,
        beds = {},
        buildings = {},
    }
    
    -- Инициализация грядок
    for i = 1, config.beds do
        plot.beds[i] = {
            index = i,
            state = "empty",  -- empty, growing, ready, withered
            seedId = nil,
            plantedAt = 0,
            mutations = {},
            progress = 0,
        }
    end
    
    -- Восстановление состояния из данных
    if data.beds then
        for index, bedData in pairs(data.beds) do
            if plot.beds[index] then
                plot.beds[index].state = bedData.state or "empty"
                plot.beds[index].seedId = bedData.seedId
                plot.beds[index].plantedAt = bedData.plantedAt or 0
                plot.beds[index].mutations = bedData.mutations or {}
                plot.beds[index].progress = bedData.progress or 0
            end
        end
    end
    
    plots[player] = plot
    return plot
end

-- ═══════════════════════════════════════════
-- 🌱 ПОСАДКА СЕМЕНИ
-- ═══════════════════════════════════════════
function PlotManager.PlantSeed(player: Player, bedIndex: number, seedId: string): (boolean, string?)
    -- Валидация
    local plot = plots[player]
    if not plot then
        return false, "Участок не найден"
    end
    
    local bed = plot.beds[bedIndex]
    if not bed then
        return false, "Грядка не существует"
    end
    
    if bed.state ~= "empty" then
        return false, "Грядка занята"
    end
    
    -- Проверка наличия семян
    if not PlayerManager.HasSeeds(player, seedId, 1) then
        return false, "Нет семян"
    end
    
    -- Проверка существования семени
    local seedInfo = SeedData.GetSeed(seedId)
    if not seedInfo then
        return false, "Неизвестное семя"
    end
    
    -- Удаление семени из инвентаря
    PlayerManager.RemoveSeed(player, seedId, 1)
    
    -- Посадка
    bed.state = "growing"
    bed.seedId = seedId
    bed.plantedAt = os.time()
    bed.mutations = {}
    bed.progress = 0
    
    -- XP за посадку
    PlayerManager.AddXP(player, math.floor(seedInfo.xp * 0.3))
    
    -- Статистика
    local data = PlayerManager.GetData(player)
    if data then
        data.stats.totalPlanted += 1
    end
    
    -- Обновление клиента
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("BedUpdated")
    if remote then
        remote:FireClient(player, bedIndex, bed)
    end
    
    -- Обновление задания
    PlotManager.UpdateQuestProgress(player, "plant", 1)
    
    return true, nil
end

-- ═══════════════════════════════════════════
-- 📈 ОБНОВЛЕНИЕ РОСТА (вызывается каждый тик)
-- ═══════════════════════════════════════════
function PlotManager.UpdateGrowth(player: Player, deltaTime: number)
    local plot = plots[player]
    if not plot then return end
    
    local data = PlayerManager.GetData(player)
    if not data then return end
    
    -- Расчёт множителей
    local growthMultiplier = 1.0
    
    -- Бонус от построек
    if data.buildings and data.buildings.well then
        growthMultiplier *= 1.2
    end
    
    -- Бонус от питомца
    -- (обрабатывается PetManager)
    
    -- Бонус от погоды
    -- (обрабатывается WeatherManager)
    
    for _, bed in pairs(plot.beds) do
        if bed.state == "growing" and bed.seedId then
            local seedInfo = SeedData.GetSeed(bed.seedId)
            if seedInfo then
                local growthRate = deltaTime / seedInfo.growthTime
                bed.progress += growthRate * growthMultiplier
                
                -- Проверка готовности
                if bed.progress >= 1.0 then
                    bed.progress = 1.0
                    bed.state = "ready"
                    
                    -- Проверка мутации
                    PlotManager.RollMutation(player, bed)
                    
                    -- Обновление клиента
                    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("BedUpdated")
                    if remote then
                        remote:FireClient(player, bed.index, bed)
                    end
                    
                    -- Звук готовности
                    local soundRemote = game.ReplicatedStorage.Remotes:FindFirstChild("PlaySound")
                    if soundRemote then
                        soundRemote:FireClient(player, "harvest_ready")
                    end
                end
            end
        end
    end
end

-- ═══════════════════════════════════════════
-- 🎲 ПРОВЕРКА МУТАЦИИ
-- ═══════════════════════════════════════════
function PlotManager.RollMutation(player: Player, bed: any)
    local seedInfo = SeedData.GetSeed(bed.seedId)
    if not seedInfo then return end
    
    local mutationChance = seedInfo.mutationChance
    local data = PlayerManager.GetData(player)
    
    -- Бонус от питомца Butterfly
    -- (добавляется PetManager)
    
    -- Бонус от погоды
    -- (добавляется WeatherManager)
    
    -- Проверка каждой мутации
    for mutName, mutConfig in pairs(GameConfig.MUTATIONS) do
        if type(mutConfig) == "table" and mutConfig.chance then
            if math.random() < mutationChance * (mutConfig.chance / GameConfig.MUTATIONS.BASE_CHANCE) then
                table.insert(bed.mutations, mutName)
                
                -- Статистика
                if data then
                    data.stats.totalMutations += 1
                end
                
                -- Обновление задания
                PlotManager.UpdateQuestProgress(player, "mutation", 1)
                
                -- Уведомление о мутации!
                local remote = game.ReplicatedStorage.Remotes:FindFirstChild("MutationFound")
                if remote then
                    remote:FireClient(player, bed.index, mutName)
                end
            end
        end
    end
end

-- ═══════════════════════════════════════════
-- 🌾 СБОР УРОЖАЯ
-- ═══════════════════════════════════════════
function PlotManager.HarvestBed(player: Player, bedIndex: number): (boolean, string?, any?)
    local plot = plots[player]
    if not plot then
        return false, "Участок не найден", nil
    end
    
    local bed = plot.beds[bedIndex]
    if not bed then
        return false, "Грядка не существует", nil
    end
    
    if bed.state ~= "ready" then
        return false, "Растение не готово", nil
    end
    
    local seedInfo = SeedData.GetSeed(bed.seedId)
    if not seedInfo then
        return false, "Ошибка данных", nil
    end
    
    -- Расчёт цены
    local sellPrice = SeedData.GetSellPrice(bed.seedId, bed.mutations)
    
    -- Результат сбора
    local harvest = {
        seedId = bed.seedId,
        mutations = bed.mutations,
        sellPrice = sellPrice,
        xp = seedInfo.xp,
    }
    
    -- Добавить в инвентарь (или сразу продать)
    -- По умолчанию — в инвентарь
    local data = PlayerManager.GetData(player)
    if data then
        -- Добавляем урожай в инвентарь
        local harvestKey = bed.seedId
        if #bed.mutations > 0 then
            harvestKey ..= "_" .. table.concat(bed.mutations, "_")
        end
        data.inventory[harvestKey] = (data.inventory[harvestKey] or 0) + 1
        
        -- Статистика
        data.stats.totalHarvested += 1
        if seedInfo.rarity == "Legendary" then
            data.stats.legendaryHarvested += 1
        end
    end
    
    -- XP за сбор
    PlayerManager.AddXP(player, seedInfo.xp)
    
    -- Обновление задания
    PlotManager.UpdateQuestProgress(player, "harvest", 1)
    if seedInfo.rarity == "Rare" or seedInfo.rarity == "Epic" or seedInfo.rarity == "Legendary" then
        PlotManager.UpdateQuestProgress(player, "harvest_rare", 1)
    end
    
    -- Очистка грядки
    bed.state = "empty"
    bed.seedId = nil
    bed.plantedAt = 0
    bed.mutations = {}
    bed.progress = 0
    
    -- Обновление клиента
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("BedUpdated")
    if remote then
        remote:FireClient(player, bedIndex, bed)
    end
    
    local harvestRemote = game.ReplicatedStorage.Remotes:FindFirstChild("HarvestResult")
    if harvestRemote then
        harvestRemote:FireClient(player, harvest)
    end
    
    return true, nil, harvest
end

-- ═══════════════════════════════════════════
-- 📜 ОБНОВЛЕНИЕ ЗАДАНИЙ
-- ═══════════════════════════════════════════
function PlotManager.UpdateQuestProgress(player: Player, questType: string, amount: number)
    local data = PlayerManager.GetData(player)
    if not data or not data.dailyQuests then return end
    
    for _, quest in ipairs(data.dailyQuests) do
        if quest.type == questType and not quest.completed then
            quest.progress = math.min(quest.progress + amount, quest.target)
            
            if quest.progress >= quest.target then
                quest.completed = true
                -- Награда
                PlayerManager.AddCoins(player, quest.reward)
                
                local remote = game.ReplicatedStorage.Remotes:FindFirstChild("QuestCompleted")
                if remote then
                    remote:FireClient(player, quest)
                end
            end
        end
    end
end

-- ═══════════════════════════════════════════
-- 🏗️ АПГРЕЙД УЧАСТКА
-- ═══════════════════════════════════════════
function PlotManager.UpgradePlot(player: Player): (boolean, string?)
    local data = PlayerManager.GetData(player)
    if not data then return false, "Данные не найдены" end
    
    local currentLevel = data.plotLevel or 1
    local nextLevel = currentLevel + 1
    local nextConfig = GameConfig.PLOTS.LEVELS[nextLevel]
    
    if not nextConfig then
        return false, "Максимальный уровень"
    end
    
    if data.coins < nextConfig.cost then
        return false, "Недостаточно монет"
    end
    
    -- Списание монет
    PlayerManager.RemoveCoins(player, nextConfig.cost)
    
    -- Обновление
    data.plotLevel = nextLevel
    
    -- Пересоздание участка
    local oldPlot = plots[player]
    if oldPlot then
        -- Сохранение данных грядок
        data.beds = {}
        for _, bed in pairs(oldPlot.beds) do
            if bed.state ~= "empty" then
                data.beds[bed.index] = {
                    state = bed.state,
                    seedId = bed.seedId,
                    plantedAt = bed.plantedAt,
                    mutations = bed.mutations,
                    progress = bed.progress,
                }
            end
        end
    end
    
    -- Создание нового участка
    PlotManager.CreatePlot(player)
    
    -- Уведомление
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("PlotUpgraded")
    if remote then
        remote:FireClient(player, nextLevel, nextConfig)
    end
    
    return true, nil
end

-- ═══════════════════════════════════════════
-- 🏠 ПОСТРОЙКИ
-- ═══════════════════════════════════════════
function PlotManager.BuildStructure(player: Player, buildingId: string): (boolean, string?)
    local data = PlayerManager.GetData(player)
    if not data then return false, "Данные не найдены" end
    
    local buildingConfig = GameConfig.PLOTS.BUILDINGS[buildingId]
    if not buildingConfig then
        return false, "Постройка не найдена"
    end
    
    if data.buildings[buildingId] then
        return false, "Уже построено"
    end
    
    if data.coins < buildingConfig.cost then
        return false, "Недостаточно монет"
    end
    
    -- Списание монет
    PlayerManager.RemoveCoins(player, buildingConfig.cost)
    
    -- Постройка
    data.buildings[buildingId] = true
    
    -- Уведомление
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("BuildingPlaced")
    if remote then
        remote:FireClient(player, buildingId, buildingConfig)
    end
    
    return true, nil
end

-- ═══════════════════════════════════════════
-- 🔄 ИНИЦИАЛИЗАЦИЯ
-- ═══════════════════════════════════════════
function PlotManager.Init()
    -- Создание участков при входе
    Players.PlayerAdded:Connect(function(player)
        task.wait(2) -- Ждём загрузки данных
        PlotManager.CreatePlot(player)
    end)
    
    -- Удаление участков при выходе
    Players.PlayerRemoving:Connect(function(player)
        plots[player] = nil
    end)
    
    -- Цикл обновления роста
    task.spawn(function()
        local lastTime = os.clock()
        while true do
            task.wait(1) -- Обновление каждую секунду
            local currentTime = os.clock()
            local deltaTime = currentTime - lastTime
            lastTime = currentTime
            
            for player, _ in pairs(plots) do
                if player and player.Parent then
                    PlotManager.UpdateGrowth(player, deltaTime)
                end
            end
        end
    end)
    
    -- Создание участков для уже подключённых
    for _, player in ipairs(Players:GetPlayers()) do
        if not plots[player] then
            PlotManager.CreatePlot(player)
        end
    end
end

function PlotManager.GetPlot(player: Player): any?
    return plots[player]
end

return PlotManager`
  },
  {
    path: 'ServerScriptService/WeatherManager',
    name: 'WeatherManager.lua',
    type: 'ModuleScript',
    category: 'Server',
    description: 'Система погоды и сезонов с эффектами',
    code: `--!strict
--[[
    WeatherManager.lua — ServerScriptService/WeatherManager
    Управление погодой и сезонами
]]

local Players = game:GetService("Players")
local Lighting = game:GetService("Lighting")
local TweenService = game:GetService("TweenService")

local GameConfig = require(game.ReplicatedStorage.Modules.GameConfig)

local WeatherManager = {}

-- Текущее состояние
local currentWeather = "sunny"
local currentSeason = "spring"
local weatherTimer = 0
local seasonTimer = 0
local seasonIndex = 1

-- ═══════════════════════════════════════════
-- 🌦️ СИСТЕМА ПОГОДЫ
-- ═══════════════════════════════════════════
function WeatherManager.ChangeWeather()
    local weatherTypes = GameConfig.WEATHER.TYPES
    
    -- Взвешенный случайный выбор
    local totalWeight = 0
    for _, config in pairs(weatherTypes) do
        totalWeight += config.weight
    end
    
    local roll = math.random() * totalWeight
    local cumulative = 0
    
    for weatherId, config in pairs(weatherTypes) do
        cumulative += config.weight
        if roll <= cumulative then
            currentWeather = weatherId
            break
        end
    end
    
    -- Применение визуальных эффектов
    WeatherManager.ApplyWeatherEffects(currentWeather)
    
    -- Уведомление всех игроков
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("WeatherChanged")
    if remote then
        remote:FireAllClients(currentWeather, GameConfig.WEATHER.CHANGE_INTERVAL)
    end
    
    print("[Weather] Погода изменилась: " .. currentWeather)
end

function WeatherManager.ApplyWeatherEffects(weather: string)
    local tweenInfo = TweenInfo.new(5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
    
    if weather == "sunny" then
        TweenService:Create(Lighting, tweenInfo, {
            Ambient = Color3.fromRGB(150, 150, 150),
            Brightness = 2,
            ClockTime = 14,
        }):Play()
        
    elseif weather == "cloudy" then
        TweenService:Create(Lighting, tweenInfo, {
            Ambient = Color3.fromRGB(120, 120, 120),
            Brightness = 1,
            ClockTime = 12,
        }):Play()
        
    elseif weather == "rainy" then
        TweenService:Create(Lighting, tweenInfo, {
            Ambient = Color3.fromRGB(80, 80, 100),
            Brightness = 0.5,
            ClockTime = 16,
        }):Play()
        -- Добавить эффект дождя (particles)
        
    elseif weather == "storm" then
        TweenService:Create(Lighting, tweenInfo, {
            Ambient = Color3.fromRGB(40, 40, 60),
            Brightness = 0.2,
            ClockTime = 0,
        }):Play()
        -- Молнии, сильный дождь
        
    elseif weather == "snowy" then
        TweenService:Create(Lighting, tweenInfo, {
            Ambient = Color3.fromRGB(180, 180, 200),
            Brightness = 1.5,
            ClockTime = 10,
        }):Play()
        -- Снежные частицы
        
    elseif weather == "rainbow" then
        TweenService:Create(Lighting, tweenInfo, {
            Ambient = Color3.fromRGB(200, 200, 200),
            Brightness = 3,
            ClockTime = 14,
        }):Play()
        -- Радужные эффекты!
    end
end

-- ═══════════════════════════════════════════
-- 📅 СИСТЕМА СЕЗОНОВ
-- ═══════════════════════════════════════════
function WeatherManager.ChangeSeason()
    local order = GameConfig.SEASONS.ORDER
    seasonIndex = (seasonIndex % #order) + 1
    currentSeason = order[seasonIndex]
    
    -- Уведомление
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("SeasonChanged")
    if remote then
        remote:FireAllClients(currentSeason, GameConfig.SEASONS.CHANGE_INTERVAL)
    end
    
    print("[Season] Сезон изменился: " .. currentSeason)
end

-- ═══════════════════════════════════════════
-- 📊 МОДИФИКАТОРЫ
-- ═══════════════════════════════════════════
function WeatherManager.GetGrowthModifier(): number
    local config = GameConfig.WEATHER.TYPES[currentWeather]
    return config and config.growthMod or 1.0
end

function WeatherManager.GetMutationModifier(): number
    local config = GameConfig.WEATHER.TYPES[currentWeather]
    return config and config.mutationMod or 1.0
end

function WeatherManager.GetSellPriceModifier(rarity: string?): number
    local modifier = 1.0
    
    -- Зимний бонус
    if currentSeason == "winter" then
        modifier *= 1.5
    end
    
    -- Сезонный бонус для конкретной редкости
    if rarity then
        local seasonConfig = GameConfig.SEASONS.BOOSTS[currentSeason]
        if seasonConfig and seasonConfig.rarities then
            for _, r in ipairs(seasonConfig.rarities) do
                if r == rarity then
                    modifier *= seasonConfig.multiplier
                    break
                end
            end
        end
    end
    
    return modifier
end

function WeatherManager.GetCurrentWeather(): string
    return currentWeather
end

function WeatherManager.GetCurrentSeason(): string
    return currentSeason
end

-- ═══════════════════════════════════════════
-- 🔄 ИНИЦИАЛИЗАЦИЯ
-- ═══════════════════════════════════════════
function WeatherManager.Init()
    -- Запуск таймеров
    task.spawn(function()
        while true do
            task.wait(1)
            weatherTimer += 1
            seasonTimer += 1
            
            if weatherTimer >= GameConfig.WEATHER.CHANGE_INTERVAL then
                weatherTimer = 0
                WeatherManager.ChangeWeather()
            end
            
            if seasonTimer >= GameConfig.SEASONS.CHANGE_INTERVAL then
                seasonTimer = 0
                WeatherManager.ChangeSeason()
            end
        end
    end)
    
    -- Начальная погода
    WeatherManager.ChangeWeather()
end

return WeatherManager`
  },
  {
    path: 'ServerScriptService/ShopManager',
    name: 'ShopManager.lua',
    type: 'ModuleScript',
    category: 'Server',
    description: 'Магазины, покупки семян, апгрейды',
    code: `--!strict
--[[
    ShopManager.lua — ServerScriptService/ShopManager
    Управление магазинами: покупка семян, апгрейды, питомцы
]]

local Players = game:GetService("Players")

local GameConfig = require(game.ReplicatedStorage.Modules.GameConfig)
local SeedData = require(game.ReplicatedStorage.Modules.SeedData)
local PlayerManager = require(script.Parent.PlayerManager)

local ShopManager = {}

-- ═══════════════════════════════════════════
-- 🥕 ПОКУПКА СЕМЯН
-- ═══════════════════════════════════════════
function ShopManager.BuySeed(player: Player, seedId: string, count: number): (boolean, string?)
    -- Валидация
    if count <= 0 or count > 100 then
        return false, "Неверное количество"
    end
    
    local seedInfo = SeedData.GetSeed(seedId)
    if not seedInfo then
        return false, "Семя не найдено"
    end
    
    local totalCost = seedInfo.cost * count
    local data = PlayerManager.GetData(player)
    if not data then return false, "Ошибка данных" end
    
    if data.coins < totalCost then
        return false, "Недостаточно монет"
    end
    
    -- Списание монет
    PlayerManager.RemoveCoins(player, totalCost)
    
    -- Добавление семян
    PlayerManager.AddSeed(player, seedId, count)
    
    -- Уведомление
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("PurchaseComplete")
    if remote then
        remote:FireClient(player, "seed", seedId, count, totalCost)
    end
    
    return true, nil
end

-- ═══════════════════════════════════════════
-- 💰 ПРОДАЖА УРОЖАЯ
-- ═══════════════════════════════════════════
function ShopManager.SellHarvest(player: Player, harvestId: string, count: number): (boolean, string?)
    if count <= 0 then return false, "Неверное количество" end
    
    local data = PlayerManager.GetData(player)
    if not data then return false, "Ошибка данных" end
    
    local available = data.inventory[harvestId] or 0
    if available < count then
        return false, "Недостаточно урожая"
    end
    
    -- Определение базового семени
    local parts = string.split(harvestId, "_")
    local seedId = parts[1]
    local seedInfo = SeedData.GetSeed(seedId)
    if not seedInfo then return false, "Ошибка данных" end
    
    -- Расчёт цены с мутациями
    local mutations = {}
    for i = 2, #parts do
        table.insert(mutations, parts[i])
    end
    local pricePerItem = SeedData.GetSellPrice(seedId, mutations)
    
    -- Сезонный модификатор
    -- (WeatherManager.GetSellPriceModifier)
    
    local totalPrice = pricePerItem * count
    PlayerManager.RemoveCoins(player, -totalPrice) -- Добавляем монеты
    
    -- Удаление из инвентаря
    data.inventory[harvestId] = available - count
    if data.inventory[harvestId] <= 0 then
        data.inventory[harvestId] = nil
    end
    
    -- Статистика
    data.stats.totalSold += count
    
    -- Уведомление
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("SellComplete")
    if remote then
        remote:FireClient(player, harvestId, count, totalPrice)
    end
    
    return true, nil
end

-- ═══════════════════════════════════════════
-- 🏗️ ПОКУПКА АПГРЕЙДА
-- ═══════════════════════════════════════════
function ShopManager.BuyUpgrade(player: Player, upgradeType: string, upgradeId: string): (boolean, string?)
    local data = PlayerManager.GetData(player)
    if not data then return false, "Ошибка данных" end
    
    if upgradeType == "plot" then
        -- Апгрейд участка
        local PlotManager = require(script.Parent.PlotManager)
        return PlotManager.UpgradePlot(player)
        
    elseif upgradeType == "building" then
        -- Постройка
        local PlotManager = require(script.Parent.PlotManager)
        return PlotManager.BuildStructure(player, upgradeId)
    end
    
    return false, "Неизвестный тип апгрейда"
end

-- ═══════════════════════════════════════════
-- 🔄 ИНИЦИАЛИЗАЦИЯ
-- ═══════════════════════════════════════════
function ShopManager.Init()
    -- Подключение RemoteEvents
    local remotes = game.ReplicatedStorage.Remotes
    
    local buySeedEvent = remotes:FindFirstChild("BuySeed")
    if buySeedEvent then
        buySeedEvent.OnServerEvent:Connect(function(player, seedId, count)
            ShopManager.BuySeed(player, seedId, count or 1)
        end)
    end
    
    local sellEvent = remotes:FindFirstChild("SellHarvest")
    if sellEvent then
        sellEvent.OnServerEvent:Connect(function(player, harvestId, count)
            ShopManager.SellHarvest(player, harvestId, count or 1)
        end)
    end
    
    local buyUpgradeEvent = remotes:FindFirstChild("BuyUpgrade")
    if buyUpgradeEvent then
        buyUpgradeEvent.OnServerEvent:Connect(function(player, upgradeType, upgradeId)
            ShopManager.BuyUpgrade(player, upgradeType, upgradeId)
        end)
    end
end

return ShopManager`
  },
  {
    path: 'ServerScriptService/PetManager',
    name: 'PetManager.lua',
    type: 'ModuleScript',
    category: 'Server',
    description: 'Питомцы: яйца, инкубация, баффы, объединение',
    code: `--!strict
--[[
    PetManager.lua — ServerScriptService/PetManager
    Управление питомцами: покупка яиц, инкубация, баффы
]]

local Players = game:GetService("Players")

local GameConfig = require(game.ReplicatedStorage.Modules.GameConfig)
local PlayerManager = require(script.Parent.PlayerManager)

local PetManager = {}

-- Каталог питомцев
local PET_CATALOG = {
    -- Common
    {id = "bee", name = "Bee", rarity = "Common", buff = "growthSpeed", value = 0.05, eggLevel = 1, dropChance = 0.30},
    {id = "butterfly", name = "Butterfly", rarity = "Common", buff = "mutationChance", value = 0.10, eggLevel = 1, dropChance = 0.25},
    {id = "turtle", name = "Turtle", rarity = "Common", buff = "sellPrice", value = 0.10, eggLevel = 1, dropChance = 0.20},
    -- Uncommon
    {id = "fox", name = "Fox", rarity = "Uncommon", buff = "coinBonus", value = 0.15, eggLevel = 2, dropChance = 0.25},
    {id = "wolf", name = "Wolf", rarity = "Uncommon", buff = "protection", value = 1, eggLevel = 2, dropChance = 0.20},
    {id = "owl", name = "Owl", rarity = "Uncommon", buff = "vision", value = 1, eggLevel = 2, dropChance = 0.15},
    -- Rare
    {id = "eagle", name = "Eagle", rarity = "Rare", buff = "autoHarvest", value = 3, eggLevel = 3, dropChance = 0.20},
    {id = "panda", name = "Panda", rarity = "Rare", buff = "rainBonus", value = 1.0, eggLevel = 3, dropChance = 0.15},
    {id = "octopus", name = "Octopus", rarity = "Rare", buff = "autoWater", value = 300, eggLevel = 3, dropChance = 0.10},
    -- Epic
    {id = "dragon", name = "Dragon", rarity = "Epic", buff = "allStats", value = 0.25, eggLevel = 4, dropChance = 0.15},
    {id = "babyDragon", name = "Baby Dragon", rarity = "Epic", buff = "growthSpeed", value = 0.30, eggLevel = 4, dropChance = 0.12},
    {id = "lion", name = "Lion", rarity = "Epic", buff = "legendaryPrice", value = 3, eggLevel = 4, dropChance = 0.10},
    -- Legendary
    {id = "unicorn", name = "Unicorn", rarity = "Legendary", buff = "mutationPrice", value = 0.50, eggLevel = 5, dropChance = 0.08},
    {id = "phoenix", name = "Phoenix", rarity = "Legendary", buff = "revive", value = 1, eggLevel = 5, dropChance = 0.05},
    -- Mythic
    {id = "trex", name = "T-Rex", rarity = "Mythic", buff = "ultimate", value = 10, eggLevel = 5, dropChance = 0.02},
}

-- ═══════════════════════════════════════════
-- 🥚 ПОКУПКА ЯЙЦА
-- ═══════════════════════════════════════════
function PetManager.BuyEgg(player: Player, eggLevel: number): (boolean, string?)
    local eggConfig = GameConfig.EGGS[eggLevel]
    if not eggConfig then
        return false, "Яйцо не найдено"
    end
    
    local data = PlayerManager.GetData(player)
    if not data then return false, "Ошибка данных" end
    
    if data.coins < eggConfig.cost then
        return false, "Недостаточно монет"
    end
    
    -- Списание монет
    PlayerManager.RemoveCoins(player, eggConfig.cost)
    
    -- Запуск инкубации
    PetManager.StartIncubation(player, eggLevel)
    
    return true, nil
end

-- ═══════════════════════════════════════════
-- 🐣 ИНКУБАЦИЯ
-- ═══════════════════════════════════════════
function PetManager.StartIncubation(player: Player, eggLevel: number)
    local eggConfig = GameConfig.EGGS[eggLevel]
    
    -- Уведомление клиента о начале инкубации
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("IncubationStarted")
    if remote then
        remote:FireClient(player, eggLevel, eggConfig.incubationTime)
    end
    
    -- Запуск таймера
    task.delay(eggConfig.incubationTime, function()
        if player and player.Parent then
            PetManager.CompleteIncubation(player, eggLevel)
        end
    end)
end

function PetManager.CompleteIncubation(player: Player, eggLevel: number)
    -- Определение питомца
    local pet = PetManager.RollPet(eggLevel)
    if not pet then return end
    
    -- Добавление питомца
    local data = PlayerManager.GetData(player)
    if not data then return end
    
    table.insert(data.pets, {
        id = pet.id,
        name = pet.name,
        rarity = pet.rarity,
        level = 1,
        xp = 0,
        equipped = false,
    })
    
    -- Уведомление
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("PetHatched")
    if remote then
        remote:FireClient(player, pet)
    end
end

function PetManager.RollPet(eggLevel: number): any?
    -- Фильтр питомцев по уровню яйца
    local candidates = {}
    for _, pet in ipairs(PET_CATALOG) do
        if pet.eggLevel <= eggLevel then
            table.insert(candidates, pet)
        end
    end
    
    -- Взвешенный рандом
    local totalChance = 0
    for _, pet in ipairs(candidates) do
        totalChance += pet.dropChance
    end
    
    local roll = math.random() * totalChance
    local cumulative = 0
    
    for _, pet in ipairs(candidates) do
        cumulative += pet.dropChance
        if roll <= cumulative then
            return pet
        end
    end
    
    return candidates[1] -- Fallback
end

-- ═══════════════════════════════════════════
-- 🐾 ЭКИПИРОВАНИЕ ПИТОМЦА
-- ═══════════════════════════════════════════
function PetManager.EquipPet(player: Player, petIndex: number): (boolean, string?)
    local data = PlayerManager.GetData(player)
    if not data then return false, "Ошибка данных" end
    
    if not data.pets[petIndex] then
        return false, "Питомец не найден"
    end
    
    -- Снять текущего
    for _, pet in ipairs(data.pets) do
        pet.equipped = false
    end
    
    -- Экипировать нового
    data.pets[petIndex].equipped = true
    data.activePet = petIndex
    
    -- Уведомление
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("PetEquipped")
    if remote then
        remote:FireClient(player, data.pets[petIndex])
    end
    
    return true, nil
end

-- ═══════════════════════════════════════════
-- 🔀 ОБЪЕДИНЕНИЕ ПИТОМЦЕВ
-- ═══════════════════════════════════════════
function PetManager.MergePets(player: Player, petId: string): (boolean, string?)
    local data = PlayerManager.GetData(player)
    if not data then return false, "Ошибка данных" end
    
    -- Найти всех питомцев с таким ID
    local matching = {}
    for i, pet in ipairs(data.pets) do
        if pet.id == petId then
            table.insert(matching, i)
        end
    end
    
    if #matching < GameConfig.PET_MERGE_COUNT then
        return false, "Нужно " .. GameConfig.PET_MERGE_COUNT .. " одинаковых питомцев"
    end
    
    -- Удалить 2 из 3, улучшить оставшегося
    local keepIndex = matching[1]
    for i = #matching, 2, -1 do
        table.remove(data.pets, matching[i])
    end
    
    -- Улучшение
    data.pets[keepIndex].level += 1
    
    -- Уведомление
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("PetMerged")
    if remote then
        remote:FireClient(player, data.pets[keepIndex])
    end
    
    return true, nil
end

-- ═══════════════════════════════════════════
-- 📊 ПОЛУЧЕНИЕ БАФФОВ
-- ═══════════════════════════════════════════
function PetManager.GetPetBuffs(player: Player): {[string]: number}
    local data = PlayerManager.GetData(player)
    if not data or not data.activePet then return {} end
    
    local activePet = data.pets[data.activePet]
    if not activePet then return {} end
    
    -- Найти в каталоге
    for _, pet in ipairs(PET_CATALOG) do
        if pet.id == activePet.id then
            return {[pet.buff] = pet.value * activePet.level}
        end
    end
    
    return {}
end

-- ═══════════════════════════════════════════
-- 🔄 ИНИЦИАЛИЗАЦИЯ
-- ═══════════════════════════════════════════
function PetManager.Init()
    local remotes = game.ReplicatedStorage.Remotes
    
    local buyEggEvent = remotes:FindFirstChild("BuyEgg")
    if buyEggEvent then
        buyEggEvent.OnServerEvent:Connect(function(player, eggLevel)
            PetManager.BuyEgg(player, eggLevel)
        end)
    end
    
    local equipEvent = remotes:FindFirstChild("EquipPet")
    if equipEvent then
        equipEvent.OnServerEvent:Connect(function(player, petIndex)
            PetManager.EquipPet(player, petIndex)
        end)
    end
    
    local mergeEvent = remotes:FindFirstChild("MergePets")
    if mergeEvent then
        mergeEvent.OnServerEvent:Connect(function(player, petId)
            PetManager.MergePets(player, petId)
        end)
    end
end

return PetManager`
  },
  {
    path: 'ServerScriptService/AntiCheat',
    name: 'AntiCheat.lua',
    type: 'ModuleScript',
    category: 'Server',
    description: 'Защита от эксплойтов и читов',
    code: `--!strict
--[[
    AntiCheat.lua — ServerScriptService/AntiCheat
    Защита от эксплойтов: валидация, rate limiting, логирование
]]

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local GameConfig = require(game.ReplicatedStorage.Modules.GameConfig)

local AntiCheat = {}

-- Хранилище данных для каждого игрока
local playerActionLog: {[Player]: {number}} = {}
local playerWarnings: {[Player]: number} = {}
local playerLastPosition: {[Player]: Vector3} = {}

-- ═══════════════════════════════════════════
-- ⚡ RATE LIMITING
-- ═══════════════════════════════════════════
function AntiCheat.CheckRateLimit(player: Player): boolean
    local now = os.clock()
    local log = playerActionLog[player]
    
    if not log then
        playerActionLog[player] = {now}
        return true
    end
    
    -- Удалить старые записи (старше 1 секунды)
    local window = GameConfig.ANTICHEAT.RATE_LIMIT_WINDOW
    local newLog = {}
    for _, time in ipairs(log) do
        if now - time < window then
            table.insert(newLog, time)
        end
    end
    
    -- Проверить лимит
    if #newLog >= GameConfig.ANTICHEAT.MAX_ACTIONS_PER_SECOND then
        AntiCheat.FlagPlayer(player, "Rate limit exceeded")
        return false
    end
    
    table.insert(newLog, now)
    playerActionLog[player] = newLog
    return true
end

-- ═══════════════════════════════════════════
-- 📏 ПРОВЕРКА ДИСТАНЦИИ (Anti-Teleport)
-- ═══════════════════════════════════════════
function AntiCheat.CheckDistance(player: Player, targetPosition: Vector3): boolean
    local character = player.Character
    if not character then return false end
    
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return false end
    
    local currentPos = humanoidRootPart.Position
    local lastPos = playerLastPosition[player] or currentPos
    local distance = (currentPos - targetPosition).Magnitude
    
    -- Проверка телепортации
    if distance > GameConfig.ANTICHEAT.TELEPORT_THRESHOLD then
        AntiCheat.FlagPlayer(player, "Teleport detected: " .. math.floor(distance) .. " studs")
        return false
    end
    
    playerLastPosition[player] = currentPos
    return true
end

-- ═══════════════════════════════════════════
-- ✅ ВАЛИДАЦИЯ ДЕЙСТВИЙ
-- ═══════════════════════════════════════════
function AntiCheat.ValidatePlantAction(player: Player, bedIndex: number, seedId: string): boolean
    -- Rate limit
    if not AntiCheat.CheckRateLimit(player) then return false end
    
    -- Проверка что грядка существует
    local PlotManager = require(script.Parent.PlotManager)
    local plot = PlotManager.GetPlot(player)
    if not plot then
        AntiCheat.FlagPlayer(player, "Plant on non-existent plot")
        return false
    end
    
    if not plot.beds[bedIndex] then
        AntiCheat.FlagPlayer(player, "Invalid bed index: " .. tostring(bedIndex))
        return false
    end
    
    -- Проверка что семя существует
    local SeedData = require(game.ReplicatedStorage.Modules.SeedData)
    if not SeedData.GetSeed(seedId) then
        AntiCheat.FlagPlayer(player, "Invalid seed: " .. seedId)
        return false
    end
    
    -- Проверка что семя в инвентаре
    local PlayerManager = require(script.Parent.PlayerManager)
    if not PlayerManager.HasSeeds(player, seedId, 1) then
        AntiCheat.FlagPlayer(player, "Plant without seeds: " .. seedId)
        return false
    end
    
    return true
end

function AntiCheat.ValidateHarvestAction(player: Player, bedIndex: number): boolean
    if not AntiCheat.CheckRateLimit(player) then return false end
    
    local PlotManager = require(script.Parent.PlotManager)
    local plot = PlotManager.GetPlot(player)
    if not plot then return false end
    
    local bed = plot.beds[bedIndex]
    if not bed then
        AntiCheat.FlagPlayer(player, "Harvest invalid bed: " .. tostring(bedIndex))
        return false
    end
    
    if bed.state ~= "ready" then
        AntiCheat.FlagPlayer(player, "Harvest not-ready bed")
        return false
    end
    
    return true
end

function AntiCheat.ValidatePurchase(player: Player, cost: number): boolean
    if not AntiCheat.CheckRateLimit(player) then return false end
    
    if cost < 0 or cost > 1000000 then
        AntiCheat.FlagPlayer(player, "Invalid purchase cost: " .. tostring(cost))
        return false
    end
    
    local PlayerManager = require(script.Parent.PlayerManager)
    if PlayerManager.GetCoins(player) < cost then
        AntiCheat.FlagPlayer(player, "Purchase without funds")
        return false
    end
    
    return true
end

-- ═══════════════════════════════════════════
-- 🚨 ФЛАГИ И КИК
-- ═══════════════════════════════════════════
function AntiCheat.FlagPlayer(player: Player, reason: string)
    if not GameConfig.ANTICHEAT.LOG_SUSPICIOUS then return end
    
    -- Логирование
    warn("[AntiCheat] " .. player.Name .. " (ID: " .. player.UserId .. "): " .. reason)
    
    -- Увеличить предупреждения
    playerWarnings[player] = (playerWarnings[player] or 0) + 1
    
    -- Кик при превышении лимита
    if playerWarnings[player] >= GameConfig.ANTICHEAT.SUSPICIOUS_KICK_THRESHOLD then
        player:Kick("Подозрительная активность обнаружена. Код: AC-" .. playerWarnings[player])
        warn("[AntiCheat] KICKED: " .. player.Name .. " after " .. playerWarnings[player] .. " warnings")
    end
end

-- ═══════════════════════════════════════════
-- 🔄 ИНИЦИАЛИЗАЦИЯ
-- ═══════════════════════════════════════════
function AntiCheat.Init()
    -- Очистка при выходе
    Players.PlayerRemoving:Connect(function(player)
        playerActionLog[player] = nil
        playerWarnings[player] = nil
        playerLastPosition[player] = nil
    end)
    
    -- Мониторинг позиций
    task.spawn(function()
        while true do
            task.wait(5)
            for _, player in ipairs(Players:GetPlayers()) do
                local character = player.Character
                if character then
                    local hrp = character:FindFirstChild("HumanoidRootPart")
                    if hrp then
                        playerLastPosition[player] = hrp.Position
                    end
                end
            end
        end
    end)
    
    print("[AntiCheat] Система защиты активирована")
end

return AntiCheat`
  },
  {
    path: 'ServerScriptService/GameManager',
    name: 'GameManager.lua',
    type: 'Script',
    category: 'Server',
    description: 'Главный скрипт — инициализация всех систем',
    code: `--[[
    GameManager.lua — ServerScriptService/GameManager
    Главный скрипт: инициализация всех менеджеров, RemoteEvents
]]

local Players = game:GetService("Players")
local ServerScriptService = game:GetService("ServerScriptService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

print("═══════════════════════════════════════")
print("🌱 Grow a Garden: Ultimate — Загрузка...")
print("═══════════════════════════════════════")

-- ═══════════════════════════════════════════
-- 📡 СОЗДАНИЕ REMOTE EVENTS
-- ═══════════════════════════════════════════
local function CreateRemotes()
    local remotesFolder = Instance.new("Folder")
    remotesFolder.Name = "Remotes"
    remotesFolder.Parent = ReplicatedStorage
    
    -- Список всех RemoteEvents
    local remoteNames = {
        -- Данные игрока
        "CoinsUpdated", "XPUpdated", "LevelUp", "LevelReward",
        "StreakReward", "PlayerDataLoaded",
        
        -- Грядки
        "BedUpdated", "PlantSeed", "HarvestBed", "HarvestResult",
        "MutationFound", "PlotUpgraded", "BuildingPlaced",
        
        -- Магазин
        "BuySeed", "SellHarvest", "BuyUpgrade", "PurchaseComplete", "SellComplete",
        
        -- Питомцы
        "BuyEgg", "EquipPet", "MergePets", "PetHatched", "PetEquipped",
        "PetMerged", "IncubationStarted",
        
        -- Погода
        "WeatherChanged", "SeasonChanged",
        
        -- Задания
        "QuestCompleted", "QuestsUpdated",
        
        -- UI
        "PlaySound", "ShowNotification", "OpenShop",
        
        -- Торговля
        "TradeRequest", "TradeAccept", "TradeComplete",
    }
    
    for _, name in ipairs(remoteNames) do
        local remote = Instance.new("RemoteEvent")
        remote.Name = name
        remote.Parent = remotesFolder
    end
    
    -- RemoteFunctions (для запросов с ответом)
    local functionNames = {
        "GetPlayerData", "GetPlotData", "GetShopItems",
        "GetLeaderboard", "GetQuests",
    }
    
    for _, name in ipairs(functionNames) do
        local func = Instance.new("RemoteFunction")
        func.Name = name
        func.Parent = remotesFolder
    end
    
    print("[GameManager] ✅ RemoteEvents созданы (" .. #remoteNames .. " events, " .. #functionNames .. " functions)")
end

-- ═══════════════════════════════════════════
-- 🚀 ИНИЦИАЛИЗАЦИЯ МЕНЕДЖЕРОВ
-- ═══════════════════════════════════════════
local function InitManagers()
    local managers = {
        {name = "AntiCheat", module = require(ServerScriptService.AntiCheat)},
        {name = "PlayerManager", module = require(ServerScriptService.PlayerManager)},
        {name = "PlotManager", module = require(ServerScriptService.PlotManager)},
        {name = "ShopManager", module = require(ServerScriptService.ShopManager)},
        {name = "PetManager", module = require(ServerScriptService.PetManager)},
        {name = "WeatherManager", module = require(ServerScriptService.WeatherManager)},
    }
    
    -- Инициализация в правильном порядке
    for _, mgr in ipairs(managers) do
        local success, err = pcall(function()
            mgr.module.Init()
        end)
        
        if success then
            print("[GameManager] ✅ " .. mgr.name .. " загружен")
        else
            warn("[GameManager] ❌ " .. mgr.name .. " ошибка: " .. tostring(err))
        end
    end
end

-- ═══════════════════════════════════════════
-- 🎮 ОБРАБОТКА ВХОДА ИГРОКА
-- ═══════════════════════════════════════════
local function OnPlayerAdded(player: Player)
    print("[GameManager] Игрок зашёл: " .. player.Name)
    
    -- Ждём загрузки данных
    task.wait(3)
    
    -- Отправить начальные данные клиенту
    local PlayerManager = require(ServerScriptService.PlayerManager)
    local data = PlayerManager.GetData(player)
    
    if data then
        local remote = ReplicatedStorage.Remotes:FindFirstChild("PlayerDataLoaded")
        if remote then
            remote:FireClient(player, data)
        end
    end
end

-- ═══════════════════════════════════════════
-- 🏁 ЗАПУСК
-- ═══════════════════════════════════════════
CreateRemotes()
InitManagers()

Players.PlayerAdded:Connect(OnPlayerAdded)

-- Для уже подключённых игроков
for _, player in ipairs(Players:GetPlayers()) do
    task.spawn(OnPlayerAdded, player)
end

print("═══════════════════════════════════════")
print("🌱 Grow a Garden: Ultimate — Запущена!")
print("═══════════════════════════════════════")`
  },
  {
    path: 'StarterPlayer/StarterPlayerScripts/ClientMain',
    name: 'ClientMain.lua',
    type: 'LocalScript',
    category: 'Client',
    description: 'Точка входа клиента — инициализация UI и контроллеров',
    code: `--[[
    ClientMain.lua — StarterPlayer/StarterPlayerScripts/ClientMain
    Точка входа клиента: инициализация UI, подключение к серверу
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

print("[Client] Загрузка Grow a Garden: Ultimate...")

-- ═══════════════════════════════════════════
-- 📡 ПОДКЛЮЧЕНИЕ К REMOTES
-- ═══════════════════════════════════════════
local remotes = ReplicatedStorage:WaitForChild("Remotes", 10)
if not remotes then
    warn("[Client] Не удалось найти Remotes!")
    return
end

-- ═══════════════════════════════════════════
-- 🖥️ СОЗДАНИЕ ОСНОВНОГО UI
-- ═══════════════════════════════════════════
local function CreateMainUI()
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "MainUI"
    screenGui.ResetOnSpawn = false
    screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
    screenGui.Parent = playerGui
    
    -- ═══ ВЕРХНЯЯ ПАНЕЛЬ ═══
    local topBar = Instance.new("Frame")
    topBar.Name = "TopBar"
    topBar.Size = UDim2.new(1, 0, 0, 50)
    topBar.Position = UDim2.new(0, 0, 0, 0)
    topBar.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
    topBar.BackgroundTransparency = 0.2
    topBar.Parent = screenGui
    
    local topCorner = Instance.new("UICorner")
    topCorner.CornerRadius = UDim.new(0, 0, 0, 0)
    topCorner.Parent = topBar
    
    -- Монеты
    local coinsLabel = Instance.new("TextLabel")
    coinsLabel.Name = "CoinsLabel"
    coinsLabel.Size = UDim2.new(0, 150, 1, 0)
    coinsLabel.Position = UDim2.new(0, 10, 0, 0)
    coinsLabel.BackgroundTransparency = 1
    coinsLabel.Text = "💰 100"
    coinsLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
    coinsLabel.TextSize = 20
    coinsLabel.Font = Enum.Font.GothamBold
    coinsLabel.Parent = topBar
    
    -- Гемы
    local gemsLabel = Instance.new("TextLabel")
    gemsLabel.Name = "GemsLabel"
    gemsLabel.Size = UDim2.new(0, 120, 1, 0)
    gemsLabel.Position = UDim2.new(0, 170, 0, 0)
    gemsLabel.BackgroundTransparency = 1
    gemsLabel.Text = "💎 0"
    gemsLabel.TextColor3 = Color3.fromRGB(0, 206, 209)
    gemsLabel.TextSize = 20
    gemsLabel.Font = Enum.Font.GothamBold
    gemsLabel.Parent = topBar
    
    -- Уровень/XP
    local levelLabel = Instance.new("TextLabel")
    levelLabel.Name = "LevelLabel"
    levelLabel.Size = UDim2.new(0, 150, 1, 0)
    levelLabel.Position = UDim2.new(0, 300, 0, 0)
    levelLabel.BackgroundTransparency = 1
    levelLabel.Text = "⭐ Lvl 1"
    levelLabel.TextColor3 = Color3.fromRGB(168, 85, 247)
    levelLabel.TextSize = 20
    levelLabel.Font = Enum.Font.GothamBold
    levelLabel.Parent = topBar
    
    -- XP Bar
    local xpBar = Instance.new("Frame")
    xpBar.Name = "XPBar"
    xpBar.Size = UDim2.new(0, 200, 0, 8)
    xpBar.Position = UDim2.new(0, 300, 1, -12)
    xpBar.BackgroundColor3 = Color3.fromRGB(50, 50, 60)
    xpBar.Parent = topBar
    
    local xpFill = Instance.new("Frame")
    xpFill.Name = "XPFill"
    xpFill.Size = UDim2.new(0, 0, 1, 0)
    xpFill.BackgroundColor3 = Color3.fromRGB(168, 85, 247)
    xpFill.Parent = xpBar
    
    local xpCorner = Instance.new("UICorner")
    xpCorner.CornerRadius = UDim.new(0, 4, 0, 4)
    xpCorner.Parent = xpBar
    
    -- Погода
    local weatherLabel = Instance.new("TextLabel")
    weatherLabel.Name = "WeatherLabel"
    weatherLabel.Size = UDim2.new(0, 150, 1, 0)
    weatherLabel.Position = UDim2.new(1, -160, 0, 0)
    weatherLabel.BackgroundTransparency = 1
    weatherLabel.Text = "☀️ Sunny"
    weatherLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
    weatherLabel.TextSize = 18
    weatherLabel.Font = Enum.Font.GothamBold
    weatherLabel.Parent = topBar
    
    -- ═══ ЛЕВАЯ ПАНЕЛЬ (КНОПКИ) ═══
    local leftPanel = Instance.new("Frame")
    leftPanel.Name = "LeftPanel"
    leftPanel.Size = UDim2.new(0, 60, 0, 350)
    leftPanel.Position = UDim2.new(0, 10, 0.5, -175)
    leftPanel.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
    leftPanel.BackgroundTransparency = 0.3
    leftPanel.Parent = screenGui
    
    local leftCorner = Instance.new("UICorner")
    leftCorner.CornerRadius = UDim.new(0, 12, 0, 12)
    leftCorner.Parent = leftPanel
    
    local leftLayout = Instance.new("UIListLayout")
    leftLayout.Padding = UDim.new(0, 5)
    leftLayout.Parent = leftPanel
    
    -- Кнопки
    local buttons = {
        {name = "InventoryBtn", text = "🎒", tip = "Инвентарь"},
        {name = "PetsBtn", text = "🐝", tip = "Питомцы"},
        {name = "QuestsBtn", text = "📜", tip = "Задания"},
        {name = "LeaderboardBtn", text = "🏆", tip = "Топ"},
        {name = "ShopBtn", text = "🛒", tip = "Магазин"},
        {name = "SettingsBtn", text = "⚙️", tip = "Настройки"},
    }
    
    for _, btnInfo in ipairs(buttons) do
        local btn = Instance.new("TextButton")
        btn.Name = btnInfo.name
        btn.Size = UDim2.new(1, -10, 0, 50)
        btn.BackgroundColor3 = Color3.fromRGB(50, 50, 70)
        btn.Text = btnInfo.text
        btn.TextSize = 24
        btn.TextColor3 = Color3.fromRGB(255, 255, 255)
        btn.Font = Enum.Font.GothamBold
        btn.Parent = leftPanel
        
        local btnCorner = Instance.new("UICorner")
        btnCorner.CornerRadius = UDim.new(0, 10, 0, 10)
        btnCorner.Parent = btn
        
        -- Hover эффект
        btn.MouseEnter:Connect(function()
            TweenService:Create(btn, TweenInfo.new(0.2), {
                BackgroundColor3 = Color3.fromRGB(80, 80, 120),
                Size = UDim2.new(1, 0, 0, 55),
            }):Play()
        end)
        
        btn.MouseLeave:Connect(function()
            TweenService:Create(btn, TweenInfo.new(0.2), {
                BackgroundColor3 = Color3.fromRGB(50, 50, 70),
                Size = UDim2.new(1, -10, 0, 50),
            }):Play()
        end)
    end
    
    -- ═══ НИЖНЯЯ ПАНЕЛЬ (ХОТБАР) ═══
    local hotbar = Instance.new("Frame")
    hotbar.Name = "Hotbar"
    hotbar.Size = UDim2.new(0, 500, 0, 60)
    hotbar.Position = UDim2.new(0.5, -250, 1, -70)
    hotbar.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
    hotbar.BackgroundTransparency = 0.3
    hotbar.Parent = screenGui
    
    local hotbarCorner = Instance.new("UICorner")
    hotbarCorner.CornerRadius = UDim.new(0, 12, 0, 12)
    hotbarCorner.Parent = hotbar
    
    local hotbarLayout = Instance.new("UIListLayout")
    hotbarLayout.FillDirection = Enum.FillDirection.Horizontal
    hotbarLayout.Padding = UDim.new(0, 5)
    hotbarLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
    hotbarLayout.Parent = hotbar
    
    -- 10 слотов хотбара
    for i = 1, 10 do
        local slot = Instance.new("TextButton")
        slot.Name = "Slot" .. i
        slot.Size = UDim2.new(0, 45, 0, 45)
        slot.BackgroundColor3 = Color3.fromRGB(50, 50, 70)
        slot.Text = ""
        slot.Font = Enum.Font.GothamBold
        slot.TextSize = 14
        slot.TextColor3 = Color3.fromRGB(255, 255, 255)
        slot.Parent = hotbar
        
        local slotCorner = Instance.new("UICorner")
        slotCorner.CornerRadius = UDim.new(0, 8, 0, 8)
        slotCorner.Parent = slot
        
        -- Номер слота
        local numLabel = Instance.new("TextLabel")
        numLabel.Size = UDim2.new(0, 15, 0, 15)
        numLabel.Position = UDim2.new(0, 2, 0, 2)
        numLabel.BackgroundTransparency = 1
        numLabel.Text = tostring(i)
        numLabel.TextColor3 = Color3.fromRGB(150, 150, 150)
        numLabel.TextSize = 10
        numLabel.Font = Enum.Font.GothamBold
        numLabel.Parent = slot
    end
    
    return screenGui
end

-- ═══════════════════════════════════════════
-- 🔔 СИСТЕМА УВЕДОМЛЕНИЙ
-- ═══════════════════════════════════════════
local function CreateNotification(text: string, color: Color3, duration: number)
    local notification = Instance.new("TextLabel")
    notification.Size = UDim2.new(0, 300, 0, 40)
    notification.Position = UDim2.new(0.5, -150, 0, -50)
    notification.BackgroundColor3 = color
    notification.BackgroundTransparency = 0.2
    notification.Text = text
    notification.TextColor3 = Color3.fromRGB(255, 255, 255)
    notification.TextSize = 16
    notification.Font = Enum.Font.GothamBold
    notification.Parent = playerGui.MainUI
    
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 10, 0, 10)
    corner.Parent = notification
    
    -- Анимация появления
    TweenService:Create(notification, TweenInfo.new(0.5, Enum.EasingStyle.Back), {
        Position = UDim2.new(0.5, -150, 0, 60),
    }):Play()
    
    -- Анимация исчезновения
    task.delay(duration or 3, function()
        TweenService:Create(notification, TweenInfo.new(0.5), {
            Position = UDim2.new(0.5, -150, 0, -50),
            BackgroundTransparency = 1,
            TextTransparency = 1,
        }):Play()
        task.wait(0.5)
        notification:Destroy()
    end)
end

-- ═══════════════════════════════════════════
-- 🎮 ПОДКЛЮЧЕНИЕ СОБЫТИЙ
-- ═══════════════════════════════════════════
local function ConnectEvents()
    -- Обновление монет
    local coinsEvent = remotes:FindFirstChild("CoinsUpdated")
    if coinsEvent then
        coinsEvent.OnClientEvent:Connect(function(newAmount, earned)
            local label = playerGui.MainUI.TopBar.CoinsLabel
            label.Text = "💰 " .. newAmount
            if earned > 0 then
                CreateNotification("+" .. earned .. " монет!", Color3.fromRGB(255, 215, 0), 2)
            end
        end)
    end
    
    -- Обновление XP
    local xpEvent = remotes:FindFirstChild("XPUpdated")
    if xpEvent then
        xpEvent.OnClientEvent:Connect(function(xp, level)
            local label = playerGui.MainUI.TopBar.LevelLabel
            label.Text = "⭐ Lvl " .. level
            
            -- Обновить XP бар
            local xpFill = playerGui.MainUI.TopBar.LevelLabel.Parent.XPBar.XPFill
            local xpNeeded = math.floor(100 * (level ^ 1.5))
            local ratio = math.clamp(xp / xpNeeded, 0, 1)
            TweenService:Create(xpFill, TweenInfo.new(0.5), {
                Size = UDim2.new(ratio, 0, 1, 0),
            }):Play()
        end)
    end
    
    -- Повышение уровня
    local levelUpEvent = remotes:FindFirstChild("LevelUp")
    if levelUpEvent then
        levelUpEvent.OnClientEvent:Connect(function(level)
            CreateNotification("🎉 Уровень " .. level .. "!", Color3.fromRGB(168, 85, 247), 4)
        end)
    end
    
    -- Мутация!
    local mutationEvent = remotes:FindFirstChild("MutationFound")
    if mutationEvent then
        mutationEvent.OnClientEvent:Connect(function(bedIndex, mutationName)
            CreateNotification("✨ МУТАЦИЯ: " .. mutationName .. "!", Color3.fromRGB(255, 105, 180), 5)
        end)
    end
    
    -- Погода
    local weatherEvent = remotes:FindFirstChild("WeatherChanged")
    if weatherEvent then
        weatherEvent.OnClientEvent:Connect(function(weather, duration)
            local weatherEmojis = {
                sunny = "☀️", cloudy = "☁️", rainy = "🌧️",
                storm = "⛈️", snowy = "❄️", rainbow = "🌈",
                tornado = "🌪️", meteor = "☄️",
            }
            local emoji = weatherEmojis[weather] or "☀️"
            local label = playerGui.MainUI.TopBar.WeatherLabel
            label.Text = emoji .. " " .. weather
        end)
    end
    
    -- Урожай собран
    local harvestEvent = remotes:FindFirstChild("HarvestResult")
    if harvestEvent then
        harvestEvent.OnClientEvent:Connect(function(harvest)
            CreateNotification("🌾 Собрано: " .. harvest.seedId .. " (💰" .. harvest.sellPrice .. ")", Color3.fromRGB(34, 197, 94), 3)
        end)
    end
end

-- ═══════════════════════════════════════════
-- 🏁 ЗАПУСК
-- ═══════════════════════════════════════════
local mainUI = CreateMainUI()
ConnectEvents()

print("[Client] ✅ Grow a Garden: Ultimate загружена!")`
  },
  {
    path: 'ServerScriptService/TradeManager',
    name: 'TradeManager.lua',
    type: 'ModuleScript',
    category: 'Server',
    description: 'Обмен между игроками',
    code: `--!strict
--[[
    TradeManager.lua — ServerScriptService/TradeManager
    Система обмена между игроками
]]

local Players = game:GetService("Players")

local PlayerManager = require(script.Parent.PlayerManager)
local SeedData = require(game.ReplicatedStorage.Modules.SeedData)

local TradeManager = {}

-- Активные обмены
local activeTrades: {[string]: any} = {}

-- ═══════════════════════════════════════════
-- 🤝 ЗАПРОС НА ОБМЕН
-- ═══════════════════════════════════════════
function TradeManager.RequestTrade(player1: Player, player2: Player): boolean
    local tradeId = player1.UserId .. "_" .. player2.UserId
    
    activeTrades[tradeId] = {
        player1 = player1,
        player2 = player2,
        player1Offer = {},
        player2Offer = {},
        player1Confirmed = false,
        player2Confirmed = false,
        status = "pending",
    }
    
    -- Уведомление player2
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("TradeRequest")
    if remote then
        remote:FireClient(player2, player1.Name, tradeId)
    end
    
    -- Таймаут 60 секунд
    task.delay(60, function()
        if activeTrades[tradeId] and activeTrades[tradeId].status == "pending" then
            activeTrades[tradeId] = nil
        end
    end)
    
    return true
end

-- ═══════════════════════════════════════════
-- ✅ ПРИНЯТЬ ОБМЕН
-- ═══════════════════════════════════════════
function TradeManager.AcceptTrade(player: Player, tradeId: string): boolean
    local trade = activeTrades[tradeId]
    if not trade then return false end
    
    trade.status = "active"
    return true
end

-- ═══════════════════════════════════════════
-- 💱 ДОБАВИТЬ ПРЕДМЕТ В ОБМЕН
-- ═══════════════════════════════════════════
function TradeManager.AddItem(player: Player, tradeId: string, itemId: string, count: number): boolean
    local trade = activeTrades[tradeId]
    if not trade or trade.status ~= "active" then return false end
    
    -- Проверка что предмет есть
    if not PlayerManager.HasSeeds(player, itemId, count) then
        return false
    end
    
    -- Добавить в оффер
    if player == trade.player1 then
        trade.player1Offer[itemId] = (trade.player1Offer[itemId] or 0) + count
        trade.player1Confirmed = false
    else
        trade.player2Offer[itemId] = (trade.player2Offer[itemId] or 0) + count
        trade.player2Confirmed = false
    end
    
    return true
end

-- ═══════════════════════════════════════════
-- ✔️ ПОДТВЕРДИТЬ ОБМЕН
-- ═══════════════════════════════════════════
function TradeManager.ConfirmTrade(player: Player, tradeId: string): boolean
    local trade = activeTrades[tradeId]
    if not trade or trade.status ~= "active" then return false end
    
    if player == trade.player1 then
        trade.player1Confirmed = true
    elseif player == trade.player2 then
        trade.player2Confirmed = true
    end
    
    -- Если оба подтвердили — выполнить обмен
    if trade.player1Confirmed and trade.player2Confirmed then
        TradeManager.ExecuteTrade(tradeId)
    end
    
    return true
end

-- ═══════════════════════════════════════════
-- 🔄 ВЫПОЛНИТЬ ОБМЕН
-- ═══════════════════════════════════════════
function TradeManager.ExecuteTrade(tradeId: string)
    local trade = activeTrades[tradeId]
    if not trade then return end
    
    local p1 = trade.player1
    local p2 = trade.player2
    
    -- Проверка что предметы всё ещё есть
    for itemId, count in pairs(trade.player1Offer) do
        if not PlayerManager.HasSeeds(p1, itemId, count) then
            -- Отмена — предметы исчезли
            TradeManager.CancelTrade(tradeId, "Предметы недоступны")
            return
        end
    end
    
    for itemId, count in pairs(trade.player2Offer) do
        if not PlayerManager.HasSeeds(p2, itemId, count) then
            TradeManager.CancelTrade(tradeId, "Предметы недоступны")
            return
        end
    end
    
    -- Удаление предметов у P1, добавление P2
    for itemId, count in pairs(trade.player1Offer) do
        PlayerManager.RemoveSeed(p1, itemId, count)
        PlayerManager.AddSeed(p2, itemId, count)
    end
    
    -- Удаление предметов у P2, добавление P1
    for itemId, count in pairs(trade.player2Offer) do
        PlayerManager.RemoveSeed(p2, itemId, count)
        PlayerManager.AddSeed(p1, itemId, count)
    end
    
    -- Уведомления
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("TradeComplete")
    if remote then
        remote:FireClient(p1, true)
        remote:FireClient(p2, true)
    end
    
    activeTrades[tradeId] = nil
end

function TradeManager.CancelTrade(tradeId: string, reason: string)
    local trade = activeTrades[tradeId]
    if not trade then return end
    
    local remote = game.ReplicatedStorage.Remotes:FindFirstChild("TradeComplete")
    if remote then
        remote:FireClient(trade.player1, false, reason)
        remote:FireClient(trade.player2, false, reason)
    end
    
    activeTrades[tradeId] = nil
end

-- ═══════════════════════════════════════════
-- 🔄 ИНИЦИАЛИЗАЦИЯ
-- ═══════════════════════════════════════════
function TradeManager.Init()
    local remotes = game.ReplicatedStorage.Remotes
    
    local requestEvent = remotes:FindFirstChild("TradeRequest")
    if requestEvent then
        requestEvent.OnServerEvent:Connect(function(player, targetPlayerName)
            local target = Players:FindFirstChild(targetPlayerName)
            if target then
                TradeManager.RequestTrade(player, target)
            end
        end)
    end
    
    local acceptEvent = remotes:FindFirstChild("TradeAccept")
    if acceptEvent then
        acceptEvent.OnServerEvent:Connect(function(player, tradeId)
            TradeManager.AcceptTrade(player, tradeId)
        end)
    end
    
    print("[TradeManager] ✅ Система торговли активирована")
end

return TradeManager`
  },
  {
    path: 'ServerScriptService/LeaderboardManager',
    name: 'LeaderboardManager.lua',
    type: 'ModuleScript',
    category: 'Server',
    description: 'Таблицы лидеров и статистика',
    code: `--!strict
--[[
    LeaderboardManager.lua — ServerScriptService/LeaderboardManager
    Управление таблицами лидеров
]]

local Players = game:GetService("Players")

local PlayerManager = require(script.Parent.PlayerManager)

local LeaderboardManager = {}

-- Кэшированные топы
local leaderboards = {
    coins = {},
    harvested = {},
    level = {},
    mutations = {},
}

-- ═══════════════════════════════════════════
-- 📊 ОБНОВЛЕНИЕ ТОПА
-- ═══════════════════════════════════════════
function LeaderboardManager.UpdateLeaderboards()
    local coinBoard = {}
    local harvestBoard = {}
    local levelBoard = {}
    local mutationBoard = {}
    
    for _, player in ipairs(Players:GetPlayers()) do
        local data = PlayerManager.GetData(player)
        if data then
            table.insert(coinBoard, {name = player.Name, value = data.coins})
            table.insert(harvestBoard, {name = player.Name, value = data.stats.totalHarvested})
            table.insert(levelBoard, {name = player.Name, value = data.level})
            table.insert(mutationBoard, {name = player.Name, value = data.stats.totalMutations})
        end
    end
    
    -- Сортировка
    table.sort(coinBoard, function(a, b) return a.value > b.value end)
    table.sort(harvestBoard, function(a, b) return a.value > b.value end)
    table.sort(levelBoard, function(a, b) return a.value > b.value end)
    table.sort(mutationBoard, function(a, b) return a.value > b.value end)
    
    -- Топ-10
    local function top10(board: {any}): {any}
        local result = {}
        for i = 1, math.min(10, #board) do
            table.insert(result, board[i])
        end
        return result
    end
    
    leaderboards.coins = top10(coinBoard)
    leaderboards.harvested = top10(harvestBoard)
    leaderboards.level = top10(levelBoard)
    leaderboards.mutations = top10(mutationBoard)
end

-- ═══════════════════════════════════════════
-- 📋 ПОЛУЧЕНИЕ ТОПА
-- ═══════════════════════════════════════════
function LeaderboardManager.GetLeaderboard(category: string): {any}
    return leaderboards[category] or {}
end

-- ═══════════════════════════════════════════
-- 🔄 ИНИЦИАЛИЗАЦИЯ
-- ═══════════════════════════════════════════
function LeaderboardManager.Init()
    -- Обновление каждые 30 секунд
    task.spawn(function()
        while true do
            task.wait(30)
            LeaderboardManager.UpdateLeaderboards()
        end
    end)
    
    -- RemoteFunction для запросов
    local getLeaderboard = game.ReplicatedStorage.Remotes:FindFirstChild("GetLeaderboard")
    if getLeaderboard then
        getLeaderboard.OnServerInvoke = function(player, category)
            return LeaderboardManager.GetLeaderboard(category)
        end
    end
    
    print("[LeaderboardManager] ✅ Таблицы лидеров активированы")
end

return LeaderboardManager`
  },
  {
    path: 'ServerScriptService/QuestManager',
    name: 'QuestManager.lua',
    type: 'ModuleScript',
    category: 'Server',
    description: 'Ежедневные задания и награды',
    code: `--!strict
--[[
    QuestManager.lua — ServerScriptService/QuestManager
    Управление ежедневными заданиями
]]

local Players = game:GetService("Players")

local GameConfig = require(game.ReplicatedStorage.Modules.GameConfig)
local PlayerManager = require(script.Parent.PlayerManager)

local QuestManager = {}

-- ═══════════════════════════════════════════
-- 📜 ПОЛУЧЕНИЕ ЗАДАНИЙ
-- ═══════════════════════════════════════════
function QuestManager.GetQuests(player: Player): {any}
    local data = PlayerManager.GetData(player)
    if not data then return {} end
    return data.dailyQuests or {}
end

-- ═══════════════════════════════════════════
-- 🎁 ЗАБРАТЬ НАГРАДУ
-- ═══════════════════════════════════════════
function QuestManager.ClaimReward(player: Player, questIndex: number): (boolean, string?)
    local data = PlayerManager.GetData(player)
    if not data then return false, "Ошибка данных" end
    
    local quest = data.dailyQuests[questIndex]
    if not quest then return false, "Задание не найдено" end
    
    if not quest.completed then
        return false, "Задание не выполнено"
    end
    
    if quest.claimed then
        return false, "Награда уже получена"
    end
    
    -- Выдать награду
    PlayerManager.AddCoins(player, quest.reward)
    quest.claimed = true
    
    -- Проверить выполнение всех заданий
    local allComplete = true
    for _, q in ipairs(data.dailyQuests) do
        if not q.claimed then
            allComplete = false
            break
        end
    end
    
    if allComplete then
        -- Бонус за все задания
        PlayerManager.AddCoins(player, 5000)
        
        local remote = game.ReplicatedStorage.Remotes:FindFirstChild("QuestCompleted")
        if remote then
            remote:FireClient(player, {name = "Все задания выполнены!", bonus = 5000})
        end
    end
    
    return true, nil
end

-- ═══════════════════════════════════════════
-- 🔄 ИНИЦИАЛИЗАЦИЯ
-- ═══════════════════════════════════════════
function QuestManager.Init()
    local getQuests = game.ReplicatedStorage.Remotes:FindFirstChild("GetQuests")
    if getQuests then
        getQuests.OnServerInvoke = function(player)
            return QuestManager.GetQuests(player)
        end
    end
    
    print("[QuestManager] ✅ Система заданий активирована")
end

return QuestManager`
  },
];
