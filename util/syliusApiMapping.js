export const token = "5f50b044-a8a7-4732-b6fd-1f8743dfa590";

export const getProductBySlugUrl = (slug) => `products/by-slug/${slug}`;
export const getProductBySlugParam = (slug) => { return {url: getProductBySlugUrl(slug), id: slug} };

export const getCartByTokenUrl = (token) => `carts/${token}`;
export const getCartByTokenParam = (token) => { return {url: getCartByTokenUrl(token), id: token} };

export const getShippingMethodsUrl = ({token}) => `checkout/${token}/shipping`;
export const getShippingMethodsParam = ({token}) => { return {url: getShippingMethodsUrl({token}), id: token} };

export const addItemToNewCartUrl = () => `carts/new/items`;
export const addItemToNewCartParam = (params) => { return {url: addItemToNewCartUrl(), data: getAddToCartData(params)} };

export const updateCartItemQuantityUrl = ({token,id}) => `carts/${token}/items/${id}`;
export const updateCartItemQuantityParam = ({quantity,token,id}) => { return {url: updateCartItemQuantityUrl({token,id}), data: {quantity}} };

export const addCheckoutAddressUrl = ({token}) => `checkout/${token}/address`;
export const addCheckoutAddressParam = ({shippingAddress,token}) => { return {url: addCheckoutAddressUrl({token}), data: {shippingAddress}} };

export const selectCheckoutShippingMethodUrl = ({token,shippingId}) => `checkout/${token}/shipping/${shippingId}`;
export const selectCheckoutShippingMethodParam = ({shippingId,token,method}) => { return {
    url: selectCheckoutShippingMethodUrl({token,shippingId}),
    data: {method}}
};

export const selectCheckoutPaymentMethodUrl = ({token,paymentId}) => `checkout/${token}/payment/${paymentId}`;
export const selectCheckoutPaymentMethodParam = ({paymentId,token,method}) => { return {
    url: selectCheckoutPaymentMethodUrl({token,paymentId}),
    data: {method}}
};

export const completeCheckoutUrl = ({token}) => `checkout/${token}/complete`;

export const completeCheckoutParam = ({token,notes,email}) => { return {
    url: completeCheckoutUrl({token}),
    data: {notes,email}}
};

const getAddToCartData = ({product, quantity, variant, options}) => {
    const data = {productCode: product.code, quantity};
    if(variant) data.variantCode = variant.code;
    if(options) data.options = options;
    return data;
};
