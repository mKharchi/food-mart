import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { Link, NavLink } from "react-router";

const Footer = () => {
    const links = [{

        icon: (<FaGithub width={20} height={20} />),
        link: "https://github.com/mKharchi",
    }, {

        icon: (<FaLinkedin width={20} height={20} />),
        link: "https://www.linkedin.com/in/kharchi-merouane-32080a30b/",
    }, {

        icon: (<FaWhatsapp width={20} height={20} />),
        link: "http://wa.me/+213795736069",
    },]
    return (
        <footer className="bg-[#233000] text-gray-200 py-6  px-8 2xl:px-32 ">
            <div className=" gap-6 2xl:gap-12 mx-auto flex flex-col  items-center justify-between 2xl:px-4">
                <div className="flex items-center justify-between w-full">
                    <img src="/Logo.png" className="w-24 2xl:w-36 h-8 2xl:h-14" />
                    <div className="flex  items-center justify-end gap-2 ">
                        {
                            links.map((el, index) => {
                                return (
                                    <a
                                        key={index}
                                        href={el.link}
                                        className="p-2 rounded-md border border-foreground transform duration-200 hover:rotate-360"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {el.icon}
                                    </a>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="grid w-full grid-cols-1 2xl:grid-cols-3 justify-items-end ">
                    <div className="w-full hidden 2xl:flex flex-col items-start justify-start gap-4">
                        <h1>Explore</h1>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About Us</NavLink>
                        <NavLink to="/contact">Contact Us</NavLink>

                    </div>
                    <div className="w-full hidden 2xl:flex flex-col items-start justify-start gap-4">
                        <h1>Utility Pages</h1>
                        <p>Privacy Policy </p>
                        <p>Terms of Use</p>

                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-4">
                        <h1>Keep in Touch</h1>
                        <p>Address :
                            Mariendalsvej 50D 2 2000 Frederiksberg.

                        </p>
                        <p>Mail :
                            support@servicemarket.com</p>
                        <p>Phone :
                            (+22) 123 - 4567 - 900</p>
                        <p></p>
                    </div>

                </div>
                <div className="flex items-center justify-center w-full">
                        <p className="text-center ">Copyright 2023, @ServiceMarket.dk | All rights reserved.</p>

                </div>
            </div>
        </footer>
    );
}

export default Footer;