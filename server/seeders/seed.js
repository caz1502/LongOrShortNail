const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');
// const luxuryRelaxationSeeds = require("./seedLuxuryRelaxation.json");
// const nailAcrylicsSeeds = require("./seednailAcrylics.json");
// const nailExtraSeeds = require("./seednailExtra.json");
const nailShapeSeeds = require("./seednailShape.json");
const nailSNSSeeds = require("./seednailSNS.json");
// const pamperPackageSeeds = require("./seedpamperPackages.json");


db.once('open', async () => {
  try {
    await User.deleteMany({});

    await User.create(userSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
