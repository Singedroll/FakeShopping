import { useState } from "react";
import useSWR from "swr";
import { Img } from "./Img";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQueryState } from "nuqs";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Navbar = () => {
  const [plus, setPlus] = useQueryState([]);
  const [search, setSearch] = useQueryState("search");
  const url = `https://fakestoreapi.com/products/categories`;

  const { data: categories, isLoading } = useSWR(url, fetcher);

  if (isLoading) return null;

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex items-center p-10">
      <Link href={`/`}>
        <h1 className="px-4 py-2 text-xl font-bold cursor-pointer">Store</h1>
      </Link>
      {categories.map((category, index) => {
        return (
          <Link key={index} href={`/${category}`}>
            <div className=" bg-base-100 flex ml-5">{category}</div>
          </Link>
        );
      })}
      <label className="input input-bordered flex items-center gap-2 ml-auto">
        <input
          value={search}
          onChange={handleChange}
          type="text"
          className="grow"
          placeholder="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <button className="ml-2">
        <Img />
      </button>
    </div>
  );
};
