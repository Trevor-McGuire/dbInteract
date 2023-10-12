import { useMutation, useQuery } from '@apollo/client';
import { ADD_TO_CART } from '../utils/mutations';
import { READ_CART } from '../utils/queries';


const AddToCart = ({ productId, quantity }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART);
  if (loading) {return <h2>LOADING...</h2>;}

  const handleAddToCartClick = async () => {
    try {
      const { data } = await addToCart({
        variables: { productId, quantity: parseInt(quantity) },
        refetchQueries: [{ query: READ_CART }],
      });
      console.log("data", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button onClick={handleAddToCartClick}>Add to cart</button>
    </div>
  );
};

export default AddToCart;





















