const cron = require('node-cron');
const mongoDB = require('../mongoDB/MongoDB');
const sql3 = require('../SQLite3/SQLite');
const { TABLE_DAY_CONSUMPTION } = require('../SQLite3/config');
const modbusLoop = require('../modbus/modbusLoop');

class TrendLoop {
    constructor(nodeCron) {
        this.cron = nodeCron;
    }

    run() {
        //this.cron.schedule('* * * * * * *', () => { //every second
        //this.cron.schedule('* * * * * *', () => { //every minute
        this.cron.schedule('0 0 * * * *', () => { //every hour
            console.log(`\n running a task every hour at ${new Date()}`);
            const EnergyDayTotal = modbusLoop.getBuffer().EnergyDayTotal;
            const EnergyNightTotal = modbusLoop.getBuffer().EnergyNightTotal;
            if (EnergyDayTotal && EnergyDayTotal.value > 0) {
                // mongoDB.saveTrendData(EnergyDayTotal);
                sql3.savePointToTable(EnergyDayTotal, TABLE_DAY_CONSUMPTION);
            }
             if (EnergyNightTotal && EnergyNightTotal.value > 0) {
                // mongoDB.saveTrendData(EnergyNightTotal);
                sql3.savePointToTable(EnergyNightTotal, TABLE_DAY_CONSUMPTION);
            }
        });
        this.cron.schedule('0 0 0 * * *', () => { //every hour
            console.log(`\n Every midnight: ${new Date()}`);
            // save day & night consumption values to NAE
        });
        this.cron.schedule('0 0 0 1 * *', () => { //every hour
            console.log(`\n Every month, run at midnight: ${new Date()}`);
            // save total  consumption values to NAE
        });
    }
}

module.exports = new TrendLoop(cron);
