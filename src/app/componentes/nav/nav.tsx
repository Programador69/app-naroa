import Image from 'next/image';
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";

export function Nav() {
    return (
        <nav>
            <div className='logo'>
                <Image src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzAwMCIgc3Ryb2tlPSIjZDRhZjM3IiBzdHJva2Utd2lkdGg9IjIiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZDRhZjM3IiBmb250LWZhbWlseT0iUGxheWZhaXIgRGlzcGxheSwgc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI2MDAiPk48L3RleHQ+Cjwvc3ZnPgo=" alt="NAROA Logo" width={100} height={100}/>
                <span className="logo-text">NAROA</span>
            </div>

            <div className='nav-links'>
                <a href="https://wa.me/529581248628?text=Hola%20quisiera%20saber%20más%20acerca%20de%20la%20tienda." target="_BLANK" className="wats">
                    <FaWhatsapp className='boxIcon'/> WhatsApp
                </a>
                <a href="https://www.instagram.com/__naroa___/" target="_BLANK"><FaInstagram className='boxIcon'/> Instagram</a>
            </div>
	    </nav>
    )
}