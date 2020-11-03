const puppeteer = require('puppeteer');
const Sheet = require('./sheet');

require('dotenv').config();

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
    currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

(async () => {

  const sheet = new Sheet();
  await sheet.load();
  const USERNAMES = (await sheet.getRows(0)).map(e => e.username);
  let oldData = await sheet.getRows(1);

  if (oldData.length) {
    let i = 0;
      while( i < oldData.length) {

        console.log(oldData.length);
        if (oldData.length == 0) break;
        console.log(oldData[i], i);
        if (USERNAMES.includes(oldData[i].username)) {
            await oldData[i].delete();
            oldData = await sheet.getRows(1);
            console.log('available!', {i});
            i = 0;
            sleep(1000);
        }else{
            i++;
        }
             
      }
  }

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle0' });

  const inputs = await page.$$('input');
  await inputs[0].type(process.env.USERNAME);
  await inputs[1].type(process.env.PASSWORD);

  // TODO: Logging in
  (await page.$$('button'))[1].click();
  await page.waitForNavigation();

//   let USERNAMES = [];

  const profiles = [];
  for (let USERNAME of USERNAMES) {
    await page.goto(`https://www.instagram.com/${USERNAME}`);
    await page.waitForSelector('img').catch(e => true);
    const imgSrc = await page.$eval('img', el => el.getAttribute('src')).catch(e => true);
    const name = await page.$eval('header h1', el => el.textContent).catch(e => true);
    const headerData = await page.$$eval('header li', els => els.map(el => el.textContent)).catch(e => true);
    const desc = await page.$eval('.-vDIg span', el => el.textContent).catch(e => true);
    const link = await page.$eval('.-vDIg span+a', el => el.textContent).catch(e => true);
    const profile = { username: USERNAME, name, imgSrc, headerData, desc, link};
    for (let header of headerData) {
        // * Seperating posts followers and following
        const [count, name] = header.split(' ');;
        profile[name] = count;
    }
    // * Updating profiles
    profiles.push(profile);
    
  }

  console.log({profiles});

  await sheet.addRows(profiles,true, 1);
  


  

  /*
  // TODO: Selecting post
  (await page.$('article a')).click();
  await page.waitFor(2000);

  // TODO: Liking post
  (await page.$('article.M9sTE section button')).click();
  await page.waitFor(2000);

  // TODO: Next post
  (await page.$$('div.DdSX2 a'))[0].click();
  await page.waitFor(2000);
  let i = 0;

  while (true) {
    if ((await page.$$('div.DdSX2 a'))[1]) {
      i++;
      // TODO: Liking post
      (await page.$('article.M9sTE section button')).click();
      await page.waitFor(2000);

      // TODO: Next post
      (await page.$$('div.DdSX2 a'))[1].click();
      await page.waitFor(2000);

    } else {
      break;
    }
  }
  console.log(i);
  */
  await browser.close();
})();
