import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Filters } from "./Filters";

export const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 3;
  const router = useRouter();

  const buildQueryParams = ({
    page,
    hasParking,
    petFriendly,
    minPrice,
    maxPrice,
  }) => {
    const params = {
      page,
    };

    if (hasParking === true || hasParking === "true") {
      params.hasParking = true;
    }

    if (petFriendly === true || petFriendly === "true") {
      params.petFriendly = true;
    }

    if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
      params.minPrice = minPrice;
    }

    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
      params.maxPrice = maxPrice;
    }

    return params;
  };

  const search = async () => {
    const { page, hasParking, petFriendly, minPrice, maxPrice } =
      queryString.parse(window.location.search);

    const response = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        hasParking: hasParking === "true",
        petFriendly: petFriendly === "true",
        minPrice: minPrice || "",
        maxPrice: maxPrice || "",
      }),
    });

    const data = await response.json();
    console.log("SEARCH DATA: ", data);
    setProperties(data.properties);
    setTotalResults(data.total);
  };

  const handlePageClick = async (pageNumber) => {
    const currentPath = window.location.pathname;
    const { hasParking, petFriendly, minPrice, maxPrice } =
      queryString.parse(window.location.search);

    await router.push(
    `${currentPath}?${queryString.stringify(
        buildQueryParams({
        page: pageNumber,
        hasParking,
        petFriendly,
        minPrice,
        maxPrice,
        }),
        { sort: false }
    )}`,
    undefined,
    {
        shallow: true,
    }
    );

    search();
  };

  const handleSearch = async ({
    petFriendly,
    hasParking,
    minPrice,
    maxPrice,
  }) => {
    const currentPath = window.location.pathname;

    console.log(
      "SEARCH FILTERS: ",
      petFriendly,
      hasParking,
      minPrice,
      maxPrice
    );

    await router.push(
    `${currentPath}?${queryString.stringify(
        buildQueryParams({
        page: 1,
        hasParking: !!hasParking,
        petFriendly: !!petFriendly,
        minPrice,
        maxPrice,
        }),
        { sort: false }
    )}`,
    undefined,
    {
        shallow: true,
    }
    );

    search();
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <Filters onSearch={handleSearch} />
      <Results properties={properties} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </div>
  );
};