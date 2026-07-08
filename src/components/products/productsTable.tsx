'use client'

import { productsList } from "@/data/products";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import TableBody from "./tableBody";
import React, { ChangeEvent, useMemo, useState } from "react";

const ProductsTable = () => {

    const [searchValue, setSearchValue] = useState<string>('')

    const [products, setProducts] = React.useState(productsList)


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchValue(value)

    }

    const filteredProducts = useMemo(() => {

        const value = searchValue.toLowerCase()

        return products.filter((pro) =>
            pro.name.toLowerCase().includes(value) ||
            pro.category.toLowerCase().includes(value)
        )

    }, [products, searchValue])

    return (
        <div className="w-full flex flex-col p-5 gap-5 bg-[#1e1e1e] ">

            <div className="flex items-center justify-between text-slate-200 ">
                <h5 className="text-xl font-semibold">Products List</h5>
                <div className="relative ">
                    <span className="absolute left-2 top-2 text-xl border-r pr-1">
                        <IoSearch />
                    </span>
                    <input
                        value={searchValue}
                        onChange={(e) => handleSearch(e)}
                        type="text"
                        className='outline-none border-none bg-slate-600/30 font-light  rounded-2xl pl-10 py-2'
                        placeholder='Search Products..'
                    />
                </div>
                <button
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg active:scale-95"
                >
                    + Add User
                </button>            </div>

            <div className="overflow-x-auto rounded-2xl bg-[#1e1e1e] p-4">

                <table className="w-full border-collapse">

                    <thead className="border-b border-gray-700 text-gray-400">

                        <tr>

                            <th className="px-4 py-4 text-left text-sm font-light tracking-wider">
                                Name
                            </th>

                            <th className="px-4 py-4 text-left text-sm font-light tracking-wider">
                                Product ID
                            </th>

                            <th className="px-4 py-4 text-left text-sm font-light tracking-wider">
                                Category
                            </th>

                            <th className="px-4 py-4 text-left text-sm font-light tracking-wider">
                                Price
                            </th>

                            <th className="px-4 py-4 text-left text-sm font-light tracking-wider">
                                Stock
                            </th>

                            <th className="px-4 py-4 text-left text-sm font-light tracking-wider">
                                Sales
                            </th>

                            <th className="px-4 py-4 text-left text-sm font-light tracking-wider">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <TableBody products={filteredProducts} setProducts={setProducts} />
                </table>

            </div>
        </div>
    )
}

export default ProductsTable