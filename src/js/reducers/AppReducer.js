export const $$initialState = {
  details: {},
  customizations: [],
};

export default function AppReducer(
  $$state = { details: {}, customizations: [] },
  action = null,
) {
  switch (action.type) {
  case 'UPDATE_PRODUCT_DETAILS': {
    return {
      details: action.details,
      customizations: action.customizations,
      validCombinations: action.validCombinations,
      invalidCombinations: action.invalidCombinations,
      renders: action.renders,
      version: action.version,
      heirarchy: action.heirarchy,
    };
  }
  case 'LOAD_PRODUCT': {
    return {
      details: action.details,
      customizations: action.customizations,
      validCombinations: action.validCombinations,
      invalidCombinations: action.invalidCombinations,
      renders: action.renders,
      version: action.version,
      heirarchy: action.heirarchy,
    };
  }
  case 'NEW_PRODUCT': {
    return {
      details: {},
      customizations: [],
      validCombinations: {},
      invalidCombinations: {},
      renders: {},
      version: 0,
      heirarchy: {},
    };
  }
  default: {
    return $$state;
  }
  }
}
