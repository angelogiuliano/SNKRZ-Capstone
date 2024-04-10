import { TrendingProducts } from "../TrendingProducts/TrendingProducts";

export const Main = () => {
  return (
    <>
    <div className="trending">
      <h1 className="mx-4">Trending</h1>
      <TrendingProducts shuffleArray={false} limit={10}/>
    </div>

    <div className="main-cont mt-5">
      <h1 className="mx-4">Check our new products</h1>
      <TrendingProducts shuffleArray={true} limit={50}/>
    </div>
    </>
  );
};
