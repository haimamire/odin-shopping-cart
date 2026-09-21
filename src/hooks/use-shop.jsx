import { useEffect, useState } from "react";

const useShop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (response.status >= 400) throw new Error(response.status);

        const data = await response.json();
        setAllProducts(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    dataFetch();
  }, []);

  return { allProducts, error, loading };
};

export default useShop;
