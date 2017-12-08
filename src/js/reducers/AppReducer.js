export const $$initialState = {
  details: {},
  customizations: []
};

export default function AppReducer($$state = { details: {}, customizations: [] }, action = null)
{
    switch (action.type)
    {
    case 'UPDATE_PRODUCT_DETAILS':
      {
        return {
          details: action.details,
          customizations: action.customizations,
          validCombinations: action.validCombinations,
          invalidCombinations: action.invalidCombinations,
          version: action.version
        };
      }
      case 'LOAD_PRODUCT':
      {
        return {
          details: action.details,
          customizations: action.customizations,
          validCombinations: action.validCombinations,
          invalidCombinations: action.invalidCombinations,          
          version: action.version
        };
      }
      case 'NEW_PRODUCT':
      {
        return {
          details: {},
          customizations: [],
          validCombinations: {},
          invalidCombinations: {},
          version: 0
        }
      }
    default:
        {
            return $$state;
        }
    }
}

