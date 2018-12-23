// All screen components should inherit from this class, which provides this shared behavior:
//
// - state.isBusy : indicates when the screen is performing async behavior
//     such as making an HTTP request.
//
// - willFocus() : function called before the screen becomes visible.
// - willBlur() : function called before the screen is hidden from view.
//
// - requestAndNavigate : after performing a successful API request.
//     navigate to the next screen and pass it the results as a param.
// - requestDidFail : called when an API request fails or returns empty results.
//     By default this renders an alert modal with an error message.

import React, { Component } from 'react';
import { Alert } from 'react-native';

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
      this.requestDidFail(err);
    }).finally(() => {
      this.setState({ isBusy: false });
    });
  }

  requestDidFail(err) {
    Alert.alert(err);
  }
};
