
// Returns a className function for NavLink, adding activeClass on the current page
const getNavLinkClass = (baseClass, activeClass) => ({ isActive }) =>
    isActive ? `${baseClass} ${activeClass}` : baseClass;

export default getNavLinkClass;