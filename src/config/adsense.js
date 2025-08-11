/**
 * Google AdSense Configuration
 *
 * This file contains Google AdSense identifiers used in the project
 * When transferring the project to the client, these values need to be changed to real ones
 */

const AdSenseConfig = {
  // Account identifier
  client: "ca-pub-1688764604430717",

  // Slot identifiers for different ad placements
  slots: {
    // Main page
    mainLeft: "3518990876", // Left ad on main page
    mainRight: "7578489531", // Right ad on main page
    mainBottom: "4269799918", // Bottom ad on main page

    // Status page
    statusLeft: "2956718244", // Left ad on status page
    statusRight: "8017473232", // Right ad on status page
  },

  // Testing settings
  isTest: process.env.NODE_ENV === "development",
};

export default AdSenseConfig;
