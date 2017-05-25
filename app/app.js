const React = require('react'),
	ReactDOM = require('react-dom');

const Button = (props) => {
	return (
		<button>Go</button>

	);
};

ReactDOM.render(<Button />, './public/index.html');

function component () {
	var element = document.createElement('div');

  /* lodash is required for the next line to work */
	element.innerHTML = _.join(['Hello','webpack'], ' ');

	return element;
}

document.body.appendChild(component());