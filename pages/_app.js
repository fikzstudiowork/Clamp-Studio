import React from 'react';
import '../styles/globals.css';

export default function App(props) {
  return React.createElement(props.Component, props.pageProps);
}
