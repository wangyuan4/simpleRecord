
import React, { Component } from 'react';
import Router from './Router';
global.IP = 'http://192.168.101.235:3000';
export default class APP extends Component <{}> {
  render() {
    return (
      <Router />
    );
  }
}

