let electionEndpoint = "https://rawbeefxd.duckdns.org/election/";

async function fetchResults() {
  try {
    const response = await fetch(electionEndpoint);
    const data = await response.json();

    const planetOwnerMap = await fetchPlanetStatus();

    renderResults(data, planetOwnerMap);
  } catch (error) {
    console.error("Failed to fetch election data:", error);
    alert("Failed to load election data.");
  }
}

async function fetchPlanetStatus() {
  try {
    const response = await fetch("https://api.live.prod.thehelldiversgame.com/api/warseason/801/status");
    const data = await response.json();

    const planetOwnerMap = data.planetStatus.reduce((map, planet) => {
      map[planet.index] = planet.owner;
      return map;
    }, {});

    return planetOwnerMap;
  } catch (error) {
    console.error("Failed to fetch planet status:", error);
    return {};
  }
}

function renderResults(data, planetOwnerMap) {
  const resultsContainer = document.getElementById("results");
  const totalVotesDiv = document.getElementById("total-votes");

  resultsContainer.innerHTML = "";

  data.Options.forEach(option => {
    const item = document.createElement("div");
    item.className = "result-item";

    const planetName = option.Name;
    const planetIndex = planetIndexMap[planetName] !== undefined ? planetIndexMap[planetName] : -1;

    const owner = planetIndex !== -1 ? planetOwnerMap[planetIndex] : null;

    const ownerAttribute = owner !== null ? owner.toString() : "1";

    let metaContent = `<span>${option.Percentage}%</span>`; 
    if (option.Votes !== undefined) {
      metaContent = `<span>${option.Votes} votes</span> <span>${option.Percentage}%</span>`;
    }

    item.innerHTML = `
      <div class="option-name">${option.Name}</div>
      <div class="bar-container">
        <div class="bar" data-owner="${ownerAttribute}" style="width: ${option.Percentage}%"></div>
      </div>
      <div class="meta">
        ${metaContent}
      </div>
    `;

    resultsContainer.appendChild(item);
  });

  if (data["Total Votes"] !== undefined) {
    totalVotesDiv.textContent = `Total Votes: ${data["Total Votes"].toLocaleString()}`;
  } else {
    totalVotesDiv.textContent = "";
  }
}

// ==== WAR STATUS & TIME CONVERSION ====

