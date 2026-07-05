import OrdersTable from "@/components/orders/ordersTable";
import OverViewOrders from "@/components/overView/overViewOrders";

const OrdersPage = () => {
    return (
        <div className="w-full flex flex-col p-10 gap-10">
            <OverViewOrders />
            <OrdersTable/>

        </div>
    )
}

export default OrdersPage