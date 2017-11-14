export const $$initialState = {
  details: {}
};

export default function AppReducer($$state = { details: {} }, action = null)
{
    switch (action.type)
    {
    case 'UPDATE_PRODUCT_DETAILS':
        {
            return {
                details: action.details
            };
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
        console.log( 'new product' );
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

