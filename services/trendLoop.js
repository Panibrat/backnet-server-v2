const cron = require('node-cron');
const buffer = require('../backnet/dataBuffer');
const mongoDB = require('../mongoDB/MongoDB');

const EnergyDayTotal = 'AV3000730';
const EnergyNightTotal = 'AV3000731';

class TrendLoop {
    constructor(nodeCron) {
        this.cron = nodeCron;
    }

    run() {
        //this.cron.schedule('* * * * * * *', () => { //every second
        //this.cron.schedule('* * * * * *', () => { //every minute
        this.cron.schedule('0 0 * * * *', () => { //every hour
            console.log('\n running a task every hour at xx-00-00 \n');
            if (buffer.getItem(EnergyDayTotal) >= 0) {
                mongoDB.saveTrendData(buffer.getItem(EnergyDayTotal));
            }
            if (buffer.getItem(EnergyNightTotal) >= 0) {
                mongoDB.saveTrendData(buffer.getItem(EnergyNightTotal));
            }
        });
    }
}

module.exports = new TrendLoop(cron);
