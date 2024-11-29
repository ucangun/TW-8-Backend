"use strict";
/* -------------------------------------------------------
                NODEJS EXPRESS | Hotel API
# npm i node-cron
------------------------------------------------------- */

const cron = require("node-cron");
const Blacklist = require("../models/blacklistModel");

// Function to clean expired tokens
const cleanExpiredTokens = async () => {
  const now = new Date();
  const { deletedCount } = await Blacklist.deleteMany({
    expiresAt: { $lte: now },
  });

  // Log only if tokens were deleted
  if (deletedCount) {
    console.log(`Cleaned ${deletedCount} expired tokens from the blacklist.`);
  }
};

// Schedule the cleaning task
const scheduleBlacklistCleanup = () => {
  cron.schedule("*/10 * * * *", cleanExpiredTokens);
};

module.exports = scheduleBlacklistCleanup;
