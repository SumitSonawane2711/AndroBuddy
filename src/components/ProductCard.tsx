import { useContext } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import { cartContext } from "@/context/cartContext";
import { toast } from "./ui/toast";

export const ProductCard = ({ product }: { product: any }) => {
  const context = useContext(cartContext);

  const handleAddToCart = (product: any) => {
    context?.addToCart(product);
    toast.add({
      title: "Product Added",
      description: "The product has been added to your cart.",
      type: "success",
    });
  };

  const cartProducts = context?.cartProducts || [];

  return (
    <Card className="mx-auto w-full max-w-sm overflow-hidden border bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Product Image */}
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain p-6 transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <CardContent className="space-y-3 p-4">
        <div>
          <p className="mb-1 text-xs font-medium uppercase text-gray-500">
            {product.category}
          </p>

          <CardTitle className="line-clamp-2 text-sm font-medium text-gray-900">
            {product.title}
          </CardTitle>
        </div>

        <div className="md:flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          <Button
            size="sm"
            className="cursor-pointer bg-yellow-400 font-semibold text-black hover:bg-yellow-500"
            onClick={() => handleAddToCart(product)}
          >
            {cartProducts.some((p) => p.id === product.id)
              ? "Added"
              : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
