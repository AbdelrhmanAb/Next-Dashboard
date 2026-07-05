import CategoryCart from "@/components/charts/categoryCart/categoryCart";
import OrderStatusCart from "@/components/charts/orderStatusCart/orderStatusCart";
import ProductPerformance from "@/components/charts/productsPerformanceCarts/productsPerformanceCart";
import SalesChart from "@/components/charts/salesCart/salescart";
import OverViewProducts from "@/components/overView/overViewProducts";

export default function Home() {
  return (
    <div className="w-full flex flex-col p-5 gap-5">
     <OverViewProducts/>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
      <SalesChart/>
      <CategoryCart/>
      <OrderStatusCart/>
      <ProductPerformance/>
     </div>
      
     
    </div>
  );
}
