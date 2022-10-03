import React, {useRef} from 'react';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import SearchToggle from '../search/search_toggle/SearchToggle';
import SideBarItemsManager from './SideBarItemsManager';
import './SideBar.css'

const SideBar = () => {

    const sideContainerRef = useRef<HTMLElement>(null)

    const collapseSideBar = () => {
        const sideBarButton = document.querySelector<Element>('#side-collapse-icon')
        const sideBarNavContent = document.querySelectorAll<Element>('.side-image--text-wrapper > a > span')

        if (sideContainerRef.current != null) {
            sideContainerRef.current.classList.toggle('active-sidebar-layout')
        }

        if (sideBarButton != null) {
            sideBarButton.classList.toggle('active-sidebar-button-icon')
        }

        if (sideBarNavContent != null) {
            sideBarNavContent.forEach(cr => {
                /* The content is collapse - show it again */
                if (cr.classList.contains('active-sidebar--collapse-text')) {
                    setTimeout(() => {
                        cr.setAttribute('style', 'display: block');

                        /* Display the text with a transition delay */
                        setTimeout(() => {
                            cr.classList.toggle('active-sidebar--collapse-text')
                        }, 150)
                    }, 150)

                    /* The content isn't collapsed - collapse it */
                } else {
                    cr.classList.toggle('active-sidebar--collapse-text')

                    setTimeout(() => {
                        cr.setAttribute('style', 'display: none');
                    }, 150)
                }
            })
        }
    }

    return (
        <aside ref={sideContainerRef} id='side-container'>
            <button id='side-collapse-button' onClick={collapseSideBar}>
                <KeyboardArrowLeftRoundedIcon id='side-collapse-icon'/>
            </button>

            <div id='side-content-container'>
                <nav className='side-content-nav'>
                    <SideBarItemsManager startIndex={0} endIndex={6}/>
                </nav>

                <nav className='side-content-nav'>
                    <SearchToggle/>

                    <SideBarItemsManager startIndex={6} endIndex={8}/>
                </nav>
            </div>
        </aside>
    );
};

export default SideBar;