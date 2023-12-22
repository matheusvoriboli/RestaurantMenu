"use client";

type HeaderProps = {
  title: string;
};

const Header = ({title}: HeaderProps) => {
  // const [headerBackgroundColor, setHeaderBackgroundColor] = useState<string>();
  // const response = useAppSelector((state) => state.restaurant.value);
  // useEffect(() => {
  //   setHeaderBackgroundColor(response?.webSettings?.navBackgroundColour);
  // }, [response]);

  return (
    <div className="nav-bg text-white flex justify-center items-center py-6 px-12">{title}</div>
  );
};

export default Header;
