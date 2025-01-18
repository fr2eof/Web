import React from "react";
import "../style/component/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <nav>
                    <ul className="footer-links">
                        {}
                        <li><a href="/about">О нас</a></li>
                        <li><a href="/contact">Контакты</a></li>
                        <li><a href="/privacy">Политика конфиденциальности</a></li>
                    </ul>
                </nav>
                <p className="footer-copyright">
                    &copy; 2025 ЗАО "бещёки". Все права защищены.
                </p>
            </div>
        </footer>
    );
};

export default Footer;