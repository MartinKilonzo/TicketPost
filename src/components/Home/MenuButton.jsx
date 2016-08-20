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
    const style = event.target.style;
    style.fontWeight = 400;
    style.color = this.props.colors.dark;
    event.target.style.boxShadow = '0px 1px 2px ' + this.props.colors.dark;
  }
  unHighlight(event) {
    const style = event.target.style;
    style.fontWeight = 300;
    style.color = this.props.colors.light;
    event.target.style.boxShadow = 'none';
  }
  showForm(event) {
    console.log('go!')
  }
  go() {}
  render() {
    const colors = this.props.colors;
    // const width = document.getElementById('logo').offsetWidth / 2;
    const buttonStyle = {
      height: '30px',
      width: '49%',
      marginLeft: '5px',
      marginRight: '5px',
      textAlign: 'center',
      backgroundColor: colors.white,
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
