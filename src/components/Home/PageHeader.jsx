import React from 'react';

class PageHeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let capitalize = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const color = this.props.color;
    const align = capitalize(this.props.align || 'left');
    const style = {
      marginTop: '60px',
      marginBottom: '60px',
      ['margin' + align]: '40px',
      textAlign: align,
      color: color || 'inherit',
      fontSize: '40px',
      fontWeight: 100
    };
    return (
      <h1 style={style}>{this.props.children}</h1>
    );
  }
}

PageHeaderComponent.defaultProps = {};

export default PageHeaderComponent;
