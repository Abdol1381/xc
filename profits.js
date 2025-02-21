const { default: axios } = require("axios");
const cron = require("node-cron");
const { getLogger } = require("log4js");

const BASE_URL = "http://localhost:3000";

const logger = getLogger();
logger.level = "info";

const main = async () => {
  process.env.TZ = "UTC";

  logger.info("activating event scheduler...");

  cron.schedule("0 0 * * *", async () => {
    try {
      const when = new Date()
        .toLocaleString("us", {
          month: "long",
          year: "numeric",
        })
        .toLowerCase();

      logger.info(`starting to give profits of ${when}!`);

      await axios.post(`${BASE_URL}/api/getServerProfits`);
      await axios.post(`${BASE_URL}/api/getServerProfitLvl1`);
      await axios.post(`${BASE_URL}/api/getServerProfitLvl2`);
      await axios.post(`${BASE_URL}/api/getServerProfitLvl3`);

      logger.info(`successfully gave profits of ${when}!`);
    } catch (error) {
      logger.error(
        `scheduled profits just failed! reason : ${error?.message || "unknown"}`
      );
    }
  });

  logger.info(
    `event scheduler activated at ${new Date().toLocaleString("en", {
      hour: "2-digit",
      day: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "long",
      year: "numeric",
    })}!`
  );
};

main();
