import Image from "next/image";

import Not404Pic from '../../public/images/glitch-error-404-page_23-2148105404.jpg'
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function NotFound() {

    return (
        <div className=" flex flex-col items-center ">
            <div className="relative h-115 w-9/12 overflow-hidden">
                <Image
                    src={Not404Pic}
                    alt=""
                    // width={2000}
                    height={700}
                    className="object-contain w-full"
                    // fill

                />
            </div>
            
                <Link 
                href={'/'}
                className="px-4 py-2 text-2xl flex items-center gap-2 bg-white text-black rounded-3xl font-semibold shadow shadow-gray-200 hover:bg-black hover:text-white transition duration-300 mt-8"
                >
                    back to home <BsArrowRight/></Link>
            
        </div>
    )


}
