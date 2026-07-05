import OverViewProducts from '@/components/overView/overViewProducts';
import ProductsTable from '@/components/products/productsTable';

const ProductsPage = () => {
    return (
        <div className="w-full flex flex-col p-10 gap-10">
            <OverViewProducts />
           <ProductsTable/>

        </div>
    )
}

export default ProductsPage