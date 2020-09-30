import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {getGlobalReport} from '../../utils/apiFunction';
import moment from 'moment';
import {PieChart} from 'react-native-svg-charts';
import GlobalReportStyles from '../../styles/GlobalReportStyles';
import i18n from '../../i18n/i18n';

class GlobalReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      lastUpdate: '',
      data: [],
    };
  }

  componentDidMount() {
    getGlobalReport().then(res => {
      this.setState({
        confirmed: res.confirmed.value,
        recovered: res.recovered.value,
        deaths: res.deaths.value,
        lastUpdate: moment.utc(res.lastUpdate).format(i18n.TIME_FORMAT),
        data: [
          ...this.state.data,
          res.confirmed.value,
          res.recovered.value,
          res.deaths.value,
        ],
      });
    });
  }

  render() {
    const randomColor = () =>
      ('#' + ((Math.random() * 0xffffff) << 0).toString(10) + '111111').slice( 0,7,0);

    const pieData = this.state.data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: randomColor(),
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }));

    return (
      <View
        style={{
          marginTop: 14,
        }}>
        <View style={GlobalReportStyles.globalReportContainer}>
          <Text style={GlobalReportStyles.titleGlobalReport}>
            {i18n.GLOBAL_REPORT.TITLE_GLOBAL_REPORT}
          </Text>
          <Text style={GlobalReportStyles.dataGlobalReport}>
            {i18n.GLOBAL_REPORT.DATE_GLOBAL_REPORT}
            {this.state.lastUpdate}
          </Text>
          <View style={GlobalReportStyles.itemGlobalReportContainer}>
            <View style={{marginTop: 8}}>
              <View
                style={{
                  flexWrap: 'wrap',
                }}>
              </View>
            </View>
            <View style={GlobalReportStyles.statusContainer}>
              <View style={{  height: 100,
                      width: 110,
                      backgroundColor: "#F1C40F",
                      borderRadius: 10,
                      margin: 5}}>
                <Text style={{marginTop: 12, color: "#fff", fontSize: 20, textAlign: 'center' }}>
                  ผู้ติดเชื้อ
                </Text>
                <Text style={{marginTop: 12, color: "#fff", fontSize: 20, textAlign: 'center'}}>
                {this.state.confirmed}
                </Text>
              </View>
              <View style={ {height: 100,
                      width: 110,
                      backgroundColor: "#58D68D",
                      borderRadius: 10,
                      margin: 5}}>
                <Text style={{marginTop: 12, color: "#fff", fontSize: 20, textAlign: 'center' }}>
                 หายแล้ว
                </Text>
                <Text style={{marginTop: 12, color: "#fff", fontSize: 20, textAlign: 'center' }}>
                 {this.state.recovered}
                </Text>
              </View>
              <View style={{height: 100,
                      width: 110,
                      backgroundColor: "#E74C3C",
                      borderRadius: 10,
                      margin: 5}}>
                <Text style={{marginTop: 12, color: "#fff", fontSize: 20, textAlign: 'center' }}>
                ผู้เสียชีวิต
                </Text>
                <Text style={{marginTop: 12, color: "#fff", fontSize: 20, textAlign: 'center' }}>
                  {this.state.deaths}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default GlobalReport;
