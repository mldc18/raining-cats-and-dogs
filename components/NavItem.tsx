type NavItemProps = {
  category: string;
  className: string;
  currentCategory: string;
  navTitle: string;
  toolTipVisibility?: string;
  onClick: () => void;
};

const NavItem = (props: NavItemProps) => {
  const {
    category,
    className,
    currentCategory,
    navTitle,
    toolTipVisibility,
    onClick,
  } = props;

  const toolTip = category != "cats and dogs" && (
    <div
      className={`absolute animate-pulse 
      text-xs lg:text-sm text-white tracking-normal 
      -top-12 lg:-top-10 right-0 rounded-lg
      ${className} ${toolTipVisibility} p-2`}
    >
      {category}
      {" only!"}
    </div>
  );

  return (
    <button
      className={`cursor-pointer mx-2 relative ${
        currentCategory == category &&
        `${className} text-zinc-100 rounded-lg p-3`
      }`}
      disabled={currentCategory == category}
      onClick={onClick}
    >
      {toolTip}
      {navTitle}
    </button>
  );
};

export default NavItem;
