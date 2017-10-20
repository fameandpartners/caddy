import AppConstants from '../constants/AppConstants';

export function activateSideMenu({ sideMenuOpen }) {
  return {
    type: AppConstants.ACTIVATE_SIDE_MENU,
    sideMenuOpen,
  };
}

export default {
  activateSideMenu,
};
