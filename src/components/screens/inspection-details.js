import React from 'react';

import {
  Text,
  View,
  SectionList,
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

  buildSections() {
    const sections = this.state.violations.map((v) => {
      const data = [v.violationText];
      if (v.violationComments) {
        data.push(v.violationComments);
      }
      return {
        title: v.lawCode,
        data,
      };
    });
    return sections;
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
        <SectionList
          renderItem={ this.renderItem.bind(this) }
          renderSectionHeader={ this.renderSectionHeader.bind(this) }
          sections={ this.buildSections() }
          keyExtractor={ (item) => item }
        />
      </View>
    );
  }

  renderItem({ item, index, section }) {
    return (
      <Text>
        { item }
      </Text>
    );
  }

  renderSectionHeader({ section: { title }}) {
    return (
      <Text>
        { title }
      </Text>
    );
  }
}
