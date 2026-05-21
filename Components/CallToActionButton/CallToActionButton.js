import { ButtonLink } from "Components/ButtonLink/ButtonLink";

export const CallToActionButton = ({align = "left", destination, buttonLabel}) => {
    const alignMap = {
        left: "text-align",
        right: "text-right",
        center: "text-center"
    }
    return <div className={alignMap[align]}>
        <ButtonLink destination={destination} label={buttonLabel} />
    </div>;
};