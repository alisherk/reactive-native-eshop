import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const resp = await fetch(
        'https://react-native-app-c6b14.firebaseio.com/products.json'
      );
      if (!resp.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await resp.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imgUrl,
            resData[key].desc,
            resData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const resp = await fetch(
        `https://react-native-app-c6b14.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: 'DELETE'
        }
      );
      if (!resp.ok) {
        throw new Error('Oops something went wrong');
      }
      dispatch({ type: DELETE_PRODUCT, pid: id });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, desc, imgUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const resp = await fetch(
        `https://react-native-app-c6b14.firebaseio.com/products.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            desc,
            imgUrl,
            price,
            ownerId: userId
          })
        }
      );

      const resData = await resp.json();
      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title,
          desc,
          imgUrl,
          price,
          ownerId: userId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProduct = (id, title, desc, imgUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const resp = await fetch(
        `https://react-native-app-c6b14.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            desc,
            imgUrl
          })
        }
      );
      if (!resp.ok) {
        throw new Error('Oops something went wrong');
      }
      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
          title,
          desc,
          imgUrl
        }
      });
    } catch (err) {
      throw err;
    }
  };
};
