/**
 * Error Boundary to catch react component mounting and other react errors
 */

import React, { Component } from 'react';

// Component Imports
import Error from './error'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Error/> //if error show Error page
    }

    return this.props.children; 
  }
}

export default ErrorBoundary