const planetNames = {
  0: "SUPER EARTH",
  1: "KLEN DAHTH II",
  2: "PATHFINDER V",
  3: "WIDOW'S HARBOR",
  4: "NEW HAVEN",
  5: "PILEN V",
  6: "HYDROFALL PRIME",
  7: "ZEA RUGOSIA",
  8: "DARROWSPORT",
  9: "FORNSKOGUR II",
  10: "MIDASBURG",
  11: "CERBERUS IIIc",
  12: "PROSPERITY FALLS",
  13: "OKUL VI",
  14: "MARTYR'S BAY",
  15: "FREEDOM PEAK",
  16: "FORT UNION",
  17: "KELVINOR",
  18: "WRAITH",
  19: "IGLA",
  20: "NEW KIRUNA",
  21: "FORT JUSTICE",
  22: "ZEGEMA PARADISE",
  23: "PROVIDENCE",
  24: "PRIMORDIA",
  25: "SULFURA",
  26: "NUBLARIA I",
  27: "KRAKATWO",
  28: "VOLTERRA",
  29: "CRUCIBLE",
  30: "VEIL",
  31: "MARRE IV",
  32: "FORT SANCTUARY",
  33: "SEYSHEL BEACH",
  34: "HELLMIRE",
  35: "EFFLUVIA",
  36: "SOLGHAST",
  37: "DILUVIA",
  38: "VIRIDIA PRIME",
  39: "OBARI",
  40: "MYRADESH",
  41: "ATRAMA",
  42: "EMERIA",
  43: "BARABOS",
  44: "FENMIRE",
  45: "MASTIA",
  46: "SHALLUS",
  47: "KRAKABOS",
  48: "IRIDICA",
  49: "AZTERRA",
  50: "AZUR SECUNDUS",
  51: "IVIS",
  52: "SLIF",
  53: "CARAMOOR",
  54: "KHARST",
  55: "EUKORIA",
  56: "MYRIUM",
  57: "KERTH SECUNDUS",
  58: "PARSH",
  59: "REAF",
  60: "IRULTA",
  61: "EMORATH",
  62: "ILDUNA PRIME",
  63: "MAW",
  64: "MERIDIA",
  65: "BOREA",
  66: "CURIA",
  67: "TARSH",
  68: "SHELT",
  69: "IMBER",
  70: "BLISTICA",
  71: "RATCH",
  72: "JULHEIM",
  73: "VALGAARD",
  74: "ARKTURUS",
  75: "ESKER",
  76: "TERREK",
  77: "CIRRUS",
  78: "CRIMSICA",
  79: "HEETH",
  80: "VELD",
  81: "ALTA V",
  82: "URSICA XI",
  83: "INARI",
  84: "SKAASH",
  85: "MORADESH",
  86: "RASP",
  87: "BASHYR",
  88: "REGNUS",
  89: "MOG",
  90: "VALMOX",
  91: "IRO",
  92: "GRAFMERE",
  93: "NEW STOCKHOLM",
  94: "OASIS",
  95: "GENESIS PRIME",
  96: "OUTPOST 32",
  97: "CALYPSO",
  98: "ELYSIAN MEADOWS",
  99: "ALDERIDGE COVE",
  100: "TRANDOR",
  101: "EAST IRIDIUM TRADING BAY",
  102: "LIBERTY RIDGE",
  103: "BALDRICK PRIME",
  104: "THE WEIR",
  105: "KUPER",
  106: "OSLO STATION",
  107: "PÖPLI IX",
  108: "GUNVALD",
  109: "DOLPH",
  110: "BEKVAM III",
  111: "DUMA TYR",
  112: "VERNEN WELLS",
  113: "AESIR PASS",
  114: "AURORA BAY",
  115: "PENTA",
  116: "GAELLIVARE",
  117: "VOG-SOJOTH",
  118: "KIRRIK",
  119: "MORTAX PRIME",
  120: "WILFORD STATION",
  121: "PIONEER II",
  122: "ERSON SANDS",
  123: "SOCORRO III",
  124: "BORE ROCK",
  125: "FENRIR III",
  126: "TURING",
  127: "ANGEL'S VENTURE",
  128: "DARIUS II",
  129: "ACAMAR IV",
  130: "ACHERNAR SECUNDUS",
  131: "ACHIRD III",
  132: "ACRAB XI",
  133: "ACRUX IX",
  134: "ACUBENS PRIME",
  135: "ADHARA",
  136: "AFOYAY BAY",
  137: "AIN-5",
  138: "ALAIRT III",
  139: "ALAMAK VII",
  140: "ALARAPH",
  141: "ALATHFAR XI",
  142: "ANDAR",
  143: "ASPEROTH PRIME",
  144: "BELLATRIX",
  145: "BOTEIN",
  146: "OSUPSAM",
  147: "BRINK-2",
  148: "BUNDA SECUNDUS",
  149: "CANOPUS",
  150: "CAPH",
  151: "CASTOR",
  152: "DURGEN",
  153: "DRAUPNIR",
  154: "MORT",
  155: "INGMAR",
  156: "CHARBAL-VII",
  157: "CHARON PRIME",
  158: "CHOEPESSA IV",
  159: "CHOOHE",
  160: "CHORT BAY",
  161: "CLAORELL",
  162: "CLASA",
  163: "DEMIURG",
  164: "DENEB SECUNDUS",
  165: "ELECTRA BAY",
  166: "ENULIALE",
  167: "EPSILON PHOENCIS VI",
  168: "ERATA PRIME",
  169: "ESTANU",
  170: "FORI PRIME",
  171: "GACRUX",
  172: "GAR HAREN",
  173: "GATRIA",
  174: "GEMMA",
  175: "GRAND ERRANT",
  176: "HADAR",
  177: "HAKA",
  178: "HALDUS",
  179: "HALIES PORT",
  180: "HERTHON SECUNDUS",
  181: "HESOE PRIME",
  182: "HEZE BAY",
  183: "HORT",
  184: "HYDROBIUS",
  185: "KARLIA",
  186: "KEID",
  187: "KHANDARK",
  188: "KLAKA 5",
  189: "KNETH PORT",
  190: "KRAZ",
  191: "KUMA",
  192: "LASTOFE",
  193: "LENG SECUNDUS",
  194: "LESATH",
  195: "MAIA",
  196: "MALEVELON CREEK",
  197: "MANTES",
  198: "MARFARK",
  199: "MARTALE",
  200: "MATAR BAY",
  201: "MEISSA",
  202: "MEKBUDA",
  203: "MENKENT",
  204: "MERAK",
  205: "MERGA IV",
  206: "MINCHIR",
  207: "MINTORIA",
  208: "MORDIA 9",
  209: "NABATEA SECUNDUS",
  210: "NAVI VII",
  211: "NIVEL 43",
  212: "OSHAUNE",
  213: "OVERGOE PRIME",
  214: "PANDION-XXIV",
  215: "PARTION",
  216: "PEACOCK",
  217: "PHACT BAY",
  218: "PHERKAD SECUNDUS",
  219: "POLARIS PRIME",
  220: "POLLUX 31",
  221: "PRASA",
  222: "PROPUS",
  223: "RAS ALGETHI",
  224: "RD-4",
  225: "ROGUE 5",
  226: "RIRGA BAY",
  227: "SEASSE",
  228: "SENGE 23",
  229: "SETIA",
  230: "SHETE",
  231: "SIEMNOT",
  232: "SIRIUS",
  233: "SKAT BAY",
  234: "SPHERION",
  235: "STOR THA PRIME",
  236: "STOUT",
  237: "TERMADON",
  238: "TIBIT",
  239: "TIEN KWAN",
  240: "TROOST",
  241: "UBANEA",
  242: "USTOTU",
  243: "VANDALON IV",
  244: "VARYLIA 5",
  245: "WASAT",
  246: "VEGA BAY",
  247: "WEZEN",
  248: "VINDEMITARIX PRIME",
  249: "X-45",
  250: "YED PRIOR",
  251: "ZEFIA",
  252: "ZOSMA",
  253: "ZZANIAH PRIME",
  254: "SKITTER",
  255: "EUPHORIA III",
  256: "DIASPORA X",
  257: "GEMSTONE BLUFFS",
  258: "ZAGON PRIME",
  259: "OMICRON",
  260: "CYBERSTAN"
};

