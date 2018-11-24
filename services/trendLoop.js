const cron = require('node-cron');
const mongoDB = require('../mongoDB/MongoDB');
const modbusLoop = require('../modbus/modbusLoop');

class TrendLoop {
    constructor(nodeCron) {
        this.cron = nodeCron;
    }

    run() {
        //this.cron.schedule('* * * * * * *', () => { //every second
        this.cron.schedule('* * * * * *', () => { //every minute
        //this.cron.schedule('0 0 * * * *', () => { //every hour
            console.log(`\n running a task every hour at ${new Date()}`);
            const EnergyDayTotal = modbusLoop.getBuffer().EnergyDayTotal;
            const EnergyNightTotal = modbusLoop.getBuffer().EnergyNightTotal;
            if (EnergyDayTotal && EnergyDayTotal.value > 0) {
                mongoDB.saveTrendData(EnergyDayTotal);
            }
             if (EnergyNightTotal && EnergyNightTotal.value > 0) {
                mongoDB.saveTrendData(EnergyNightTotal);
            }
        });
    }
}

module.exports = new TrendLoop(cron);
