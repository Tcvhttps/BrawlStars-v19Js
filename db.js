const fs = require('fs');
const { generateRandomString } = require('../Utils/Helper');
const Cards = require('../CSVParser/Cards'); // Import the Cards class from cards.js
const UnlockCards = Cards.getBrawlersUnlocks();

const DB_FILE = './database/accounts.json';


function getBrawlerArray(){
  const unlockCardsArray = Object.values(UnlockCards);
  const arrays = []
  for (let i = 0; i < 27; i++) {
      let unlock = i === 0 ? true : false; 
      arrays.push({
          id: i,
          cardID: unlockCardsArray[i],
          skill: 0,
          unlocked: unlock,
          level: 0,
          points: 0,
          trophies: 0
      });
  }
  return arrays;
}
function createAccount(data) {
  try {
    const rawData = fs.readFileSync(DB_FILE);
    const accounts = JSON.parse(rawData);

    //Get account new accountID
    const accountId = (accounts.length + 1);

    // Create new Account
    const account = {
        lowID: accountId,
        token: generateRandomString(40),
        Trophies: 0,
        TrophyRoadTier: 1,
        Experience: 512,
        Thumbnail: 0,
        Namecolor: 0,
        TokensDoubler: 500,
        BattleTokens: 200,
        Tickets: 0,
        Starpoints: 0,
        BigBox: 0,
        Gold: 1000,
        Box: 0,
        Gems: 100,
        BrawlerID: 0,
        SkinID: 0,
        AuthorCode: "",
        Name: "JSV19",
        ClubID: 0,
        ClubRole: 1,
        TrioWINS: 0,
        SoloWINS: 0,
        Status: 0,
        Shop: [],
        Skins: [],
        Brawlers: getBrawlerArray(),

      ...data
    };
    // add new record in massive
    accounts.push(account);

    fs.writeFileSync(DB_FILE, JSON.stringify(accounts, null, 2));

    return account
  } catch (error) {
    console.error('Ошибка при создании аккаунта:', error.message);
  }
}

  function getAccount(token) {
    try {
      const rawData = fs.readFileSync(DB_FILE);
      const accounts = JSON.parse(rawData);

      // Find the first account with the given token
      const account = accounts.find((acc) => acc.token === token);
      let newtrophies = 0;
      for (const brawler of account.Brawlers) {
        newtrophies += parseInt(brawler.trophies);
      }
      account.Trophies = newtrophies;
      this.replaceValue(account.lowID, 'Trophies', account.Trophies)
      return account || null;
    } catch (error) {
      return null;
    }
  }

  function getIDAccount(lowID) {
    try {
      const rawData = fs.readFileSync(DB_FILE);
      const accounts = JSON.parse(rawData);

      // Find the first account with the given lowID
      const account = accounts.find((acc) => acc.lowID === lowID);
      return account || null;
    } catch (error) {
      return null;
    }
  }
  function replaceValue(lowID, valueName, newValue) {
    try {
      const rawData = fs.readFileSync(DB_FILE);
      const accounts = JSON.parse(rawData);
  
      // Find the account with the given lowID
      const account = accounts.find((acc) => acc.lowID === lowID);
  
      if (account) {
        // Replace the value
        account[valueName] = newValue;
  
        // Update the file
        fs.writeFileSync(DB_FILE, JSON.stringify(accounts, null, 2));
      } else {
        console.error('Account not found with the provided lowID');
      }
    } catch (error) {
      console.error('Error replacing value:', error.message);
    }
  }
  function getAllPlayers() {
    try {
        const data = fs.readFileSync(DB_FILE);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading account.json:', error.message);
        return [];
    }
}
  // Export functions
  module.exports = {
    createAccount,
    getAccount,
    getIDAccount,
    replaceValue,
    getAllPlayers
  };