const planetIndexMap = Object.keys(planetNames).reduce((map, key) => {
  map[planetNames[key]] = parseInt(key);
  return map;
}, {});

const START_TIME = 1706040313;

function getUnixEpochTimestamp() {
  return Math.floor(Date.now() / 1000);
}

async function fetchMetaInfo() {
  try {
    const res = await fetch("https://helldiverstrainingmanual.com/api/v1/war/status");
    const data = await res.json();

    const currentWarTime = data.time;
    const currentUnix = getUnixEpochTimestamp();

    const serverTime = START_TIME + currentWarTime;
    const deviation = currentUnix - serverTime;

    const station = data.spaceStations[0];
    const planetIndex = station.planetIndex;
    const planetName = planetNames[planetIndex] || `Planet Index ${planetIndex}`;

    const endWarTime = station.currentElectionEndWarTime;
    const endUnixTime = endWarTime + deviation + START_TIME;
    const secondsLeft = endUnixTime - currentUnix;

    document.getElementById("current-location").textContent = `Current location: ${planetName}`;

    if (secondsLeft <= 0) {
      document.getElementById("voting-end").textContent = "Voting has ended.";
    } else {
      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      document.getElementById("voting-end").textContent = `Voting ends in: ${hours}h ${minutes}m`;
    }

  } catch (error) {
    console.error("Failed to fetch war meta info:", error);
    document.getElementById("current-location").textContent = "Current location: Unknown";
    document.getElementById("voting-end").textContent = "Voting ends in: N/A";
  }
}

// ==== INIT ====

fetchResults();
fetchMetaInfo();

//<ID_rR!+x$DQBR&@;]^p+WC:.+E#A#@uxN'HCNS.M8pI$SYT"LX(vO)+EY:.+Fn>-J)Ql+/j_cwCw7*iMt@dEEIg^)Et8#84Alq^LQHJR3\B.(LBiY%CeHq6L(jJ:AXrkrSt-l\$4:JNMDSx^DBR!1GE8oL4!610+@]ta@fNfzUo7*vBo@o3Mf0<7Dip_@Ms_g,+TJ:.+Obt7+K#H$E,WK.N8