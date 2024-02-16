import { Link, useNavigate } from "react-router-dom";
import { UserType, iProducts } from "../../../utils/types/type";
import clsx from "clsx";
import heart from "/svg/heart.svg";
import heartFilled from "/svg/heart-filled.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../../utils/requests/products/product";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const discountedPrice = (
  initialPrice: number,
  discountPrecentage: number
) => {
  const discountAmount = (initialPrice * discountPrecentage) / 100;
  const result = initialPrice - discountAmount;
  return result;
};

export default function Product({
  product,
  user,
  index,
  queryKey,
}: {
  product: iProducts;
  user: UserType | any;
  index?: number;
  queryKey: string[] | any;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState(
    product.likedBy.some((val) => val === user?._id)
  );

  useEffect(() => {
    setLiked(product.likedBy.some((val) => val === user?._id));
  }, [product]);

  const handleLikeProduct = async () => {
    const response = await updateProduct({
      slug: product.slug,
      data: !liked
        ? {
            $push: { likedBy: user._id },
          }
        : {
            $pull: { likedBy: user._id },
          },
      token: user.token,
    });
    return response.data.result;
  };

  const handleSuccessLike = (data: iProducts) => {
    queryClient.setQueryData(queryKey, (products: any[]) => {
      {
        const newProducts = [
          ...products.slice(0, index),
          data,
          ...products.slice((index as any) + 1),
        ];
        return newProducts;
      }
    });
    data.likedBy.some((val) => val === user?._id)
      ? toast.success("Added To Liked Products")
      : toast.info("Product Removed from Liked Products");
  };

  const useLikeMutate = useMutation({
    mutationFn: user ? handleLikeProduct : () => navigate("/auth/login") as any,
    onSuccess: user ? handleSuccessLike : () => {},
  });

  const convertedCurrency = (price: number) => {
    return price
      .toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })
      .split(",")[0];
  };

  const { mutate: mutateLike } = useLikeMutate;

  return (
    <Link
      to={`/products/${product.slug}`}
      className=" w-[48%] sm:w-[31.5%] md:w-[24%] lg:w-[18.5%] xl:w-1/6"
    >
      <div className="flex flex-col justify-between h-full border border-slate-200 py-2 px-3 rounded-md hover:shadow-md transition-all duration-300 ease-in-out">
        <div className="flex flex-col">
          <div className="aspect-square w-full rounded-sm">
            <img
              className="w-full h-full object-cover rounded-sm"
              src={product.images[0].url}
              alt=""
            />
          </div>
          <div className="py-2 mt-6">
            <h1 className="text-sm lg:text-base font-medium">{product.name}</h1>
            <div className="mt-2">
              <h3
                style={{ textDecoration: "line-through" }}
                className={clsx(
                  "text-xs lg:text-sm relative text-neutral-600",
                  product.discount <= 0 && "hidden"
                )}
              >
                {convertedCurrency(product.price)}{" "}
              </h3>
              <div className="flex text-sm md:text-base font-semibold items-center">
                <h2>
                  {product.discount > 0
                    ? discountedPrice(product.price, product.discount)
                        .toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                        .split(",")[0]
                    : convertedCurrency(product.price)}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 ">
          <img
            src={liked ? heartFilled : heart}
            className="w-7 sm:max-md:w-7 py-2 px-1"
            onClick={(e) => {
              e.preventDefault();
              mutateLike();
            }}
          />
        </div>
      </div>
    </Link>
  );
}
