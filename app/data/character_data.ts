import { ImageURISource } from 'react-native';

export interface CharacterIcon {
  default: ImageURISource;
  red?: ImageURISource;
  blue?: ImageURISource;
}

export interface CharacterData {
  id: CharacterId;
  type: CharacterType;
  icon: CharacterIcon;
}

export enum CharacterId {
  Alhadikhia = 'alhadikhia',
  Baojun = 'baojun',
  Dianyuzhang = 'dianyuzhang',
  Fanggu = 'fanggu',
  Guhuoniao = 'guhuoniao',
  Hundun = 'hundun',
  Imp = 'imp',
  Jianning = 'jianning',
  Kazali = 'kazali',
  Legion = 'legion',
  Leviathan = 'leviathan',
  Lilmonsta = 'lilmonsta',
  Lleech = 'lleech',
  Lordoftyphon = 'lordoftyphon',
  Nodashii = 'nodashii',
  Ojo = 'ojo',
  Po = 'po',
  Pukka = 'pukka',
  Qiongqi = 'qiongqi',
  Riot = 'riot',
  Shabaloth = 'shabaloth',
  Shimengmo = 'shimengmo',
  Taotie = 'taotie',
  Taowu = 'taowu',
  Vigormortis = 'vigormortis',
  Vortox = 'vortox',
  Yaggababble = 'yaggababble',
  Yanluo = 'yanluo',
  Zombuul = 'zombuul',
  Angel = 'angel',
  Bootlegger = 'bootlegger',
  Buddhist = 'buddhist',
  Deusexfiasco = 'deusexfiasco',
  Djinn = 'djinn',
  Doomsayer = 'doomsayer',
  Duchess = 'duchess',
  Ferryman = 'ferryman',
  Fibbin = 'fibbin',
  Fiddler = 'fiddler',
  Gardener = 'gardener',
  Hellslibrarian = 'hellslibrarian',
  Qilin = 'qilin',
  Revolutionary = 'revolutionary',
  Sentinel = 'sentinel',
  Shelingchengzhi = 'shelingchengzhi',
  Spiritofivory = 'spiritofivory',
  Stormcatcher = 'stormcatcher',
  Toymaker = 'toymaker',
  Assassin = 'assassin',
  Baron = 'baron',
  Boffin = 'boffin',
  Boomdandy = 'boomdandy',
  Cerenovus = 'cerenovus',
  Chimei = 'chimei',
  Devilsadvocate = 'devilsadvocate',
  Eviltwin = 'eviltwin',
  Fearmonger = 'fearmonger',
  Ganshiren = 'ganshiren',
  Goblin = 'goblin',
  Godfather = 'godfather',
  Gudiao = 'gudiao',
  Harpy = 'harpy',
  Huapi = 'huapi',
  Humeiniang = 'humeiniang',
  Jinweijun = 'jinweijun',
  Jinweijun2 = 'jinweijun2',
  Marionette = 'marionette',
  Mastermind = 'mastermind',
  Mengpo = 'mengpo',
  Mephit = 'mephit',
  Mezepheles = 'mezepheles',
  Niangjiushi = 'niangjiushi',
  Organgrinder = 'organgrinder',
  Panguan = 'panguan',
  Pithag = 'pithag',
  Poisoner = 'poisoner',
  Psychopath = 'psychopath',
  Scarletwoman = 'scarletwoman',
  Spy = 'spy',
  Summoner = 'summoner',
  Vizier = 'vizier',
  Widow = 'widow',
  Witch = 'witch',
  Yangguren = 'yangguren',
  Barber = 'barber',
  Butler = 'butler',
  Damsel = 'damsel',
  Drunk = 'drunk',
  Golem = 'golem',
  Goon = 'goon',
  Hatter = 'hatter',
  Heretic = 'heretic',
  Jiubao = 'jiubao',
  Klutz = 'klutz',
  Lunatic = 'lunatic',
  Moonchild = 'moonchild',
  Mutant = 'mutant',
  Nichen = 'nichen',
  Ogre = 'ogre',
  Plaguedoctor = 'plaguedoctor',
  Politician = 'politician',
  Puzzlemaster = 'puzzlemaster',
  Recluse = 'recluse',
  Rulianshi = 'rulianshi',
  Saint = 'saint',
  Shaxing = 'shaxing',
  Shijie = 'shijie',
  Shusheng = 'shusheng',
  Shutong = 'shutong',
  Snitch = 'snitch',
  Sweetheart = 'sweetheart',
  Tinker = 'tinker',
  Zealot = 'zealot',
  Acrobat = 'acrobat',
  Alchemist = 'alchemist',
  Alsaahir = 'alsaahir',
  Amnesiac = 'amnesiac',
  Artist = 'artist',
  Atheist = 'atheist',
  Balloonist = 'balloonist',
  Banshee = 'banshee',
  Banxian = 'banxian',
  Bianlianshi = 'bianlianshi',
  Bingbi = 'bingbi',
  Bountyhunter = 'bountyhunter',
  Cannibal = 'cannibal',
  Chambermaid = 'chambermaid',
  Chef = 'chef',
  Choirboy = 'choirboy',
  Chongfei = 'chongfei',
  Clockmaker = 'clockmaker',
  Courtier = 'courtier',
  Cultleader = 'cultleader',
  Dagengren = 'dagengren',
  Daoke = 'daoke',
  Daoshi = 'daoshi',
  Dianxiaoer = 'dianxiaoer',
  Dreamer = 'dreamer',
  Empath = 'empath',
  Engineer = 'engineer',
  Exorcist = 'exorcist',
  Fangshi = 'fangshi',
  Farmer = 'farmer',
  Fengshuishi = 'fengshuishi',
  Fisherman = 'fisherman',
  Flowergirl = 'flowergirl',
  Fool = 'fool',
  Fortuneteller = 'fortuneteller',
  Gambler = 'gambler',
  Geling = 'geling',
  General = 'general',
  Gossip = 'gossip',
  Grandmother = 'grandmother',
  Heshang = 'heshang',
  Highpriestess = 'highpriestess',
  Huntsman = 'huntsman',
  Innkeeper = 'innkeeper',
  Investigator = 'investigator',
  Jinyiwei = 'jinyiwei',
  Juggler = 'juggler',
  King = 'king',
  Knight = 'knight',
  Langzhong = 'langzhong',
  Lankeren = 'lankeren',
  Librarian = 'librarian',
  Limao = 'limao',
  Lycanthrope = 'lycanthrope',
  Magician = 'magician',
  Mathematician = 'mathematician',
  Mayor = 'mayor',
  Minstrel = 'minstrel',
  Monk = 'monk',
  Nightwatchman = 'nightwatchman',
  Noble = 'noble',
  Oracle = 'oracle',
  Pacifist = 'pacifist',
  Philosopher = 'philosopher',
  Pixie = 'pixie',
  Poppygrower = 'poppygrower',
  Preacher = 'preacher',
  Professor = 'professor',
  Qianke = 'qianke',
  Qintianjian = 'qintianjian',
  Ranfangfangzhu = 'ranfangfangzhu',
  Ravenkeeper = 'ravenkeeper',
  Sage = 'sage',
  Sailor = 'sailor',
  Savant = 'savant',
  Seamstress = 'seamstress',
  Shiguan = 'shiguan',
  Shugenja = 'shugenja',
  Slayer = 'slayer',
  Snakecharmer = 'snakecharmer',
  Soldier = 'soldier',
  Steward = 'steward',
  Tealady = 'tealady',
  Tixingguan = 'tixingguan',
  Towncrier = 'towncrier',
  Undertaker = 'undertaker',
  Villageidiot = 'villageidiot',
  Virgin = 'virgin',
  Washerwoman = 'washerwoman',
  Wudaozhe = 'wudaozhe',
  Wushiren = 'wushiren',
  Xingjiaoshang = 'xingjiaoshang',
  Xionghaizi = 'xionghaizi',
  Xizi = 'xizi',
  Xuncha = 'xuncha',
  Yanshi = 'yanshi',
  Yinluren = 'yinluren',
  Yinyangshi = 'yinyangshi',
  Yishi = 'yishi',
  Yongjiang = 'yongjiang',
  Zhen = 'zhen',
  Zhifu = 'zhifu',
  Apprentice = 'apprentice',
  Barista = 'barista',
  Beggar = 'beggar',
  Bishop = 'bishop',
  Bonecollector = 'bonecollector',
  Bureaucrat = 'bureaucrat',
  Butcher = 'butcher',
  Deviant = 'deviant',
  Diaomin = 'diaomin',
  Gangster = 'gangster',
  Gunslinger = 'gunslinger',
  Harlot = 'harlot',
  Hebo = 'hebo',
  Jiaohuazi = 'jiaohuazi',
  Judge = 'judge',
  Matron = 'matron',
  Scapegoat = 'scapegoat',
  Thief = 'thief',
  Voudon = 'voudon',
}

