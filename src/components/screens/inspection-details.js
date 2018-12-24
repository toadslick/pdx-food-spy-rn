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
    return this.state.violations.map((v) => {
      return {
        title: v.lawCode,
        data: [v],
      };
    });
  }

  render() {
    const { inspection, violations } = this.state;
    const scoreStyle = { color: inspection.scoreColor };

    let listView;
    if (violations.length) {
      listView = this.renderList();
    } else {
      listView = this.renderEmptySet();
    }

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
        { listView }
      </View>
    );
  }

  renderList() {
    return (
      <SectionList
        renderItem={ this.renderItem.bind(this) }
        renderSectionHeader={ this.renderSectionHeader.bind(this) }
        sections={ this.buildSections() }
      />
    );
  }

  renderItem({ item, index, section }) {
    let commentText;
    if (item.violationComments) {
      commentText = (
        <Text style={ [styles.cellText, styles.cellComments] }>
          { item.violationComments }
        </Text>
      );
    }

    return (
      <View style={ styles.sectionCell }>
        <Text style={ styles.cellText }>
          { item.violationText }
        </Text>
        { commentText }
      </View>
    );
  }

  renderSectionHeader({ section: { title }}) {
    return (
      <Text style={ styles.sectionHeading }>
        { title }
      </Text>
    );
  }

  renderEmptySet() {
    return (
      <View style={ styles.emptySetContainer }>
        <Text style={ styles.emptySetMessage }>
          No violations were recorded for this inspection.
        </Text>
      </View>
    );
  }
}
