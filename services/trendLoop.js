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
        this.cron.schedule('* * * * * *', () => {
            //console.log('\n running a task every second \n');
            mongoDB.saveTrendData(buffer.getItem(EnergyDayTotal));
            mongoDB.saveTrendData(buffer.getItem(EnergyNightTotal));
        });
    }
}

module.exports = new TrendLoop(cron);
