import { AsyncStorage } from "react-native"
const smallImagePath = 'http://aembertree.com/cards-small/'
const largeImagePath = 'http://aembertree.com/cards/'
const cardCacheKey = "_CARDS_CACHE_20";

function attr(data, str) {
  return data[str]['$t'];
}

function rarity(raw) {
  switch (raw) {
    case "Common":
      return "•"
    case "Uncommon":
      return "◆"
    case "Rare":
      return "★"
    case "Special":
      return "✧"
    default:
      return '';
  }
}

async function fetchAndParseData() {
  const spreadsheetCall = await fetch('https://spreadsheets.google.com/feeds/list/14NiLskeuSvkCM9TTo_9G0FXItyEYbnb_mb9NkShosTI/1/public/values?alt=json');
  
  const data = await spreadsheetCall.json();

  const rawCards = data.feed.entry;
  const cards = rawCards.map((raw) => {
    return {
      id: attr(raw, "gsx$number"),
      name: attr(raw, "gsx$name"),
      house: attr(raw, 'gsx$house'),
      type: attr(raw, 'gsx$type'),
      rarity: attr(raw, 'gsx$rarity'),
      aember: attr(raw, 'gsx$aember'),
      text: attr(raw, 'gsx$text'),
      power: attr(raw, 'gsx$power'),
      armor: attr(raw, 'gsx$armor'),
      keywords: attr(raw, 'gsx$keywords'),
      traits: attr(raw, 'gsx$traits'),
      imageurl: attr(raw, 'gsx$imageurl'),
    }
  })

  return cards;
}

function enrichData(data) {
  return data.map((i) => {
    var a = {
      ...i,
      simpleSearch: i.name.toLowerCase(),
      complexSearch: i.name.toLowerCase() + " " + i.traits.toLowerCase() + " " + i.keywords.toLowerCase() + i.text.toLowerCase(),
      smallImage: smallImagePath + i.imageurl,
      largeImage: largeImagePath + i.imageurl,
      subtitle: rarity(i.rarity) + " " + i.type
    }
    return a
  })
}

async function storeData(data) {
  console.log("STORE DATA")
  try {
    await AsyncStorage.setItem(cardCacheKey, JSON.stringify(data));
  } catch (error) {
    // Error saving data
  }
}

async function retreiveData() {
  console.log("retreive Data");
  try {
    var value = await AsyncStorage.getItem(cardCacheKey);
    if (value !== null) {
      console.log("HIT CACHE");
      value = JSON.parse(value)
    } else {
      console.log("MISS CACHE");
      value = await fetchAndParseData()
      storeData(value)
    }
    return enrichData(value)
   } catch (error) {
     // Error retrieving data
   }

}

export async function loadData() {
  return retreiveData()
}
