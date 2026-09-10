import { createContext, useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartProduct extends Product {
  quantity: number;
}

interface CartContextType {
  cartProducts: CartProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

export const cartContext = createContext<CartContextType | undefined>(
  undefined!,
);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>(() => {
    const storedCart = localStorage.getItem("cartProducts");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addToCart = (product: Product) => {
    setCartProducts((prevProducts) => {
      const existingProduct = prevProducts.find((p) => p.id === product.id);

      if (existingProduct) {
        return prevProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prevProducts, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
  };

  const increaseQuantity = (productId: number) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity - 1) }
          : product,
      ),
    );
  };

  return (
    <cartContext.Provider
      value={{
        cartProducts,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default ContextProvider;
