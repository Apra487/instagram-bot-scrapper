# instagram-bot(scrapper)

This is a instagram bot/scrapper that scrapes any user's pofile data.

Written in JavaScript using puppeteer.

_**I wrote this script STRICTLY for EDUCATIONAL PURPOSES and I am NOT RESPONSIBLE for any **non-disciplinary** action commited by its users.**_

## Installation 🚀

To use this program, we need to perform this installatiion process once

-   Clone or download this repo.

```bash
git clone https://github.com/Apra487/instagram-bot-scrapper.git
cd instagram-bot-scrapper
```

-   Download and install [Node.js](https://nodejs.org/en/)
-   Create a service account on [Google Cloud Platform](https://cloud.google.com/gcp/). Don't worry it's free!
-   Generate credentials for your newly created service account.You should get a json file containing all the private credentials.
-   Rename the json file to `credentials.json`
-   Move `credentials.json` to the root of the project folder.
-   Create an empty `Google Sheet`.
-   Create a new sheet inside the sheet named ```meta```
-   Create a header row named ```username```
-   Add all insta usernames you want to scrape data under the ```username``` headeer row.
-   Create a new sheet and add ```username```, ```name```, ```imgSrc```, ```posts```, ```followers```, ```following``` , ```desc```, and ```link``` as header row
-   Share the newly created Google Sheet with newly created service account and give write acess.
-   Copy the sheet id from the url.

```bash
https://docs.google.com/spreadsheets/d/<YOUR SHEET ID>/edit#gid=0
```

-   Paste the copied sheet id inplace of `<Goggle sheet ID>` on sheet.js

```bash
this.doc = new GoogleSpreadsheet('<Goggle sheet ID>');
```

-   Create a `.env` file in the root of your project and insert your credentials as key/value pairs in the following format of `KEY=VALUE`:

```sh
USERNAME=qbcd
PASSWORD=123445
```

-   Install all the dependencies.

```bash
npm install
```

## Usage

So you're done with the installation. But, how do you use it?

It's really simple.

-   Execute `index.js` by using the following command

```bash
node index.js https://www.old.reddit.com/r/nextfuckinglevel/comments/j90u9d/this_happened_today_in_new_zealand_no_social/
```

<br>
NOTE :: I made this project oly for educational purposes and for my personal usage and NOT for any buisness or any kind of monetary thing.




