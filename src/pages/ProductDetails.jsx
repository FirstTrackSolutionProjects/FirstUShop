import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Product Details #{id}</h1>
      <p className="text-gray-600 mt-4">Full product info here…</p>
    </div>
  );
}
