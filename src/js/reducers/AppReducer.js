import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({
    productName: null
});

export default function AppReducer($$state = {}, action = null)
{
    console.log( 'App Reducer Called' );
    switch (action.type)
    {
    case 'UPDATE_PRODUCT_NAME':
        {
            return {
                name: action.productName
            };
        }
    default:
        {
            return $$state;
        }
    }
}

