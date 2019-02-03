import { connect } from 'react-redux';
import SecondFloorItem from './SecondFloorItem';
import { findPoint } from '../../common/helpers';

const mapStateToProps = (store) => {
    return {
        temperatureOutdoor: findPoint('AI3001121', store.ai),
        temperatureD1: findPoint('AI3000767', store.ai),
        spTemperatureD1: findPoint('AI3000792', store.ai),
        temperatureD2: findPoint('AI3000769', store.ai),
        spTemperatureD2: findPoint('AI3000791', store.ai),
        temperatureCabinetLeft: findPoint('AI3000772', store.ai),
        spTemperatureCabinetLeft: findPoint('AI3000789', store.ai),
        temperatureBedroomLeft: findPoint('AI3000773', store.ai),
        spTemperatureBedroomLeft: findPoint('AI3000790', store.ai),
        temperatureCabinetRight: findPoint('AI3000187', store.ai),
        spTemperatureCabinetRight: findPoint('AI3000880', store.ai),
        temperatureBedroomRight: findPoint('AI3000179', store.ai),
        spTemperatureBedroomRight: findPoint('AI3000881', store.ai),
        temperatureHFWC2Left:  findPoint('AI3001167', store.ai),
        isOnSecondFloorHF_WC_Left: (findPoint('AI3001179', store.ai).value > 5),
        isOnSecondFloorHF_WC_Right: (findPoint('AI3000182', store.ai).value > 5),
    };

};

export default connect(mapStateToProps)(SecondFloorItem);
