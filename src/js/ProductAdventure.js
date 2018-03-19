// /* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
// import CustomizationCombinations from './CustomizationCombinations';
// import RenderedCustomizationCombinationList from './RenderedCustomizationCombinationList';
import HeirarchyRow from './HeirarchyRow';
import * as AppActions from './actions/AppActions';

class ProductAdventure extends React.Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
  };

  state = {
    heirarchy: {},
    selectedPath: [],
  };

  componentDidMount() {
    this.updateWithLatestState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateWithLatestState(nextProps);
  }

  updateHeirarchy = (id, data) => {
    console.log('updating');
    const heirarchy = this.state.heirarchy;

    heirarchy[id] = data;
    this.setState({
      heirarchy,
    });
  };

  save = () => {
    const product = this.state.product;
    product.heirarchy = this.state.heirarchy;

    this.setState({
      product,
    });
    this.props.save(product);
  };

  updateWithLatestState = (props) => {
    this.setState({
      product: props.product,
      heirarchy: props.heirarchy,
    });
  };

  addLevel = () => {
    const levelId = uuidv4();
    const levelName = this.levelName.value.trim();
    if (levelName !== '') {
      const heirarchy = this.state.heirarchy;
      heirarchy[levelId] = {
        id: levelId,
        order: Object.keys(this.state.heirarchy).length + 1,
        name: levelName,
        customizations: {},
      };

      this.setState({
        heirarchy,
      });
    }
  };

  toggleInSelectedPath = (customizationId, heirarchyData) => {
    let selectedPath = this.state.selectedPath;
    const pathIndex = selectedPath.indexOf(customizationId);
    if (pathIndex === -1) {
      selectedPath = selectedPath.slice(0, heirarchyData.order - 1);
      selectedPath.push(customizationId);
    } else {
      selectedPath = selectedPath.slice(0, pathIndex);
    }

    this.setState({
      selectedPath,
    });
  };

  findSelectedItemForRow = (heirarchyData) => {
    if (heirarchyData.order > this.state.selectedPath.length) {
      return null;
    } else {
      return this.state.selectedPath[heirarchyData.order - 1];
    }
  };

  renderHeirarchyRow = (level, i) => (
    <div key={`heirarchy-row-${level.name + i}`}>
      <div className="row top-margin">
        <div className="col-md-2">{level.name}</div>
      </div>
      <HeirarchyRow
        name={level.name}
        data={this.state.heirarchy}
        selectedItem={this.findSelectedItemForRow(level)}
        selectedPath={this.state.selectedPath}
        update={this.updateHeirarchy}
        toggleInSelectedPath={this.toggleInSelectedPath}
        disabled={level.order > this.state.selectedPath.length + 1}
      />
    </div>
  );

  render() {
    return (
      <div className="container heirarchy">
        <div className="row top-margin">
          <div className="col-md-2">
            <button onClick={this.save}>Save</button>
          </div>
        </div>
        {Object.keys(this.state.heirarchy)
          .sort(
            (a, b) =>
              this.state.heirarchy[a].order - this.state.heirarchy[b].order,
          )
          .map((level, i) =>
            this.renderHeirarchyRow(this.state.heirarchy[level], i),
          )}
        <div className="row top-margin">
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Level Name"
              ref={(input) => {
                this.levelName = input;
              }}
            />
          </div>
          <div className="col-md-2 text-left">
            <button onClick={this.addLevel}>Add Level</button>
          </div>
        </div>
      </div>
    );
  }
}

function stateToProps(state) {
  const heirarchy = state.product.heirarchy || {};
  return {
    product: state.product,
    heirarchy,
  };
}

function dispatchToProps(dispatch) {
  return {
    save: (value) => {
      dispatch(AppActions.updateProductDetails(value));
    },
  };
}

export default connect(stateToProps, dispatchToProps)(ProductAdventure);
