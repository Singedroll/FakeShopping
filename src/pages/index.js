import Link from "next/link";
import useSWR from "swr";
import { useQueryState } from "nuqs";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Page = () => {
  const url = `https://fakestoreapi.com/products/`;
  const [search] = useQueryState("search");
  const { data: products = {}, error, isLoading } = useSWR(url, fetcher);

  if (isLoading) {
    return <p>...loading</p>;
  }

  if (error) {
    return <p>...oh sorry error</p>;
  }

  const filteredProducts = products.filter((product) => {
    if (!search) return true;
    return product.category.toLowerCase().includes(search?.toLowerCase());
  });

  return (
    <div>
      <div className="mx-auto w-[1500px]">
        <div className="grid grid-cols-3 mt-20 gap-10 bg-base-100 shadow-xl cursor-pointer card ">
          {filteredProducts.map((blog) => {
            return (
              <Link key={blog.id} href={`products/${blog.id}`}>
                <Home
                  image={blog.image}
                  title={blog.title}
                  category={blog.category}
                  price={blog.price}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Page;
const Home = (props) => {
  const { image, title, text, category, price } = props;
  return (
    <div className="card bg-base-100 w-[100%] h-[500px] shadow-xl place-items-center">
      <figure>
        <Image alt="image" src={image} width={493} height={344} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{category}</div>
          <div className="badge badge-outline">{price}</div>
        </div>
      </div>
    </div>
  );
};
