import { run as phantomjs } from 'phantomjs-prebuilt';
import { remote } from 'webdriverio';
import fs from 'fs';
import path from 'path';
import { promisify } from 'bluebird';

const writeFile = promisify(fs.writeFile);

const username = process.env.IWP_USERNAME;
const password = process.env.IWP_PASSWORD;

const extractJSONString = (sourceLines, variableName, fileName) => {
  const regexp = new RegExp(`^var ${variableName} = extractJSON\\('`);
  const listingLine = sourceLines.filter(line => line.search(regexp) !== -1)[0];
  if (listingLine === undefined || listingLine.length === 0) {
    console.error(`${variableName} could not be found`);
    process.exit(1);
  }
  const listingJson = listingLine
    .replace(regexp, '')
    .replace(/'\);$/, '');

  const listing = JSON.parse(listingJson);
  writeFile(path.join(__dirname, fileName), JSON.stringify(listing, null, 2));
};

phantomjs('--webdriver=4444').then(program => {
  const client = remote({
    logLevel: 'command',
    desiredCapabilities: { browserName: 'phantomjs' }
  }).init();

  client
    .url('https://members.iracing.com/membersite/login.jsp')
    .addValue('[name="username"]', username)
    .addValue('[name="password"]', password)
    .click('input.log-in')
    .url('http://members.iracing.com/membersite/member/Series.do')
    .source()
    .then(source => {
      const sourceLines = source.value.split('\n');
      extractJSONString(sourceLines, 'TrackListing', 'src/data/tracks.json');
      extractJSONString(sourceLines, 'CarClassListing', 'src/data/car-class.json');
      extractJSONString(sourceLines, 'CarListing', 'src/data/cars.json');
      extractJSONString(sourceLines, 'SeasonListing', 'src/data/season.json');
      program.kill();
    })
    .end();
})