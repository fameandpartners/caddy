export const $$initialState = {
  details: {}
};

export default function AppReducer($$state = { details: {} }, action = null)
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
          version: action.version
        };
      }
      case 'NEW_PRODUCT':
      {
        return {
          details: {},
          version: 0
        }
      }
    default:
        {
            return $$state;
        }
    }
}