export enum CharacterType {
  Demon = 'demon',
  Minion = 'minion',
  Townsfolk = 'townsfolk',
  Outsider = 'outsider',
  Traveller = 'traveller',
  Fabled = 'fabled',
}

const CHARACTERS: CharacterData[] = [
  {
    id: CharacterId.Alhadikhia,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/alhadikhia.webp'),
      blue: require('@/assets/images/icons/demon/alhadikhia__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Baojun,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/baojun.webp'),
      blue: require('@/assets/images/icons/demon/baojun__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Dianyuzhang,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/dianyuzhang.webp'),
      blue: require('@/assets/images/icons/demon/dianyuzhang__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Fanggu,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/fanggu.webp'),
      blue: require('@/assets/images/icons/demon/fanggu__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Guhuoniao,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/guhuoniao.webp'),
      blue: require('@/assets/images/icons/demon/guhuoniao__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Hundun,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/hundun.webp'),
      blue: require('@/assets/images/icons/demon/hundun__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Imp,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/imp.webp'),
      blue: require('@/assets/images/icons/demon/imp__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Jianning,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/jianning.webp'),
      blue: require('@/assets/images/icons/demon/jianning__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Kazali,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/kazali.webp'),
      blue: require('@/assets/images/icons/demon/kazali__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Legion,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/legion.webp'),
      blue: require('@/assets/images/icons/demon/legion__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Leviathan,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/leviathan.webp'),
      blue: require('@/assets/images/icons/demon/leviathan__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Lilmonsta,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/lilmonsta.webp'),
      blue: require('@/assets/images/icons/demon/lilmonsta__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Lleech,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/lleech.webp'),
      blue: require('@/assets/images/icons/demon/lleech__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Lordoftyphon,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/lordoftyphon.webp'),
      blue: require('@/assets/images/icons/demon/lordoftyphon__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Nodashii,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/nodashii.webp'),
      blue: require('@/assets/images/icons/demon/nodashii__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Ojo,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/ojo.webp'),
      blue: require('@/assets/images/icons/demon/ojo__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Po,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/po.webp'),
      blue: require('@/assets/images/icons/demon/po__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Pukka,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/pukka.webp'),
      blue: require('@/assets/images/icons/demon/pukka__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Qiongqi,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/qiongqi.webp'),
      blue: require('@/assets/images/icons/demon/qiongqi__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Riot,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/riot.webp'),
      blue: require('@/assets/images/icons/demon/riot__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Shabaloth,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/shabaloth.webp'),
      blue: require('@/assets/images/icons/demon/shabaloth__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Shimengmo,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/shimengmo.webp'),
      blue: require('@/assets/images/icons/demon/shimengmo__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Taotie,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/taotie.webp'),
      blue: require('@/assets/images/icons/demon/taotie__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Taowu,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/taowu.webp'),
      blue: require('@/assets/images/icons/demon/taowu__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Vigormortis,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/vigormortis.webp'),
      blue: require('@/assets/images/icons/demon/vigormortis__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Vortox,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/vortox.webp'),
      blue: require('@/assets/images/icons/demon/vortox__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Yaggababble,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/yaggababble.webp'),
      blue: require('@/assets/images/icons/demon/yaggababble__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Yanluo,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/yanluo.webp'),
      blue: require('@/assets/images/icons/demon/yanluo__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Zombuul,
    type: CharacterType.Demon,
    icon: {
      default: require('@/assets/images/icons/demon/zombuul.webp'),
      blue: require('@/assets/images/icons/demon/zombuul__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Angel,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/angel.webp'),
    },
  },
  {
    id: CharacterId.Bootlegger,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/bootlegger.webp'),
    },
  },
  {
    id: CharacterId.Buddhist,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/buddhist.webp'),
    },
  },
  {
    id: CharacterId.Deusexfiasco,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/deusexfiasco.webp'),
    },
  },
  {
    id: CharacterId.Djinn,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/djinn.webp'),
    },
  },
  {
    id: CharacterId.Doomsayer,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/doomsayer.webp'),
    },
  },
  {
    id: CharacterId.Duchess,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/duchess.webp'),
    },
  },
  {
    id: CharacterId.Ferryman,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/ferryman.webp'),
    },
  },
  {
    id: CharacterId.Fibbin,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/fibbin.webp'),
    },
  },
  {
    id: CharacterId.Fiddler,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/fiddler.webp'),
    },
  },
  {
    id: CharacterId.Gardener,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/gardener.webp'),
    },
  },
  {
    id: CharacterId.Hellslibrarian,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/hellslibrarian.webp'),
    },
  },
  {
    id: CharacterId.Qilin,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/qilin.webp'),
    },
  },
  {
    id: CharacterId.Revolutionary,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/revolutionary.webp'),
    },
  },
  {
    id: CharacterId.Sentinel,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/sentinel.webp'),
    },
  },
  {
    id: CharacterId.Shelingchengzhi,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/shelingchengzhi.webp'),
    },
  },
  {
    id: CharacterId.Spiritofivory,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/spiritofivory.webp'),
    },
  },
  {
    id: CharacterId.Stormcatcher,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/stormcatcher.webp'),
    },
  },
  {
    id: CharacterId.Toymaker,
    type: CharacterType.Fabled,
    icon: {
      default: require('@/assets/images/icons/fabled/toymaker.webp'),
    },
  },
  {
    id: CharacterId.Assassin,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/assassin.webp'),
      blue: require('@/assets/images/icons/minion/assassin__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Baron,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/baron.webp'),
      blue: require('@/assets/images/icons/minion/baron__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Boffin,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/boffin.webp'),
      blue: require('@/assets/images/icons/minion/boffin__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Boomdandy,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/boomdandy.webp'),
      blue: require('@/assets/images/icons/minion/boomdandy__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Cerenovus,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/cerenovus.webp'),
      blue: require('@/assets/images/icons/minion/cerenovus__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Chimei,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/chimei.webp'),
      blue: require('@/assets/images/icons/minion/chimei__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Devilsadvocate,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/devilsadvocate.webp'),
      blue: require('@/assets/images/icons/minion/devilsadvocate__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Eviltwin,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/eviltwin.webp'),
      blue: require('@/assets/images/icons/minion/eviltwin__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Fearmonger,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/fearmonger.webp'),
      blue: require('@/assets/images/icons/minion/fearmonger__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Ganshiren,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/ganshiren.webp'),
      blue: require('@/assets/images/icons/minion/ganshiren__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Goblin,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/goblin.webp'),
      blue: require('@/assets/images/icons/minion/goblin__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Godfather,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/godfather.webp'),
      blue: require('@/assets/images/icons/minion/godfather__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Gudiao,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/gudiao.webp'),
      blue: require('@/assets/images/icons/minion/gudiao__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Harpy,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/harpy.webp'),
      blue: require('@/assets/images/icons/minion/harpy__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Huapi,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/huapi.webp'),
      blue: require('@/assets/images/icons/minion/huapi__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Humeiniang,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/humeiniang.webp'),
      blue: require('@/assets/images/icons/minion/humeiniang__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Jinweijun,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/jinweijun.webp'),
      blue: require('@/assets/images/icons/minion/jinweijun__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Jinweijun2,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/jinweijun2.webp'),
      blue: require('@/assets/images/icons/minion/jinweijun2__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Marionette,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/marionette.webp'),
      blue: require('@/assets/images/icons/minion/marionette__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Mastermind,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/mastermind.webp'),
      blue: require('@/assets/images/icons/minion/mastermind__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Mengpo,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/mengpo.webp'),
      blue: require('@/assets/images/icons/minion/mengpo__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Mephit,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/mephit.webp'),
      blue: require('@/assets/images/icons/minion/mephit__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Mezepheles,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/mezepheles.webp'),
      blue: require('@/assets/images/icons/minion/mezepheles__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Niangjiushi,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/niangjiushi.webp'),
      blue: require('@/assets/images/icons/minion/niangjiushi__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Organgrinder,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/organgrinder.webp'),
      blue: require('@/assets/images/icons/minion/organgrinder__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Panguan,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/panguan.webp'),
      blue: require('@/assets/images/icons/minion/panguan__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Pithag,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/pithag.webp'),
      blue: require('@/assets/images/icons/minion/pithag__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Poisoner,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/poisoner.webp'),
      blue: require('@/assets/images/icons/minion/poisoner__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Psychopath,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/psychopath.webp'),
      blue: require('@/assets/images/icons/minion/psychopath__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Scarletwoman,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/scarletwoman.webp'),
      blue: require('@/assets/images/icons/minion/scarletwoman__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Spy,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/spy.webp'),
      blue: require('@/assets/images/icons/minion/spy__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Summoner,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/summoner.webp'),
      blue: require('@/assets/images/icons/minion/summoner__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Vizier,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/vizier.webp'),
      blue: require('@/assets/images/icons/minion/vizier__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Widow,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/widow.webp'),
      blue: require('@/assets/images/icons/minion/widow__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Witch,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/witch.webp'),
      blue: require('@/assets/images/icons/minion/witch__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Yangguren,
    type: CharacterType.Minion,
    icon: {
      default: require('@/assets/images/icons/minion/yangguren.webp'),
      blue: require('@/assets/images/icons/minion/yangguren__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Barber,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/barber.webp'),
      red: require('@/assets/images/icons/outsider/barber__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Butler,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/butler.webp'),
      red: require('@/assets/images/icons/outsider/butler__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Damsel,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/damsel.webp'),
      red: require('@/assets/images/icons/outsider/damsel__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Drunk,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/drunk.webp'),
      red: require('@/assets/images/icons/outsider/drunk__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Golem,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/golem.webp'),
      red: require('@/assets/images/icons/outsider/golem__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Goon,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/goon.webp'),
      red: require('@/assets/images/icons/outsider/goon__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Hatter,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/hatter.webp'),
      red: require('@/assets/images/icons/outsider/hatter__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Heretic,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/heretic.webp'),
      red: require('@/assets/images/icons/outsider/heretic__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Jiubao,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/jiubao.webp'),
      red: require('@/assets/images/icons/outsider/jiubao__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Klutz,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/klutz.webp'),
      red: require('@/assets/images/icons/outsider/klutz__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Lunatic,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/lunatic.webp'),
      red: require('@/assets/images/icons/outsider/lunatic__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Moonchild,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/moonchild.webp'),
      red: require('@/assets/images/icons/outsider/moonchild__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Mutant,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/mutant.webp'),
      red: require('@/assets/images/icons/outsider/mutant__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Nichen,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/nichen.webp'),
      red: require('@/assets/images/icons/outsider/nichen__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Ogre,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/ogre.webp'),
      red: require('@/assets/images/icons/outsider/ogre__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Plaguedoctor,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/plaguedoctor.webp'),
      red: require('@/assets/images/icons/outsider/plaguedoctor__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Politician,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/politician.webp'),
      red: require('@/assets/images/icons/outsider/politician__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Puzzlemaster,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/puzzlemaster.webp'),
      red: require('@/assets/images/icons/outsider/puzzlemaster__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Recluse,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/recluse.webp'),
      red: require('@/assets/images/icons/outsider/recluse__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Rulianshi,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/rulianshi.webp'),
      red: require('@/assets/images/icons/outsider/rulianshi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Saint,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/saint.webp'),
      red: require('@/assets/images/icons/outsider/saint__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Shaxing,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/shaxing.webp'),
      red: require('@/assets/images/icons/outsider/shaxing__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Shijie,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/shijie.webp'),
      red: require('@/assets/images/icons/outsider/shijie__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Shusheng,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/shusheng.webp'),
      red: require('@/assets/images/icons/outsider/shusheng__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Shutong,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/shutong.webp'),
      red: require('@/assets/images/icons/outsider/shutong__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Snitch,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/snitch.webp'),
      red: require('@/assets/images/icons/outsider/snitch__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Sweetheart,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/sweetheart.webp'),
      red: require('@/assets/images/icons/outsider/sweetheart__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Tinker,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/tinker.webp'),
      red: require('@/assets/images/icons/outsider/tinker__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Zealot,
    type: CharacterType.Outsider,
    icon: {
      default: require('@/assets/images/icons/outsider/zealot.webp'),
      red: require('@/assets/images/icons/outsider/zealot__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Acrobat,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/acrobat.webp'),
      red: require('@/assets/images/icons/townsfolk/acrobat__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Alchemist,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/alchemist.webp'),
      red: require('@/assets/images/icons/townsfolk/alchemist__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Alsaahir,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/alsaahir.webp'),
      red: require('@/assets/images/icons/townsfolk/alsaahir__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Amnesiac,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/amnesiac.webp'),
      red: require('@/assets/images/icons/townsfolk/amnesiac__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Artist,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/artist.webp'),
      red: require('@/assets/images/icons/townsfolk/artist__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Atheist,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/atheist.webp'),
      red: require('@/assets/images/icons/townsfolk/atheist__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Balloonist,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/balloonist.webp'),
      red: require('@/assets/images/icons/townsfolk/balloonist__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Banshee,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/banshee.webp'),
      red: require('@/assets/images/icons/townsfolk/banshee__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Banxian,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/banxian.webp'),
      red: require('@/assets/images/icons/townsfolk/banxian__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Bianlianshi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/bianlianshi.webp'),
      red: require('@/assets/images/icons/townsfolk/bianlianshi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Bingbi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/bingbi.webp'),
      red: require('@/assets/images/icons/townsfolk/bingbi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Bountyhunter,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/bountyhunter.webp'),
      red: require('@/assets/images/icons/townsfolk/bountyhunter__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Cannibal,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/cannibal.webp'),
      red: require('@/assets/images/icons/townsfolk/cannibal__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Chambermaid,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/chambermaid.webp'),
      red: require('@/assets/images/icons/townsfolk/chambermaid__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Chef,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/chef.webp'),
      red: require('@/assets/images/icons/townsfolk/chef__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Choirboy,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/choirboy.webp'),
      red: require('@/assets/images/icons/townsfolk/choirboy__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Chongfei,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/chongfei.webp'),
      red: require('@/assets/images/icons/townsfolk/chongfei__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Clockmaker,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/clockmaker.webp'),
      red: require('@/assets/images/icons/townsfolk/clockmaker__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Courtier,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/courtier.webp'),
      red: require('@/assets/images/icons/townsfolk/courtier__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Cultleader,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/cultleader.webp'),
      red: require('@/assets/images/icons/townsfolk/cultleader__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Dagengren,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/dagengren.webp'),
      red: require('@/assets/images/icons/townsfolk/dagengren__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Daoke,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/daoke.webp'),
      red: require('@/assets/images/icons/townsfolk/daoke__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Daoshi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/daoshi.webp'),
      red: require('@/assets/images/icons/townsfolk/daoshi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Dianxiaoer,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/dianxiaoer.webp'),
      red: require('@/assets/images/icons/townsfolk/dianxiaoer__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Dreamer,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/dreamer.webp'),
      red: require('@/assets/images/icons/townsfolk/dreamer__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Empath,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/empath.webp'),
      red: require('@/assets/images/icons/townsfolk/empath__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Engineer,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/engineer.webp'),
      red: require('@/assets/images/icons/townsfolk/engineer__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Exorcist,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/exorcist.webp'),
      red: require('@/assets/images/icons/townsfolk/exorcist__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Fangshi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/fangshi.webp'),
      red: require('@/assets/images/icons/townsfolk/fangshi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Farmer,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/farmer.webp'),
      red: require('@/assets/images/icons/townsfolk/farmer__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Fengshuishi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/fengshuishi.webp'),
      red: require('@/assets/images/icons/townsfolk/fengshuishi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Fisherman,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/fisherman.webp'),
      red: require('@/assets/images/icons/townsfolk/fisherman__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Flowergirl,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/flowergirl.webp'),
      red: require('@/assets/images/icons/townsfolk/flowergirl__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Fool,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/fool.webp'),
      red: require('@/assets/images/icons/townsfolk/fool__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Fortuneteller,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/fortuneteller.webp'),
      red: require('@/assets/images/icons/townsfolk/fortuneteller__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Gambler,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/gambler.webp'),
      red: require('@/assets/images/icons/townsfolk/gambler__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Geling,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/geling.webp'),
      red: require('@/assets/images/icons/townsfolk/geling__variant_red.webp'),
    },
  },
  {
    id: CharacterId.General,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/general.webp'),
      red: require('@/assets/images/icons/townsfolk/general__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Gossip,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/gossip.webp'),
      red: require('@/assets/images/icons/townsfolk/gossip__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Grandmother,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/grandmother.webp'),
      red: require('@/assets/images/icons/townsfolk/grandmother__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Heshang,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/heshang.webp'),
      red: require('@/assets/images/icons/townsfolk/heshang__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Highpriestess,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/highpriestess.webp'),
      red: require('@/assets/images/icons/townsfolk/highpriestess__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Huntsman,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/huntsman.webp'),
      red: require('@/assets/images/icons/townsfolk/huntsman__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Innkeeper,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/innkeeper.webp'),
      red: require('@/assets/images/icons/townsfolk/innkeeper__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Investigator,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/investigator.webp'),
      red: require('@/assets/images/icons/townsfolk/investigator__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Jinyiwei,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/jinyiwei.webp'),
      red: require('@/assets/images/icons/townsfolk/jinyiwei__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Juggler,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/juggler.webp'),
      red: require('@/assets/images/icons/townsfolk/juggler__variant_red.webp'),
    },
  },
  {
    id: CharacterId.King,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/king.webp'),
      red: require('@/assets/images/icons/townsfolk/king__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Knight,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/knight.webp'),
      red: require('@/assets/images/icons/townsfolk/knight__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Langzhong,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/langzhong.webp'),
      red: require('@/assets/images/icons/townsfolk/langzhong__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Lankeren,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/lankeren.webp'),
      red: require('@/assets/images/icons/townsfolk/lankeren__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Librarian,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/librarian.webp'),
      red: require('@/assets/images/icons/townsfolk/librarian__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Limao,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/limao.webp'),
      red: require('@/assets/images/icons/townsfolk/limao__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Lycanthrope,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/lycanthrope.webp'),
      red: require('@/assets/images/icons/townsfolk/lycanthrope__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Magician,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/magician.webp'),
      red: require('@/assets/images/icons/townsfolk/magician__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Mathematician,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/mathematician.webp'),
      red: require('@/assets/images/icons/townsfolk/mathematician__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Mayor,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/mayor.webp'),
      red: require('@/assets/images/icons/townsfolk/mayor__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Minstrel,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/minstrel.webp'),
      red: require('@/assets/images/icons/townsfolk/minstrel__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Monk,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/monk.webp'),
      red: require('@/assets/images/icons/townsfolk/monk__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Nightwatchman,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/nightwatchman.webp'),
      red: require('@/assets/images/icons/townsfolk/nightwatchman__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Noble,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/noble.webp'),
      red: require('@/assets/images/icons/townsfolk/noble__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Oracle,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/oracle.webp'),
      red: require('@/assets/images/icons/townsfolk/oracle__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Pacifist,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/pacifist.webp'),
      red: require('@/assets/images/icons/townsfolk/pacifist__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Philosopher,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/philosopher.webp'),
      red: require('@/assets/images/icons/townsfolk/philosopher__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Pixie,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/pixie.webp'),
      red: require('@/assets/images/icons/townsfolk/pixie__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Poppygrower,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/poppygrower.webp'),
      red: require('@/assets/images/icons/townsfolk/poppygrower__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Preacher,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/preacher.webp'),
      red: require('@/assets/images/icons/townsfolk/preacher__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Professor,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/professor.webp'),
      red: require('@/assets/images/icons/townsfolk/professor__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Qianke,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/qianke.webp'),
      red: require('@/assets/images/icons/townsfolk/qianke__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Qintianjian,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/qintianjian.webp'),
      red: require('@/assets/images/icons/townsfolk/qintianjian__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Ranfangfangzhu,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/ranfangfangzhu.webp'),
      red: require('@/assets/images/icons/townsfolk/ranfangfangzhu__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Ravenkeeper,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/ravenkeeper.webp'),
      red: require('@/assets/images/icons/townsfolk/ravenkeeper__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Sage,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/sage.webp'),
      red: require('@/assets/images/icons/townsfolk/sage__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Sailor,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/sailor.webp'),
      red: require('@/assets/images/icons/townsfolk/sailor__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Savant,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/savant.webp'),
      red: require('@/assets/images/icons/townsfolk/savant__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Seamstress,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/seamstress.webp'),
      red: require('@/assets/images/icons/townsfolk/seamstress__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Shiguan,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/shiguan.webp'),
      red: require('@/assets/images/icons/townsfolk/shiguan__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Shugenja,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/shugenja.webp'),
      red: require('@/assets/images/icons/townsfolk/shugenja__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Slayer,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/slayer.webp'),
      red: require('@/assets/images/icons/townsfolk/slayer__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Snakecharmer,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/snakecharmer.webp'),
      red: require('@/assets/images/icons/townsfolk/snakecharmer__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Soldier,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/soldier.webp'),
      red: require('@/assets/images/icons/townsfolk/soldier__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Steward,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/steward.webp'),
      red: require('@/assets/images/icons/townsfolk/steward__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Tealady,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/tealady.webp'),
      red: require('@/assets/images/icons/townsfolk/tealady__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Tixingguan,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/tixingguan.webp'),
      red: require('@/assets/images/icons/townsfolk/tixingguan__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Towncrier,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/towncrier.webp'),
      red: require('@/assets/images/icons/townsfolk/towncrier__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Undertaker,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/undertaker.webp'),
      red: require('@/assets/images/icons/townsfolk/undertaker__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Villageidiot,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/villageidiot.webp'),
      red: require('@/assets/images/icons/townsfolk/villageidiot__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Virgin,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/virgin.webp'),
      red: require('@/assets/images/icons/townsfolk/virgin__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Washerwoman,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/washerwoman.webp'),
      red: require('@/assets/images/icons/townsfolk/washerwoman__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Wudaozhe,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/wudaozhe.webp'),
      red: require('@/assets/images/icons/townsfolk/wudaozhe__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Wushiren,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/wushiren.webp'),
      red: require('@/assets/images/icons/townsfolk/wushiren__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Xingjiaoshang,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/xingjiaoshang.webp'),
      red: require('@/assets/images/icons/townsfolk/xingjiaoshang__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Xionghaizi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/xionghaizi.webp'),
      red: require('@/assets/images/icons/townsfolk/xionghaizi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Xizi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/xizi.webp'),
      red: require('@/assets/images/icons/townsfolk/xizi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Xuncha,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/xuncha.webp'),
      red: require('@/assets/images/icons/townsfolk/xuncha__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Yanshi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/yanshi.webp'),
      red: require('@/assets/images/icons/townsfolk/yanshi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Yinluren,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/yinluren.webp'),
      red: require('@/assets/images/icons/townsfolk/yinluren__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Yinyangshi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/yinyangshi.webp'),
      red: require('@/assets/images/icons/townsfolk/yinyangshi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Yishi,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/yishi.webp'),
      red: require('@/assets/images/icons/townsfolk/yishi__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Yongjiang,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/yongjiang.webp'),
      red: require('@/assets/images/icons/townsfolk/yongjiang__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Zhen,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/zhen.webp'),
      red: require('@/assets/images/icons/townsfolk/zhen__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Zhifu,
    type: CharacterType.Townsfolk,
    icon: {
      default: require('@/assets/images/icons/townsfolk/zhifu.webp'),
      red: require('@/assets/images/icons/townsfolk/zhifu__variant_red.webp'),
    },
  },
  {
    id: CharacterId.Apprentice,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/apprentice.webp'),
      red: require('@/assets/images/icons/traveller/apprentice__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/apprentice__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Barista,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/barista.webp'),
      red: require('@/assets/images/icons/traveller/barista__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/barista__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Beggar,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/beggar.webp'),
      red: require('@/assets/images/icons/traveller/beggar__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/beggar__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Bishop,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/bishop.webp'),
      red: require('@/assets/images/icons/traveller/bishop__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/bishop__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Bonecollector,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/bonecollector.webp'),
      red: require('@/assets/images/icons/traveller/bonecollector__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/bonecollector__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Bureaucrat,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/bureaucrat.webp'),
      red: require('@/assets/images/icons/traveller/bureaucrat__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/bureaucrat__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Butcher,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/butcher.webp'),
      red: require('@/assets/images/icons/traveller/butcher__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/butcher__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Deviant,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/deviant.webp'),
      red: require('@/assets/images/icons/traveller/deviant__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/deviant__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Diaomin,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/diaomin.webp'),
      red: require('@/assets/images/icons/traveller/diaomin__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/diaomin__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Gangster,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/gangster.webp'),
      red: require('@/assets/images/icons/traveller/gangster__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/gangster__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Gunslinger,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/gunslinger.webp'),
      red: require('@/assets/images/icons/traveller/gunslinger__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/gunslinger__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Harlot,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/harlot.webp'),
      red: require('@/assets/images/icons/traveller/harlot__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/harlot__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Hebo,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/hebo.webp'),
      red: require('@/assets/images/icons/traveller/hebo__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/hebo__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Jiaohuazi,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/jiaohuazi.webp'),
      red: require('@/assets/images/icons/traveller/jiaohuazi__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/jiaohuazi__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Judge,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/judge.webp'),
      red: require('@/assets/images/icons/traveller/judge__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/judge__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Matron,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/matron.webp'),
      red: require('@/assets/images/icons/traveller/matron__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/matron__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Scapegoat,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/scapegoat.webp'),
      red: require('@/assets/images/icons/traveller/scapegoat__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/scapegoat__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Thief,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/thief.webp'),
      red: require('@/assets/images/icons/traveller/thief__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/thief__variant_blue.webp'),
    },
  },
  {
    id: CharacterId.Voudon,
    type: CharacterType.Traveller,
    icon: {
      default: require('@/assets/images/icons/traveller/voudon.webp'),
      red: require('@/assets/images/icons/traveller/voudon__variant_red.webp'),
      blue: require('@/assets/images/icons/traveller/voudon__variant_blue.webp'),
    },
  },
];

export const getCharacterById = (id: CharacterId) => {
  return CHARACTERS.find(character => character.id === id);
};
