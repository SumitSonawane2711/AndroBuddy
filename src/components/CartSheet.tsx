import cart from "@/assets/cart.svg";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cartContext } from "@/context/cartContext";
import { X } from "lucide-react";
import { useContext } from "react";

export function SheetDemo() {
  const context = useContext(cartContext);

  const cartCount = context?.cartProducts.length || 0; // Use the length of cartProducts from context

  const handleRemoveFromCart = (productId: number) => {
    context?.removeFromCart(productId);
  };

  const handleIncreaseQuantity = (productId: number) => {
    context?.increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId: number) => {
    context?.decreaseQuantity(productId);
  };

  const products = context?.cartProducts || [];
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button className="flex cursor-pointer flex-col items-center gap-1">
            <div className="relative w-full">
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
              <img src={cart} width="30" height="30" alt="Shopping Cart" />
              <span className="text-sm">Cart</span>
            </div>
          </Button>
        }
      />
      <SheetContent className="bg-gray-200 overflow-auto">
        <SheetHeader className="bg-white ">
          <SheetTitle>Your Cart </SheetTitle>
        </SheetHeader>
        {cartCount > 0 ? (
          <div className="flex flex-col gap-2 p-4">
            <p className="text-gray-500">
              You have {cartCount} items in your cart.
            </p>
            <div>
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="relative border-2 border-slate-50 p-2 rounded-lg m-5 flex items-center bg-gray-50 gap-2"
                >
                  <Button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="absolute top-0 right-0 cursor-pointer "
                  >
                    <X size={16} />
                  </Button>
                  <img
                    src={product.image}
                    width="70"
                    height="70"
                    alt={product.name}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500">{product.title}</p>
                    <p className="text-gray-500">${product.price}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">
                        Quantity: {product.quantity}
                      </span>
                      <Button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="ml-2 border-2 border-gray-300 rounded px-2 py-1 text-gray-500 hover:bg-gray-100"
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="border-2 border-gray-300 rounded px-2 py-1 text-gray-500 hover:bg-gray-100"
                      >
                        -
                      </Button>
                    </div>
                    <h2 className="text-gray-500">
                      Total: ${(product.price * product.quantity).toFixed(2)}
                    </h2>

                    <Button className="bg-black my-2 text-white py-2 px-6 hover:bg-gray-800">
                      Checkout
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-2 border-slate-50 p-2 rounded-lg m-5 flex flex-col items-center bg-gray-50 gap-2">
            <img src={cart} width="130" height="130" alt="Shopping Cart" />
            <p className="text-gray-500">Your cart is empty</p>
            <a href="/" className="bg-black rounded text-white py-2 px-6">
              Browse Products
            </a>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
