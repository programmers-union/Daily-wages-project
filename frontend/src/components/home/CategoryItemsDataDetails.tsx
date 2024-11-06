import React from "react";
import Map from "./Map";
import CategoryRelatedItems from "./CategoryRelatedItems";
import ItemsDetails from "../common/ItemsDetails";

const CategoryItemsDataDetails: React.FC = () => {
  return (
    <div className="py-20 ">
      <div className=" flex">
        <div className="w-3/4 px-6 border-r border-gray-300 ">
        <div className="mb-4">
        <h1 className="text-lg font-semibold ">Category Details </h1>
        <p className="text-sm font-normal pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum libero iure velit voluptatem, dolorum molestias! Dolores eligendi rem laborum itaque doloremque porro perferendis expedita ullam.</p>
        </div>
        <ItemsDetails />
          <Map />
        </div>
        <div className="px-4">
            <h1 className="text-lg font-semibold">Related Categories</h1>
            <CategoryRelatedItems />
        </div>
      </div>
    </div>
  );
};

export default CategoryItemsDataDetails;
