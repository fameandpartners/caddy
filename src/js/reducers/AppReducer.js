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
        $$state.details = action.details;
        return $$state;
      }
      case 'LOAD_PRODUCT':
      {
        return {
          details: action.details,
          customizations: action.customizations,
          version: action.version
        };
      }
      case 'NEW_PRODUCT':
      {
        return {
          details: {},
          customizations: [],
          version: 0
        }
      }
    default:
        {
            return $$state;
        }
    }
}

