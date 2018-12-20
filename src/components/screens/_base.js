import React, { Component } from 'react';

export default class BaseScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isBusy: false,
    };
  }

  requestAndNavigate(promise, screenKey, paramKey) {
    if (this.state.isBusy) { return; }

    this.setState({ isBusy: true });

    promise.then((data) => {
      console.log('Request was successful. Results:', data);
      this.props.navigation.navigate(screenKey, { [paramKey]: data });

    }, (err) => {
      console.log('Request failed. Error:', err);

    }).finally(() => {
      this.setState({ isBusy: false });
    });
  }
};
