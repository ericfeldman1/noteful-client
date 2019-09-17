import React from 'react';

// Wrap the entire App 
// (except for things like a header that you always want to show) 
// in ErrorPage tags, like so:
// <ErrorPage>
// Entire App
// </ErrorPage>

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {
        error: null
        };
    }

    static getDerivedStateFromError(error) {
        console.error(error);
        return {error};
    }

    render() {
        if (this.state.error) {
        return (
        <div className="ErrorPage">
        <h1>Something went wrong</h1>
        <p>Refresh the page</p>
        </div>
        );
    }

    return this.props.children

    }
    }

    export default ErrorBoundary
