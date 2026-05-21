import { Input } from "Components/Input";
import { useEffect, useState } from "react";
import queryString from 'query-string';

export const Filters = ({onSearch}) => {
  const [petFriendly, setPetFriendly] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    onSearch({
      petFriendly,
      hasParking,
      minPrice,
      maxPrice
    });
  };

  useEffect(() => {
    const {
      petFriendly: petFriendlyInitial, 
      hasParking: hasParkingInitial, 
      minPrice: minPriceInitial, 
      maxPrice: maxPriceInitial
    } = queryString.parse(window.location.search);

    setPetFriendly(petFriendlyInitial === "true"); 
    setHasParking(hasParkingInitial === "true");
    setMinPrice(minPriceInitial || "");
    setMaxPrice(maxPriceInitial || "");

  }, []);

  return (
    <div className="max-w-5xl mx-auto my-5 border-2 border-slate-400 rounded-md p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-end">
        <div>
          <span className="block text-sm font-semibold mb-2">Features</span>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" checked={hasParking} onChange={() => setHasParking(value => !value)} />
              <span>Has parking</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" checked={petFriendly} onChange={() => setPetFriendly(value => !value)} />
              <span>Pet friendly</span>
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="min-price"
            className="block text-sm font-semibold mb-2"
          >
            Min price
          </label>
          <Input
            id="min-price"
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="max-price"
            className="block text-sm font-semibold mb-2"
          >
            Max price
          </label>
          <Input
            id="max-price"
            type="number"
            placeholder="5000000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn"
          onClick={handleSearch}
          //className="bg-pink-500 hover:bg-pink-700 text-white font-bold rounded-md px-6 py-3 w-full md:w-auto"
        >
          Search
        </button>
      </div>
    </div>
  );
};