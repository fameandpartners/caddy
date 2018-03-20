import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import 'css/components/HeirarchyRow.scss';
import get from 'lodash/get';
import classnames from 'classnames';
import HeirarchyCustomizationSet from './HeirarchyCustomizationSet';
import CanvasImage from './CanvasImage';

class HeirarchyRow extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    selectedPath: PropTypes.array.isRequired,
    update: PropTypes.func.isRequired,
    toggleInSelectedPath: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    selectedItem: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    selectedItem: '',
    disabled: false,
    id: '',
  };

  state = {
    showAddModal: false,
    customizations: {},
    selectedCustomizations: [],
    data: {},
  };

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.data[nextProps.name] || {};
    data.customizations = data.customizations || {};
    data.selectedCustomizations = data.selectedCustomizations || {};

    const path = `path:${nextProps.selectedPath
      .slice(0, data.order - 1)
      .join(',')}`;
    const selectedCustomizations = data.selectedCustomizations[path] || [];
    const customizations = data.customizations || {};

    this.setState({
      selectedCustomizations,
      customizations,
      selectedItem: nextProps.selectedItem,
      selectedPath: path,
      data,
    });
  }

  addCustomizationToCustomizationSet = (customizationId, json) => {
    const data = this.state.data;
    const customId = customizationId || uuidv4();
    data.customizations[customId] = json;
    this.setState({
      customizations: data.customizations,
    });

    this.props.update(this.props.id, data);
  };

  toggleSelectedCustomization = (uuid) => {
    const selectedCustomizations = this.state.selectedCustomizations;
    const data = this.state.data;

    if (selectedCustomizations.indexOf(uuid) === -1) {
      selectedCustomizations.push(uuid);
    } else {
      selectedCustomizations.splice(selectedCustomizations.indexOf(uuid), 1);
    }

    data.selectedCustomizations[
      this.state.selectedPath
    ] = selectedCustomizations;

    this.setState({
      selectedCustomizations,
    });

    this.props.update(this.props.id, data);
  };

  customizationSelectedClass = (customizationId) => {
    if (customizationId === this.state.selectedItem) {
      return 'heirarchy-button-selected';
    } else {
      return '';
    }
  };

  renderCustomizationSet = () => {
    if (this.state.showAddModal) {
      return (
        <HeirarchyCustomizationSet
          key={`customization-set-${this}`}
          customizations={this.state.customizations}
          selectedCustomizations={this.state.selectedCustomizations}
          addCustomization={this.addCustomizationToCustomizationSet}
          toggleSelected={this.toggleSelectedCustomization}
          closeModal={() => this.setState({ showAddModal: false })}
        />
      );
    } else {
      return '';
    }
  };

  renderDisabled = () => (
    <div
      key="disabled-text"
      className="col-md-12 text-center heirarchy-disabled-text"
    >
      Choose Item Above
    </div>
  );

  renderCanvas = (customizationJSON) => {
    const image = get(customizationJSON, 'image');
    return (
      image && (
        <CanvasImage
          imageData={customizationJSON.image}
          width={150}
          height={150}
        />
      )
    );
  };

  renderSelectedCustomizations = customizationId => (
    <div
      role="presentation"
      key={`select-${customizationId}`}
      className={classnames(
        'col-md-2 heirarchy-button heirarchy-button-has-image',
        {
          'heirarchy-button-selected':
            customizationId === this.state.selectedItem,
        },
      )}
      onClick={() =>
        this.props.toggleInSelectedPath(customizationId, this.state.data)
      }
    >
      <div className="heirarchy-button-text">
        <div>
          {this.renderCanvas(this.state.data.customizations[customizationId])}
          <center>
            {this.state.data.customizations[customizationId].name}
          </center>
        </div>
      </div>
    </div>
  );

  renderContents = () => (
    <div>
      {this.state.selectedCustomizations.map(this.renderSelectedCustomizations)}
      <div
        role="presentation"
        key="heirarchy-row-add-new"
        className="col-md-2 heirarchy-button"
        onClick={() => this.setState({ showAddModal: true })}
      >
        <div className="heirarchy-button-text">
          <div>
            <center>Add</center>
          </div>
        </div>
      </div>
      {this.renderCustomizationSet()}
    </div>
  );

  render() {
    return (
      <div className="row top-margin heirarchy-row">
        {this.props.disabled ? this.renderDisabled() : this.renderContents()}
      </div>
    );
  }
}

function stateToProps(state) {
  if (state.product.details) {
    if (state.product.details.lengths == null) {
      state.product.details.lengths = []; // eslint-disable-line
    }
  }
  return {
    showProductDetails: state.product && state.product.version != null,
    showCustomizations:
      state.product &&
      state.product.version != null &&
      state.product.version > 0,
    product: state.product,
  };
}

export default connect(stateToProps)(HeirarchyRow);
