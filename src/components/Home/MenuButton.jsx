import React from 'react';
import {Link} from 'react-router';

class MenuButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.highlight = this.highlight.bind(this);
    this.unHighlight = this.unHighlight.bind(this);
    this.showForm = this.showForm.bind(this);
    this.go = this.go.bind(this);
  }
  highlight(event) {
    event.preventDefault();
    console.log(this.props);
    event.target.style.fontWeight = 400;
    event.target.style.color = this.props.colors.base;
  }
  unHighlight(event) {
    event.target.style.fontWeight = 300;
    event.target.style.color = this.props.colors.light;
  }
  showForm(event) {
    console.log(this);
  }
  go() {}
  render() {
    const colors = this.props.colors;
    // const width = document.getElementById('logo').offsetWidth / 2;
    const buttonStyle = {
      alignSelf: 'flex-start',
      height: '30px',
      width: '50%',
      textAlign: 'center',
      color: colors.dark,
      fontWeight: 300
    };
    return (
      <Link to={this.props.to} style={buttonStyle} onMouseOver={this.highlight} onMouseOut={this.unHighlight} onClick={this.showForm}>
        {this.props.children}
      </Link>
    );
  }
}

MenuButtonComponent.defaultProps = {};

export default MenuButtonComponent;
