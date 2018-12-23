const cron = require('node-cron');
const mongoDB = require('../mongoDB/MongoDB');
const sql3 = require('../SQLite3/SQLite');
const { TABLE_DAY_CONSUMPTION } = require('../SQLite3/config');
const modbusLoop = require('../modbus/modbusLoop');
const writeAV = require('../backnet/writeData/writeAVpromise');

class TrendLoop {
    constructor(nodeCron) {
        this.cron = nodeCron;
    }

    run() {
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
        this.cron.schedule('59 59 22 * * *', () => { //every 22:59:59
            console.log(`\n Every midnight: ${new Date()}`);
            const EnergyDayTotal = modbusLoop.getBuffer().EnergyDayTotal;
            const EnergyNightTotal = modbusLoop.getBuffer().EnergyNightTotal;
            if (EnergyDayTotal && EnergyDayTotal.value > 0) {
                writeAV({ title: 'AV3001393', value: EnergyDayTotal.value })
            }
            if (EnergyNightTotal && EnergyNightTotal.value > 0) {
                writeAV({ title: 'AV3001394', value: EnergyNightTotal.value })
            }
        });
        this.cron.schedule('0 0 0 1 * *', () => { //every 0:00:00 at month begining
            console.log(`\n Every month, run at midnight: ${new Date()}`);
            const EnergyDayTotal = modbusLoop.getBuffer().EnergyDayTotal;
            const EnergyNightTotal = modbusLoop.getBuffer().EnergyNightTotal;
            if (EnergyDayTotal && EnergyDayTotal.value > 0) {
                writeAV({ title: 'AV3001396', value: EnergyDayTotal.value })
            }
            if (EnergyNightTotal && EnergyNightTotal.value > 0) {
                writeAV({ title: 'AV3001395', value: EnergyNightTotal.value })
            }
        });
    }
}

module.exports = new TrendLoop(cron);
