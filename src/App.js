import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './views/Home/Home';
import { Vizz } from './views/Vizz/Vizz';
import { HyperText } from './views/HyperText/HyperText';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <div className="body">
            <Route exact path="/" component={Home} />
            <Route path="/vizz" component={Vizz} />
            <Route path="/hypertext" component={HyperText} />
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;
