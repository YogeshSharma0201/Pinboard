var React = require('react');
var ReactDOM = require('react-dom');
var Nav = require('Nav');
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();
ReactDOM.render(<Nav />, document.getElementById('app'));
