import './header.css';
import {Link} from 'react-router-dom';

function Header (){
    return(
        <header>
            <Link className='Logo' to='/'>PrimeFlix</Link>
            <Link className='favoritos' to='/favoritos'>Meus Filmes</Link>
        </header>

    )

}

export default Header;