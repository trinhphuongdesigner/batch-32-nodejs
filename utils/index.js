const fs = require('fs');

module.exports = {
  writeFileSync: (path, data) => {
    fs.writeFileSync(path, JSON.stringify(data), function (err) {
      if (err) {
        console.log('««««« err »»»»»', err);
        throw err
      };
      console.log('Saved!');
    });
  },
  
  generationID: () => Math.floor(Date.now()),
}