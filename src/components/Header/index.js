import React from 'react';
import { Link } from 'react-router-dom';

import RMDBLogo from '../../images/react-movie-logo.svg';

import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, TMDBLogoImg } from './Header.styles';


const Header = () => (
    <Wrapper>
        <Content>
            {/* Link component will help us to redirect to the specified route or component, in this  */}
            {/* Inside the link component we put our logo, so when we click the logo it will redirect us to that path */}
            <Link to='/'>
                <LogoImg src={RMDBLogo} alt='rmdb-logo' />
            </Link>
            <TMDBLogoImg src={TMDBLogo} alt='tmdb-logo' />
        </Content>
    </Wrapper>
);

// Default export, we just have to import it with the name
export default Header;