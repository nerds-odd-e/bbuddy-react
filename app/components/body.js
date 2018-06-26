import React from 'react';

export default props => (
  <div {...props} style={{paddingTop: 75}}>
    {props.children}
  </div>
)
