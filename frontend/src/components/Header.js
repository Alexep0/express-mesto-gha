import logo from '../images/logo-header.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта Место."></img>
        </header>
    )
}

export default Header;