import React from 'react';
import { convertDiffTemperaturesToColor } from '../../common/helpers';
import FirstFloorPlan from './FirstFloorPlan';
import TemperatureTile from '../../common/Components/TemperatureTile/TemperatureTile';
import HFTemperatureTile from '../../common/Components/HFTemperatureTile/HFTemperatureTile';
import styles from './FirstFloorItem.css';

const FirstFloorItem = (props) => {
    const {
        temperatureOutdoor,
        temperatureZalLeft,
        spTemperatureZalLeft,
        temperatureKitchenLeft,
        spTemperatureKitchenLeft,
        temperatureHFKitchenLeft,
        temperatureHFWC1Left,
        temperatureHFHallLeft,
        temperatureHFZal_L_Left,
        temperatureHFZal_R_Left,
        temperatureZalRight,
        spTemperatureZalRight,
        spTemperatureKitchenRight,
        temperatureKitchenRight,
        temperatureHFKitchenRight,
        isOnFirstFloorHF_WC_Left,
        isOnFirstFloorHF_kitchen_Left,
        isOnFirstFloorHF_zal_Left,
        isOnFirstFloorHF_hall_Left,
        isOnFirstFloorHF_kitchen_Right,
        isOnFirstFloorHF_WC_Right,
        isOnFirstFloorHF_hall_Right,
    } = props;

        const colorZalLeft = convertDiffTemperaturesToColor(temperatureZalLeft.value, spTemperatureZalLeft.value);
        const colorZalRight = convertDiffTemperaturesToColor(temperatureZalRight.value, spTemperatureZalRight.value);
        const colorKitchenLeft = convertDiffTemperaturesToColor(temperatureKitchenLeft.value, spTemperatureKitchenLeft.value);
        const colorKitchenRight = convertDiffTemperaturesToColor(temperatureKitchenRight.value, spTemperatureKitchenRight.value);

    return (
        <div className={styles.container}>
            <svg viewBox="20 0 360 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <g className="firstFloor_zalLeft">
                            <path
                                d="m38.431352,115.882316l36.470581,-0.000006l-0.196078,-14.901955l16.470582,-17.058817l49.999981,-0.196079l17.450974,17.058817l0.392157,14.901956l36.274496,0.196078l-0.196078,87.450948l-156.862687,0l0.196072,-87.450942z"
                                fill={colorZalLeft}
                                opacity="0.5"
                                stroke="black"
                                stroke-width ="5px"
                                onClick={() => console.log('firstFloor_zal_Left')}
                            />
                    </g>
                    <g className="firstFloor_zalRight">
                            <path
                                d="m204.846022,115.859149l36.563908,-0.000004l0,-15.198253l16.079311,-16.740104l50.881108,0l16.51984,16.740104l0.220265,15.198253l36.343648,0l0,87.445021l-156.608085,0l0.000005,-87.445017z"
                                fill={colorZalRight}
                                opacity="0.5"
                                onClick={() => console.log('firstFloor_zal_Right')}
                            />
                    </g>
                    <g className="firstFloor_kitchenLeft">
                            <path
                                d="m38.546293,273.56856l32.158623,-0.000008l-0.220265,-5.947142l24.889893,-0.220265l0,17.841428l3.744497,0.220264l0,-20.264337l38.986822,0.220265l0,109.471473l-11.894285,12.334814l-43.392113,-0.220264l-12.334814,-12.11455l-0.220264,-14.977988l-31.938358,0l0.220264,-86.34369z"
                                fill={colorKitchenLeft}
                                opacity="0.5"
                                onClick={() => console.log('firstFloor_Kitchen_Left')}
                            />
                    </g>
                    <g className="firstFloor_kitchenRight">
                            <path
                                d="m276.872526,311.233796l-0.000006,-3.524241l24.008835,-23.568305l3.744497,0l-0.220265,-16.51984l25.110157,0l0,5.947142l31.938358,0l0.220264,86.343698l-32.158622,0l0.220265,14.977988l-12.11455,12.11455l-43.392113,0l-12.334814,-12.11455l0.220265,-63.436186l14.757729,-0.220256z"
                                fill={colorKitchenRight}
                                opacity="0.5"
                                onClick={() => console.log('firstFloor_Kitchen_Right')}
                            />
                    </g>
                    <g className="firstFloorHF_WC_Left">
                        <path id="svg_5537"
                              d="m153.953099,211.423513c-22.43008,0.37021 29.67218,-0.36468 34.61939,-0.4171c4.94721,-0.05242 5.10709,5.27423 0.10428,5.21376c-5.00281,-0.06047 -30.28756,0.1254 -34.6194,0.20855c-4.33184,0.08315 -4.38764,5.54326 0,5.31804c4.38764,-0.22522 29.54318,-0.25499 34.51512,-0.20855c4.97194,0.04644 5.20612,5.14805 -0.20855,5.00521c-5.41467,-0.14284 -30.04945,0.50117 -34.41084,0.52138c-4.36139,0.02022 -4.201,5.19185 0.10427,5.21376c4.30527,0.02191 29.38668,-0.22203 34.51512,-0.20855c5.12844,0.01348 5.12899,5.04903 0.10428,5.21377c-4.85997,-0.08238 -34.6194,0.31282 -34.72367,0.20855c-4.35147,0.0299 -4.23956,5.89988 0.10427,5.63086c4.55239,0.02191 34.6194,-0.20855 34.51512,-0.31282c5.10378,-0.05242 5.33754,5.17519 0.20855,5.21376c-5.12899,0.03857 -29.72423,0.17858 -34.61939,0.20855c-4.89516,0.02997 -4.8433,4.25339 -0.20855,4.27529c4.63475,0.0219 59.72629,-0.37329 34.82794,-0.31283"
                              opacity="0.5"
                              strokeWidth="2"
                              stroke={isOnFirstFloorHF_WC_Left ? "red" : "grey"}
                              fill="none"
                              onClick={() => console.log('firstFloorHF_WC_Left')}
                        />
                    </g>
                    <g className="firstFloorHF_WC_Right">
                        <path id="svg_5536"
                              d="m210.32169,211.15251c-22.43008,0.37021 29.67218,-0.36468 34.61939,-0.4171c4.94721,-0.05242 5.10709,5.27423 0.10428,5.21376c-5.00281,-0.06047 -30.28756,0.1254 -34.6194,0.20855c-4.33184,0.08315 -4.38764,5.54326 0,5.31804c4.38764,-0.22522 29.54318,-0.25499 34.51512,-0.20855c4.97194,0.04644 5.20612,5.14805 -0.20855,5.00521c-5.41467,-0.14284 -30.04945,0.50117 -34.41084,0.52138c-4.36139,0.02022 -4.201,5.19185 0.10427,5.21376c4.30527,0.02191 29.38668,-0.22203 34.51512,-0.20855c5.12844,0.01348 5.12899,5.04903 0.10428,5.21377c-4.85997,-0.08238 -34.6194,0.31282 -34.72367,0.20855c-4.35147,0.0299 -4.23956,5.89988 0.10427,5.63086c4.55239,0.02191 34.6194,-0.20855 34.51512,-0.31282c5.10378,-0.05242 5.33754,5.17519 0.20855,5.21376c-5.12899,0.03857 -29.72423,0.17858 -34.61939,0.20855c-4.89516,0.02997 -4.8433,4.25339 -0.20855,4.27529c4.63475,0.0219 59.72629,-0.37329 34.82794,-0.31283"
                              opacity="0.5"
                              strokeWidth="2"
                              stroke={isOnFirstFloorHF_WC_Right ? "red" : "grey"}
                              fill="none"
                              onClick={() => console.log('firstFloorHF_WC_Right')}
                        />
                    </g>
                    <g className="firstFloorHF_kitchen_Left">
                        <path id="svg_5551"
                              d="m133.16048,378.928798c0,0 -55.267646,0.172711 -55.440353,0.172709c-4.833346,0.000002 -4.904832,-5.354051 0.172711,-5.354053c5.077543,-0.000002 48.066962,-0.122101 53.367821,0c5.300859,0.122101 5.199642,-5.354055 0,-5.354053c-5.199642,0.000002 -48.218791,0.05061 -53.540532,0.172711c-5.321741,0.122101 -5.250246,-5.526765 0.172711,-5.526764c5.422957,0.000001 47.599441,-0.467524 53.022398,-0.345423c5.422957,0.122101 5.250254,-4.835921 0.172711,-4.835919c-5.077543,0.000002 -80.962469,0.396033 -86.528408,0.518134c-5.565939,0.122101 -5.300859,-4.835921 0,-4.835919c5.300859,0.000002 81.054838,-0.172712 86.355697,-0.172711c5.300859,0.000001 5.637424,-5.577378 -0.172712,-5.699476c-5.810136,-0.122098 -80.322235,-0.589623 -86.010273,-0.345423c-5.688038,0.2442 -5.422967,-4.663205 -0.000005,-4.835917c5.422962,-0.172712 79.559918,-0.000004 85.837567,-0.000002c6.277649,0.000002 6.054334,-5.354054 0,-5.354053c-6.054334,0.000001 -80.688533,-0.172714 -86.010274,-0.172712c-5.321741,0.000002 -5.422957,-5.354055 0,-5.354053c5.422957,0.000002 79.143003,-0.122101 85.664851,0c6.521848,0.122101 5.881623,-5.770963 -0.172711,-5.526764c-6.054334,0.244199 -80.760018,-0.000001 -85.837562,0c-5.077544,0.000001 -4.863076,-5.770965 -0.172712,-5.526765c4.690364,0.2442 79.905335,0.935043 86.182985,0.690846c6.27765,-0.244197 6.358001,-5.821574 0.345419,-5.699475c-6.012582,0.122099 -81.623572,-0.07149 -86.701115,0.17271c-5.077543,0.2442 -4.690364,-4.713822 0,-4.835919c4.690364,-0.122097 80.768884,-0.416907 86.873826,-0.345421c6.104942,0.071486 5.982844,-5.476152 -0.172711,-5.354053c-6.155555,0.122099 -82.45739,-0.172714 -87.046538,-0.172713c-4.589148,0.000001 -4.690364,-5.008633 0,-5.008631c4.690364,0.000002 81.287019,0.273939 87.391961,0.345425c6.104942,0.071486 6.125823,-5.231957 -0.172708,-5.354055c-6.298531,-0.122098 -83.514535,-0.172712 -87.737387,-0.172711c-4.222852,0.000001 -4.100744,-5.303442 0.345423,-5.181342c4.446167,0.1221 81.114314,-0.294813 87.391964,-0.172712c6.27765,0.122101 6.125821,-4.835921 -0.172711,-4.835919c-6.298532,0.000002 -39.631256,1.536672 -40.069043,-0.172711c-0.437787,-1.709383 0.345418,-16.753004 0.172711,-16.753005"
                              opacity="0.5"
                              strokeWidth="2"
                              stroke={isOnFirstFloorHF_kitchen_Left ? "red" : "grey"}
                              fill="none"
                        />
                    </g>
                    <g className="firstFloorHF_kitchen_Right">
                        <path id="svg_5622"
                              d="m306.011076,267.721519l0.107058,17.29957c-1.273303,1.067039 38.459789,-0.54258 42.861,-0.439138c5.057527,-0.280719 5.618269,5.32721 -0.244968,5.36769l-65.998305,0.808433c-5.055662,-0.063842 -5.395463,4.588177 0.193246,4.254858l65.172148,-0.076232c5.864095,-0.33332 5.934419,4.722916 0.749926,4.659074c-5.682207,-0.134739 -60.661464,1.010542 -66.191552,1.077912c-5.370053,-0.038431 -5.215811,5.177954 0.058508,4.735306c5.389564,-0.26947 60.81973,-0.498165 65.805069,-0.556672c4.985339,-0.058507 5.641289,5.408983 -0.421951,5.274253c-6.06324,-0.13473 -59.513123,-0.07624 -64.767931,0.058508c-5.254808,0.134748 -5.196317,5.004774 -0.21097,5.004783c4.985347,0.000009 61.165439,-0.210961 65.611822,-0.210961c4.446383,0 5.120077,5.19803 -0.00001,5.063282c-4.042156,-0.269469 -72.687245,-0.345719 -78.48101,-0.210971c-5.793765,0.134748 -5.043838,5.139532 0.210978,5.274271c5.254816,0.134739 72.669497,-0.210989 78.059062,-0.21098c5.389565,0.000009 5.676766,5.40901 0.21098,5.274271c-5.465786,-0.134739 -73.841399,-0.076251 -78.691991,-0.21098c-4.850592,-0.134729 -5.331039,4.717592 -0.210962,4.64136c5.120077,-0.076232 73.437147,0.421921 78.691973,0.421931c5.254826,0.00001 5.869993,5.467498 0.21097,5.063291c-5.659023,-0.404207 -73.91762,0.134729 -78.902951,0c-4.985331,-0.134729 -5.178593,4.98705 0.21097,4.852321c5.389563,-0.134729 72.745736,0.21096 78.27004,0.21097c5.524304,0.00001 5.946246,5.19804 0.210981,5.063301c-5.735265,-0.134739 -73.419457,0.134719 -78.27005,-0.00001c-4.850593,-0.134729 -5.13781,4.98705 -0.421941,4.852321c4.715869,-0.134729 45.91704,0.269468 50.63291,0c4.71587,-0.269468 4.926822,5.139512 0.21097,5.274261c-4.715852,0.134749 -44.956161,0.076222 -50.210969,0.210971c-5.254808,0.134749 -4.985347,4.852309 0,4.85232c4.985347,0.000011 45.360378,0.058519 50.210978,0.000011c4.8506,-0.058508 3.907429,5.274261 -0.21097,5.274261c-4.118399,0 -45.917066,0.058486 -50.632919,-0.210981c-4.715853,-0.269467 -4.985347,5.06328 0,5.063291c4.985347,0.000011 50.42193,0.21096 50.421939,0.210971c4.446393,-0.134728 4.194639,4.295651 0.42195,4.43039c-7.275899,-0.134739 -50.421941,0.421941 -50.421948,0.42193"
                              opacity="0.5"
                              strokeWidth="2"
                              stroke={isOnFirstFloorHF_kitchen_Right ? "red" : "grey"}
                              fill="none"
                        />
                    </g>
                    <g className="firstFloorHF_zal_Left">
                        <path id="svg_5601"
                              d="m49.578059,201.687764c0,0 131.223618,0.21096 136.075944,0.210965c4.852326,0.000005 4.852315,-5.274267 0,-5.485232c-4.852316,-0.210965 -136.497885,0.210976 -136.497887,0.21097c-5.6962,0.210976 -5.485231,-4.852315 0.210971,-4.85232c4.43038,-0.210966 131.22362,-0.210976 136.286916,-0.210971c5.063296,0.000005 5.063285,-5.063295 -0.210971,-4.85232c-5.274256,0.210975 -136.075944,0.000005 -136.075945,0c-6.118143,0.000005 -5.907172,-5.274257 -0.210971,-5.274262c6.329116,0.000005 130.801678,-0.000005 136.286916,0c5.485238,0.000005 5.274257,-4.852324 -0.21097,-4.85232c-5.485227,0.000004 -135.654003,0.000004 -135.654005,0c-6.118141,0.421945 -6.540085,-4.852326 -0.21097,-4.852321c6.329115,0.000005 136.286921,-0.210966 136.286921,-0.210966c5.907173,0.421941 5.696204,-5.063291 -0.21097,-5.063291c-5.907174,0 -129.95781,0.210961 -136.286922,0.210966c-6.329111,0.000005 -6.329114,-5.485237 0.210971,-5.485232c6.540086,0.000005 130.168767,-0.000005 136.497886,0c6.329119,0.000005 6.118139,-4.852325 -0.21097,-5.063291c-6.329109,-0.210966 -128.270039,0.210967 -135.864975,0.210971c-7.594936,0.000004 -6.962026,-5.274266 0,-5.274262c6.962026,0.000004 129.746827,0.421937 135.864975,0.421941c6.118148,0.000004 6.329108,-5.274265 0.21097,-5.274261c-6.118138,0.000004 -129.324891,-0.421945 -136.075945,0c-6.751054,0.421945 -6.962028,-5.063294 -0.210971,-5.063291c6.751057,0.000003 129.535857,0.210966 136.075946,0.21097c6.540089,0.000004 6.118138,-5.063294 0,-5.274261c-6.118138,-0.210967 -128.69198,0.210966 -135.864975,0.21097c-7.172995,0.000004 -7.594936,-4.852317 -0.42194,-5.063287c7.172996,-0.21097 129.957796,-0.210977 136.497885,-0.210974c6.540089,0.000003 6.329119,-5.274258 -0.210965,-4.852317c-6.329114,-0.421941 -129.113926,-0.632918 -135.86498,-0.210974c-6.751054,0.421944 -6.962026,-5.696205 0,-5.485232c6.962026,0.210973 90.50633,-0.421938 98.101267,-0.421938c7.594937,0 7.805899,-5.485238 -0.000004,-5.274265c-7.805903,0.210973 -59.07173,-0.210973 -65.822783,0c-6.751053,0.210973 -5.907175,-4.852324 0,-5.063291c5.907175,-0.210967 58.01687,0.210968 65.189871,0.210971c7.173001,0.000003 7.805912,-5.6962 0.210975,-5.274259c-7.594937,0.421941 -58.860765,-0.000006 -65.189876,-0.000003c-6.329111,0.000003 -5.696206,-5.063294 0,-5.063291c5.696206,0.000003 58.227843,0.210967 65.189872,0c6.962029,-0.210967 6.962021,-5.696205 0.21097,-5.485232c-6.751051,0.210973 -53.164557,0.421938 -59.282698,0.421941c-6.118141,0.000003 -4.641353,-5.063292 0.21097,-4.85232c4.852323,0.210972 54.008441,-0.210968 54.008437,-0.210971"
                              opacity="0.5"
                              strokeWidth="2"
                              stroke={isOnFirstFloorHF_zal_Left ? "red" : "grey"}
                              fill="none"
                        />
                    </g>
                    <g className="firstFloorHF_hall_Left">
                        <path id="svg_5509"
                              d="m154.91452,274.63096c-25.70017,0.48599 29.5815,-0.48003 34.70176,-0.4171c5.12026,0.06293 5.14566,5.37852 -0.10427,5.31804c-5.24993,-0.06048 -30.1556,0.16216 -34.51512,0.20855c-4.35952,0.04639 -4.01434,5.44421 0,5.42232c3.41565,-0.03575 29.67218,-0.36468 34.61939,-0.4171c4.94721,-0.05242 5.10709,5.27423 0.10428,5.21376c-5.00281,-0.06047 -30.28756,0.1254 -34.6194,0.20855c-4.33184,0.08315 -4.38764,5.54326 0,5.31804c4.38764,-0.22522 29.54318,-0.25499 34.51512,-0.20855c4.97194,0.04644 5.20612,5.14805 -0.20855,5.00521c-5.41467,-0.14284 -30.04945,0.50117 -34.41084,0.52138c-4.36139,0.02022 -4.201,5.19185 0.10427,5.21376c4.30527,0.02191 29.38668,-0.22203 34.51512,-0.20855c5.12844,0.01348 5.12899,5.04903 0.10428,5.21377c-4.85997,-0.08238 -34.6194,0.31282 -34.72367,0.20855c-4.35147,0.0299 -4.23956,5.89988 0.10427,5.63086c4.55239,0.02191 34.6194,-0.20855 34.51512,-0.31282c5.10378,-0.05242 5.33754,5.17519 0.20855,5.21376c-5.12899,0.03857 -29.72423,0.17858 -34.61939,0.20855c-4.89516,0.02997 -4.8433,4.25339 -0.20855,4.27529c4.63475,0.0219 59.72629,-0.37329 34.82794,-0.31283"
                              opacity="0.5"
                              strokeWidth="2"
                              stroke={isOnFirstFloorHF_hall_Left ? "red" : "grey"}
                              fill="none"
                        />
                    </g>
                    <g className="firstFloorHF_hall_Right">
                        <path id="svg_5535"
                              d="m211.064247,274.36358c-25.70017,0.48599 29.5815,-0.48003 34.70176,-0.4171c5.12026,0.06293 5.14566,5.37852 -0.10427,5.31804c-5.24993,-0.06048 -30.1556,0.16216 -34.51512,0.20855c-4.35952,0.04639 -4.01434,5.44421 0,5.42232c3.41565,-0.03575 29.67218,-0.36468 34.61939,-0.4171c4.94721,-0.05242 5.10709,5.27423 0.10428,5.21376c-5.00281,-0.06047 -30.28756,0.1254 -34.6194,0.20855c-4.33184,0.08315 -4.38764,5.54326 0,5.31804c4.38764,-0.22522 29.54318,-0.25499 34.51512,-0.20855c4.97194,0.04644 5.20612,5.14805 -0.20855,5.00521c-5.41467,-0.14284 -30.04945,0.50117 -34.41084,0.52138c-4.36139,0.02022 -4.201,5.19185 0.10427,5.21376c4.30527,0.02191 29.38668,-0.22203 34.51512,-0.20855c5.12844,0.01348 5.12899,5.04903 0.10428,5.21377c-4.85997,-0.08238 -34.6194,0.31282 -34.72367,0.20855c-4.35147,0.0299 -4.23956,5.89988 0.10427,5.63086c4.55239,0.02191 34.6194,-0.20855 34.51512,-0.31282c5.10378,-0.05242 5.33754,5.17519 0.20855,5.21376c-5.12899,0.03857 -29.72423,0.17858 -34.61939,0.20855c-4.89516,0.02997 -4.8433,4.25339 -0.20855,4.27529c4.63475,0.0219 59.72629,-0.37329 34.82794,-0.31283"
                              opacity="0.5"
                              strokeWidth="2"
                              stroke={isOnFirstFloorHF_hall_Right ? "red" : "grey"}
                              fill="none"
                        />
                    </g>
                <g transform="translate(175, 60)">
                    <TemperatureTile temperature={temperatureOutdoor.value} />
                </g>
                <g transform="translate(95, 140)">
                    <TemperatureTile temperature={temperatureZalLeft.value} />
                </g>
                <g transform="translate(260, 140)">
                    <TemperatureTile temperature={temperatureZalRight.value} />
                </g>
                <g transform="translate(65, 310)">
                    <TemperatureTile temperature={temperatureKitchenLeft.value} />
                </g>
                <g transform="translate(290, 310)">
                    <TemperatureTile temperature={temperatureKitchenRight.value} />
                </g>
                <g transform="translate(320, 280)">
                    <HFTemperatureTile temperature={temperatureHFKitchenRight.value} />
                </g>
                <g transform="translate(95, 350)">
                    <HFTemperatureTile temperature={temperatureHFKitchenLeft.value} />
                </g>
                <g transform="translate(153, 287)">
                    <HFTemperatureTile temperature={temperatureHFHallLeft.value} />
                </g>
                <g transform="translate(151, 227)">
                    <HFTemperatureTile temperature={temperatureHFWC1Left.value} />
                </g>
                <g transform="translate(50, 120)">
                    <HFTemperatureTile temperature={temperatureHFZal_L_Left.value} />
                </g>
                <g transform="translate(151, 170)">
                    <HFTemperatureTile temperature={temperatureHFZal_R_Left.value} />
                </g>
                <FirstFloorPlan />
            </svg>
        </div>
    )
};

export default FirstFloorItem;
