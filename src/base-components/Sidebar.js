import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

const StyledSideNav = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 100%;
    width: 75px;     /* Set the width of the sidebar */
    z-index: 1;      /*  Stay on top of everything */
    top: 5.1em;      /* Stay at the top */
    background-color: #444; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
`;


class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            items: [
                {
                    path: '/',
                    name: 'Funny',
                    css: 'fas fa-laugh-squint',
                    key: 1
                },
                {
                    path: '/cat',
                    name: 'Cat',
                    css: 'fas fa-cat',
                    key: 2
                },
                {
                    path: '/dog',
                    name: 'Dog',
                    css: 'fas fa-dog',
                    key: 3
                },
                {
                    path: '/yesorno',
                    name: 'YesOrNo',
                    css: 'fas fa-balance-scale',
                    key: 4
                },
                {
                    path: '/submissions',
                    name: 'User Submissions',
                    css: 'fas fa-user',
                    key: 5
                },
                {
                    path: '/hot',
                    name: 'Hot',
                    css: 'fas fa-fire',
                    key: 6
                },
                {
                    path: '/cold',
                    name: 'Cold',
                    css: 'fas fa-snowflake',
                    key: 7
                },
                {
                    path: '/favorite',
                    name: 'Favorite',
                    css: 'fas fa-thumbs-up',
                    key: 8
                }

            ]
        }
    }

    onItemClick = (path) => {
        this.setState({ activePath: path });
    }

    render() {
        const { items, activePath } = this.state;
        return (
            <StyledSideNav>
                {
                    items.map((item) => {
                        return (
                            <NavItem
                                path={item.path}
                                name={item.name}
                                css={item.css}
                                onItemClick={this.onItemClick}
                                active={item.path === activePath}
                                key={item.key}
                            />
                        );
                    })
                }
            </StyledSideNav>
        );
    }
}

const RouterSideNav = withRouter(SideNav);

const StyledNavItem = styled.div`
    height: 70px;
    width: 75px; /* width must be same size as NavBar to center */
    text-align: center; /* Aligns <a> inside of NavIcon div */
    margin-bottom: 0;   /* Puts space between NavItems */
    a {
        font-size: 2.7em;
        color: ${(props) => props.active ? "grey" : "white"};
        :hover {
            opacity: 0.7;
            text-decoration: none; /* Gets rid of underlining of icons */
        }  
    }
`;

class NavItem extends React.Component {
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        const { active } = this.props;
        return (
            <StyledNavItem active={active}>
                <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
                    <NavIcon></NavIcon>
                </Link>
            </StyledNavItem>
        );
    }
}

const NavIcon = styled.div`
`;

export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav></RouterSideNav>
        );
    }
}