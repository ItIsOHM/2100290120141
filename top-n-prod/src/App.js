import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      let comp = "AMZ";
      let catg = "Laptop";
      let n = 10;
      let minPrice = 1;
      let maxPrice = 10000;
      let url = `test/companies/${comp}/categories/${catg}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MjIzOTQ4LCJpYXQiOjE3MTcyMjM2NDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQwMjQzYmYxLWI3YTItNGNlYi1hNmFiLTc4NDg2NmY3MGMwZCIsInN1YiI6InJoeXRobWdhcmcwNUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJyaHlTaG9wIiwiY2xpZW50SUQiOiI0MDI0M2JmMS1iN2EyLTRjZWItYTZhYi03ODQ4NjZmNzBjMGQiLCJjbGllbnRTZWNyZXQiOiJSVkRXTldvVGpEQ3VydXRVIiwib3duZXJOYW1lIjoiUmh5dGhtIiwib3duZXJFbWFpbCI6InJoeXRobWdhcmcwNUBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMTAwMjkwMTIwMTQxIn0.7CgdsT15jNx_jL3KIFncm9znKUBissNrqol0HPTAmpw";
      // const header = `Authorization: Bearer ${access_token}`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      try {
        const response = await axios.get(url);
        if (response.data.length !== 0) {
          setProducts(response.data);
        } else {
          setErrorMessage("No products found.");
        }
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          if (status === 500) {
            setErrorMessage("You are already subscribed!");
          } else {
            setErrorMessage('Something went wrong. Please try again later.');
          }
        } else {
          setErrorMessage('Something went wrong. Please try again later.');
        }
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {products.length > 0 ? (
        <ul>
          {products.map((product, index) => (
            <li key={index}>{JSON.stringify(product)}</li>
          ))}
        </ul>
      ) : (
        <p>No products to display.</p>
      )}
    </div>
  );
}

export default App;
