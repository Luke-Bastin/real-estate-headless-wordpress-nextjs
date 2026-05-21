import { PropertyCard } from "./PropertyCard";

export const Results = ({ properties }) => {
    console.log("PROPERTIES DATA:", properties);

    return (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 mb-10 px-4">
            {properties.map((property) => {
                console.log("PROPERTY FEATURES:", property.propertyFeatures);

                return (
                    <PropertyCard
                        key={property.databaseId}
                        title={property.title}
                        destination={property.uri}
                        bedrooms={property.propertyFeatures?.bedrooms}
                        bathrooms={property.propertyFeatures?.bathrooms}
                        price={property.propertyFeatures?.price}
                        hasParking={property.propertyFeatures?.hasParking}
                        petFriendly={property.propertyFeatures?.petFriendly}
                        image={property.featuredImage?.node?.sourceUrl}
                    />
                );
            })}
        </div>
    );
};