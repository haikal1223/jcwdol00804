import React from 'react'
import { AiFillFacebook, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai"
const Footer = () => {
    return (
        <div className="bg-[#839e6a] py-5">
            <div className="mx-auto text-center">
                <div className="flex justify-evenly">
                    <div className="text-white">
                        <div className="text-xs font-bold mb-2">
                            Contact Us
                        </div>
                        <p className="text-xs font-light mb-1">
                            WhatsApp
                        </p>
                        <p className="text-xs font-light mb-1">
                            0812 1349 6549
                        </p>
                    </div>
                    <div className="text-white">
                        <div className="text-xs font-bold mb-2">
                            Operational Hours
                        </div>
                        <p className="text-xs font-light mb-1">
                            Monday - Friday
                        </p>
                        <p className="text-xs font-light mb-1">
                            07.00 - 22.00
                        </p>
                        <p className="text-xs font-light mb-1">
                            Saturday - Sunday
                        </p>
                        <p className="text-xs font-light mb-1">
                            07.00 - 20.00
                        </p>
                    </div>
                    <div className="text-white">
                        <div className="text-xs font-bold mb-2">
                            Follow Us
                        </div>
                        <a href="https://www.purwadhika.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-row text-xs font-light mb-1 hover:text-[#86C649]">
                            <AiFillFacebook size={15} className="mr-1" />
                            Facebook
                        </a>
                        <a href="https://www.purwadhika.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-row text-xs font-light mb-1 hover:text-[#86C649]">
                            <AiFillTwitterCircle size={15} className="mr-1" />
                            Twitter
                        </a>
                        <a href="https://www.purwadhika.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-row text-xs font-light mb-1 hover:text-[#86C649]">
                            <AiFillYoutube size={15} className="mr-1" />
                            Youtube
                        </a>
                    </div>
                </div>
                <div className="text-white text-sm font-semibold my-5">
                    &copy; 2023 Xmart. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer;

        // <div className="flex flex-row justify-between px-5 py-2">
        //     <div class="container mx-auto px-4">
        //         <div class="flex flex-wrap justify-between items-center">
        //             <div class="text-gray-500 text-sm">
        //                 &copy; 2023 Xmart. All rights reserved.
        //             </div>
        //             <div class="text-gray-500 text-sm">
        //                 <a href="https://www.purwadhika.com/"
        //                     target="_blank"
        //                     rel="noreferrer"
        //                     class="hover:text-gray-300 mr-4">
        //                     Purwadhika
        //                 </a>
        //                 <a href="https://linktr.ee/group4_"
        //                     target="_blank"
        //                     rel="noreferrer"
        //                     class="hover:text-gray-300">
        //                     Contact Us
        //                 </a>
        //             </div>
        //         </div>
        //     </div>
        // </div>