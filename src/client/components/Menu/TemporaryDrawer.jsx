import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';

import { openMenu, closeMenu } from '../../store/actions/menuActions';

import styles from './TemporaryDrawer.css';

export const TemporaryDrawer = (props) => {
    const sideList = (
        <List className={styles.container}>
            <NavLink
                className={styles.item}
                to="/plans">
                Планы
            </NavLink>
          <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/air-unit">
                Приточка
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/dampers">
                Заслонки
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/boiler">
                Бойлер
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/heat-station">
                Котельная
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/hf">
                Теплый пол
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/so">
                Радиаторы
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/consumption">
                Потребление
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/chart">
                Тренд
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/consumption-chart">
                Э/энергия
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/gates">
                Ворота/Калитка
            </NavLink>
            <Divider variant="inset" />
            <NavLink
                className={styles.item}
                to="/lights">
                Свет
            </NavLink>
            <Divider variant="inset" />
        </List>
    );
    return (
        <div>
            <Drawer open={props.menu.isMenuOpen} onClose={props.closeMenu}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={props.closeMenu}
                    onKeyDown={props.closeMenu}
                >
                    {sideList}
                </div>
            </Drawer>
        </div>
    );
};

const mapStateToProps = (store) => {
    return {
        menu: store.menu,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openMenu: openMenu,
        closeMenu: closeMenu,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);
