import getPhotos from "../libs/getPhotos";
import NavItem from "../components/NavItem";
import ImageGallery from "../components/ImageGallery";
import tooltip from "../hooks/tooltip";
import { useEffect, useRef, useState } from "react";

type HomeProps = {
  photos: Array<any>;
};

const Home = (props: HomeProps) => {
  const { photos } = props;
  const [currentPhotos, setCurrentPhotos] = useState(photos);
  const [currentCategory, setCurrentCategory] = useState("cats and dogs");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const topRef = useRef<HTMLInputElement>(null);
  const {
    tooltip1Visible,
    tooltip2Visible,
    setTooltip1Visible,
    setTooltip2Visible,
  } = tooltip();

  useEffect(() => {
    topRef.current!.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentCategory]);

  async function handleScroll(e: React.UIEvent<HTMLElement>) {
    const bottom =
      (e.target as HTMLInputElement).scrollHeight -
        (e.target as HTMLInputElement).scrollTop ===
      (e.target as HTMLInputElement).clientHeight;
    if (bottom) {
      const getNewPhotos = await getPhotos(
        currentPageNumber + 1,
        currentCategory
      );
      setCurrentPageNumber((prevState) => prevState + 1);
      setCurrentPhotos([...currentPhotos, ...getNewPhotos]);
    }
  }

  async function handleClickCats() {
    setCurrentPageNumber(1);
    const getNewPhotos = await getPhotos(currentPageNumber, "cats");
    setCurrentPhotos(getNewPhotos);
    setCurrentCategory("cats");
    setTooltip1Visible("hidden");
  }

  async function handleClickDogs() {
    setCurrentPageNumber(1);
    const getNewPhotos = await getPhotos(currentPageNumber, "dogs");
    setCurrentPhotos(getNewPhotos);
    setCurrentCategory("dogs");
    setTooltip2Visible("hidden");
  }

  async function handleClickBoth() {
    setCurrentPageNumber(1);
    const getNewPhotos = await getPhotos(currentPageNumber, "cats and dogs");
    setCurrentPhotos(getNewPhotos);
    setCurrentCategory("cats and dogs");
  }

  return (
    <div
      className="overflow-y-auto h-screen relative z-[90]"
      onScroll={handleScroll}
      ref={topRef}
    >
      <div
        className="fixed flex justify-center items-center navbar 
                  left-0 right-0 text-3xl sm:text-5xl lg:text-6xl 
                  text-center font-Rubik tracking-tighter my-20 z-10 px-5"
      >
        <div className="mx-2">raining</div>
        <NavItem
          category="cats"
          className={`bg-sky-500`}
          currentCategory={currentCategory}
          navTitle="cats"
          toolTipVisibility={tooltip1Visible}
          onClick={handleClickCats}
        />
        <NavItem
          category="cats and dogs"
          className="bg-amber-400"
          currentCategory={currentCategory}
          navTitle="&"
          onClick={handleClickBoth}
        />
        <NavItem
          category="dogs"
          className={`bg-red-500`}
          currentCategory={currentCategory}
          navTitle="dogs"
          toolTipVisibility={tooltip2Visible}
          onClick={handleClickDogs}
        />
      </div>

      <ImageGallery photos={currentPhotos} />
    </div>
  );
};

export async function getStaticProps() {
  const photos = await getPhotos(1);

  return { props: { photos } };
}

export default Home;
