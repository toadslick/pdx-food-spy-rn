import React from 'react';

import {
  Text,
  View,
} from 'react-native';

import BaseScreen from './_base';
import styles from '../../styles/screens/inspection-details';

export default class InspectionDetails extends BaseScreen {
  dateFormat = 'MMMM D, YYYY';

  constructor(props) {
    super(props);
    this.state.violations = props.navigation.getParam('violations');
    this.state.inspection = props.navigation.getParam('inspection');
  }

  render() {
    const inspection = this.state.inspection;
    const scoreStyle = { color: inspection.scoreColor };

    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <View style={ styles.headerTextContainer }>
            <Text style={ styles.title }>
              { inspection.name }
            </Text>
            <Text style={ styles.subtitle }>
              { inspection.moment.format(this.dateFormat) }
            </Text>
          </View>
          <Text style={ [styles.score, scoreStyle] }>
            { inspection.score }
          </Text>
        </View>
      </View>
    );
  }
}
