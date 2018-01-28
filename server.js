const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(process.cwd(),'dist');
console.log(DIST_FOLDER);
app.use(express.static(DIST_FOLDER))

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
