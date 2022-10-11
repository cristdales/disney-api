const app = require('./app');
const sequelize = require('./sequelize');
const { PORT } = require('./utils/constants');

async function main() {
  try {
    let retries = 5;
    while (retries > 0) {
      try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        break;
      } catch (err) {
        retries--;
        await new Promise((res) => setTimeout(res, 3000));
      }
    }
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

main();
