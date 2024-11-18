const { compare } = require('odiff-bin/odiff.js');

const core = require('./migration-tests.json');

const projectNames = [
  'chromium',
  'Mobile Chrome',
];

compare();

core.forEach((comparison) => {
  projectNames.forEach(async (projectname) => {
    const fromScreenshotPath = `./tests/migration/migration-screenshots/${urlToFilename(comparison.from)}--FROM--${urlToFilename(projectname)}.png`;
    const toScreenshotPath = `./tests/migration/migration-screenshots/${urlToFilename(comparison.to)}--TO--${urlToFilename(projectname)}.png`;
    const diffScreenshotPath = `./tests/migration/migration-screenshots/${urlToFilename(comparison.from)}--DIFF--${urlToFilename(projectname)}.png`;
    console.log({fromScreenshotPath, toScreenshotPath, diffScreenshotPath});

    try {
      const { match, reason } = await compare(
        fromScreenshotPath,
        toScreenshotPath,
        diffScreenshotPath,
        // {
        //   threshold: 0.1,
        // }
      );  
    } catch (error) {
      console.log(error);
    }
  })
});

function urlToFilename(url) {
  return url
    .replace('https://', '')
    .replace(/\//, '')
    .replaceAll('.', '-')
    .replaceAll('&', '-')
    .replaceAll(' ', '-')
    .replaceAll('?', '--');
}
