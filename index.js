const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://stardewvalleywiki.com";

const runSafe = async (fn) => {
  try {
    await fn();
  } catch (error) {
    console.log({ error });
  }
};

const path = (elem) => (path) => $(elem).find(path);

const main = async () => {
  const { data } = await axios.get(`${BASE_URL}/Villagers`);

  const $ = cheerio.load(data);

  const villagers = [];

  $("li.gallerybox").each((_, elem) => {
    const pathTo = path(elem);

    const title = pathTo(".gallerytext > p > a").text();
    const avatar = `${BASE_URL}${pathTo(".thumb > div > a > img").attr("src")}`;
    const link = `${BASE_URL}${pathTo(".gallerytext > p > a").attr("href")}`;

    villagers.push({ title, avatar, link });
  });

  console.log({ villagers });
};

runSafe(main);
