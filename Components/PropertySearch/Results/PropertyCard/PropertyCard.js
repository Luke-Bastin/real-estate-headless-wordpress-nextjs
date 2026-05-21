import {
    faBathtub,
    faBed,
    faCar,
    faDog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import numeral from "numeral";

export const PropertyCard = ({
    title,
    destination,
    image,
    bedrooms,
    bathrooms,
    price,
    hasParking,
    petFriendly
}) => {
    return (
        <Link
            href={destination}
            className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200"
        >
            <div className="relative w-full h-48">
                <Image
                    src={image}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    alt={title}
                />
            </div>

            <div className="mt-3 text-lg font-bold">{title}</div>
            <div className="text-lg">£{numeral(price).format("0,0")}</div>

            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBathtub} />
                    <span>{bathrooms} bathrooms</span>
                </div>

                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBed} />
                    <span>{bedrooms} bedrooms</span>
                </div>

                {hasParking && (
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCar} />
                        <span>parking available</span>
                    </div>
                )}

                {petFriendly && (
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faDog} />
                        <span>pet friendly</span>
                    </div>
                )}
            </div>
        </Link>
    );
};