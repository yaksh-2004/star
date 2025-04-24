'use client'

import { useCart } from "../context/CartContext"
export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 items-center border p-4 rounded">
              <img src={item.image} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>${item.price}</p>
                <div className="flex items-center mt-2 gap-2">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500">
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-bold">Total: ${subtotal.toFixed(2)}</div>
        </div>
      )}
    </div>
  )
}

