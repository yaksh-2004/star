import Link from "next/link";


export default function OrderConfirmedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-3xl font-bold text-green-600"> Order Confirmed!</h1>
      <p className="mt-4 text-lg">Thank you for your purchase. Your order has been placed successfully.</p> 

       <Link href="/">
       <div className="mt-5 text-lg font-semibold text-blue-500 hover:underline">
       Home Page
       </div>
      
       </Link>
    </div>
  );
}
