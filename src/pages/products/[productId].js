import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Page = () => {
  const router = useRouter();
  const query = router.query.productId;
  const url = `https://fakestoreapi.com/products/${query}`;

  const { data, isLoading } = useSWR(url, fetcher);

  if (isLoading) return null;

  return (
    <div>
      <Slide
        image={data.image}
        title={data.title}
        text={data.description}
        price={data.price}
        rating={data.rating.count}
      />
    </div>
  );
};

export default Page;

const Slide = (props) => {
  const { image, title, text, price, rating } = props;
  return (
    <div
      className="card lg:card-side bg-base-100 shadow-xl flex
    "
    >
      <figure className="flex-1 py-10 mx-[200px] ">
        <img src={image} />
      </figure>
      <div className="card-body flex-1 py-8 bg-gray-100">
        <h2 className="card-title ">{title}</h2>
        <p className="tetx-base w-[516px]">{text}</p>
        <div className="card-actions justify-end">
          <div className="flex felx-col">
            <div className=" flex gap-5 w-[580px]">
              <p>${price}</p>
              <div>
                <p className="ml-auto">ratings:{rating}</p>
              </div>
            </div>
          </div>
          <button className="btn btn-primary mt-4">Add card</button>
        </div>
      </div>
    </div>
  );
};
