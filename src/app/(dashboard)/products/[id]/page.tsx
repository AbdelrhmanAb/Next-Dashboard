

import BackButtonLink from "@/components/products/backButtonLink";
import { getProduct } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

interface Props {
    params: Promise<{ id: string }>;
}

const SingleProductPage = async ({ params }: Props) => {
    const { id } = await params;

    const product = getProduct(Number(id));

    if (!product) return notFound();

    return (
        <div className="container mx-auto py-10">
            <div className="grid lg:grid-cols-2 gap-12">

                {/* Image Section */}
                <div className="bg-[#171717] rounded-2xl px-2  shadow">
                    <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-130 object-contain"
                    />
                </div>

                {/* Content Section */}
                <div>
                    <div className="flex items-center justify-between w-full px-5">
                        <span className="text-blue-600 font-medium">
                            {product.category}
                        </span>
                            <BackButtonLink />

                    </div>

                    <h1 className="text-5xl font-bold mt-3">
                        {product.name}
                    </h1>

                    <p className="text-zinc-500 mt-4">
                        Product Code: {product.productId}
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                        <span className="text-4xl font-bold">
                            ${product.price}
                        </span>

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            In Stock ({product.stock})
                        </span>
                    </div>

                    <p className="mt-8 text-zinc-600 leading-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam perferendis exercitationem distinctio.
                    </p>

                    <div className="flex gap-4 mt-10">
                        <button className="px-8 py-4 bg-black text-white rounded-xl border-none  hover:bg-white hover:text-black transition  duration-300">
                            Add To Cart
                        </button>

                        <button className="px-8 py-4 border rounded-xl  hover:bg-white hover:text-black transition  duration-300">
                            Buy Now
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-12">
                        <div className="border rounded-xl p-4">
                            <h3 className="font-semibold">Sales</h3>
                            <p>{product.sales}</p>
                        </div>

                        <div className="border rounded-xl p-4">
                            <h3 className="font-semibold">Stock</h3>
                            <p>{product.stock}</p>
                        </div>

                        <div className="border rounded-xl p-4">
                            <h3 className="font-semibold">Category</h3>
                            <p>{product.category}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SingleProductPage;