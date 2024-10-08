import Link from "next/link";
import useSWR from "swr";

import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Card = () => {
  const router = useRouter();
  const { category } = router.query;

  const url = `https://fakestoreapi.com/products/category/${category}`;
  const { data: products, error, isLoading } = useSWR(url, fetcher);

  if (error) return null;

  if (isLoading) return null;

  return (
    <div className="mx-auto w-[1500px]">
      <div className="grid grid-cols-3 mt-20 gap-10 bg-base-100 shadow-xl cursor-pointer card ">
        {products.map((blog) => {
          return (
            <Link href={`products/${blog.id}`}>
              <Home
                // seSelectedTag={seSelectedTag}
                key={blog.id}
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
  );
};
export default Card;

const Home = (props) => {
  const { image, title, text, category, price } = props;
  return (
    <div className="card bg-base-100 w-[100%] h-[500px] shadow-xl place-items-center">
      <figure>
        <img src={image} />
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
