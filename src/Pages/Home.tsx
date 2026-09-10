import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { Navbar } from "../components/Navbar";

export const Home = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("categories", categories);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories",
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  console.log("categories", categories);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productsByCategory = async (category: string) => {
    setLoading(true);
    try {
      if (category === "All") {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        return;
      }
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`,
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <header className="flex flex-row flex-wrap text-sm text-gray-600 items-center w-full justify-start p-2 gap-4 border-b-2 border-gray-300">
        {["All", ...categories].map((item) => (
          <span
            key={item}
            onClick={() => productsByCategory(item)}
            className=" underline cursor-pointer font-semibold hover:text-blue-500"
          >
            {item}
          </span>
        ))}
      </header>
      <section id="products" className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : products && products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </>
  );
};
