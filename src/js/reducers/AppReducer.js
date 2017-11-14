export const $$initialState = {
  details: {}
};

export default function AppReducer($$state = { details: {} }, action = null)
{
    console.log( 'App Reducer Called' );
    switch (action.type)
    {
    case 'UPDATE_PRODUCT_DETAILS':
        {
            return {
                details: action.details
            };
        }
    default:
        {
            return $$state;
        }
    }
}

