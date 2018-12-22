import React, { Component } from 'react';

export default class BaseScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBusy: false,
    };

    this.focusListener = this.props.navigation.addListener('willFocus', this.willFocus.bind(this));
    this.blurListener  = this.props.navigation.addListener('willBlur' , this.willBlur.bind(this));
  }

  willFocus() {}
  willBlur() {}

  requestAndNavigate(promise, screenKey, paramKey, otherParams) {
    if (this.state.isBusy) { return; }

    this.setState({ isBusy: true });

    promise.then((data) => {
      console.log('Request was successful. Results:', data);
      const params = { [paramKey]: data };
      Object.assign(params, otherParams);
      this.props.navigation.navigate(screenKey, params);

    }, (err) => {
      console.log('Request failed. Error:', err);

    }).finally(() => {
      this.setState({ isBusy: false });
    });
  }
};
