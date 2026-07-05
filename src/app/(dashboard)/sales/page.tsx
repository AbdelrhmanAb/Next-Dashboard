import CategoryCart from '@/components/charts/categoryCart/categoryCart';
import SalesChart from '@/components/charts/salesCart/salescart';
import OverViewSales from '@/components/overView/overViewSales';
import React from 'react'

const SalesPage = () => {
    return (
        <div className="w-full flex flex-col p-10 gap-10">
            <OverViewSales />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
                <SalesChart />
                <CategoryCart />
            </div>
        </div>
    )
}

export default SalesPage