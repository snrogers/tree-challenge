import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Manager, Target, Reference, Popper, Arrow } from 'react-popper';

// export default class Factory extends PureComponent {
//   state = {
//     isOpen: false
//   };
//
//   handleClick = () => {
//     this.setState(prevState => ({
//       isOpen: !prevState.isOpen
//     }));
//   };
//
//   render() {
//     return (
//       <div>
//         <h2>Toggleable Popper Example</h2>
//         <Manager>
//           <Target
//             style={{ width: 120, height: 120, background: '#b4da55' }}
//             onClick={this.handleClick}
//           >
//             Click {this.state.isOpen ? 'to hide' : 'to show'} popper
//           </Target>
//           {this.state.isOpen && (
//             <Popper className="popper">
//               Popper Content for Toggleable Example
//               <Arrow className="popper__arrow" />
//             </Popper>
//           )}
//         </Manager>
//       </div>
//     );
//   }
// }

export class Factory extends PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <li className="factory">
        <Manager>
          <div>
            <Reference>
              {({ ref }) => (
                <button type="button" ref={ref}>
                  Reference element
                </button>
              )}
            </Reference>
            <Popper placement="right">
              {({ ref, style, placement, arrowProps }) => (
                <div ref={ref} style={style} data-placement={placement}>
                  Popper element
                  <div ref={arrowProps.ref} style={arrowProps.style} />
                </div>
              )}
            </Popper>
          </div>
        </Manager>

        <div />

        <button
          className="btn small btn-danger"
          onClick={() =>
            this.props.actions.removeFactory(this.props.factoryState)
          }
        >
          <i className="fa fa-minus-square" />
        </button>
        <label>{this.props.factoryState.name}</label>
        <ul>
          {this.props.factoryState.children.map((node, index) => (
            <li key={index} className="leaf">
              {node}
            </li>
          ))}
        </ul>
      </li>
    );
  }
}
