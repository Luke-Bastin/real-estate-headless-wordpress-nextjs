import { Cover } from "Components/Cover";
import { Heading } from "Components/Heading";
import { Paragraph } from "Components/Paragraph";
import { theme } from "../../utils/theme";
import { CallToActionButton } from "Components/CallToActionButton";
import { Columns } from "Components/Columns";
import { Column } from "Components/Column";
import Image from "next/image";
import { PropertySearch } from "Components/PropertySearch";
import { FormspreeForm } from "Components/FormspreeForm";
import { PropertyFeatures } from "Components/PropertyFeatures";
import { Gallery } from "Components/Gallery";
import { TickItem } from "Components/TickItem";
import { TickItemList } from "Components/TickItemList";

export const BlockRenderer = ({ blocks = [] }) => {
  return blocks.map((block) => {
    switch (block.name) {

      case "next/tick-item-list": {
        return (
        <TickItemList key={block.id}>
          <BlockRenderer blocks={block.innerBlocks} />
        </TickItemList>);
}

      case "acf/tick-item": {
        return (
          <TickItem key={block.id} as={block.as || "div"}>
            <BlockRenderer blocks={block.innerBlocks} />
          </TickItem>);
      }

      case "core/gallery": {
        return (
          <Gallery 
            key={block.id} 
            columns={block.attributes.columns || 3} 
            cropImages={block.attributes.imageCrop} 
            items={block.innerBlocks} />
        );
      }
      case "acf/propertyfeatures": {
        return <PropertyFeatures key={block.id} price={block.attributes.price} bedrooms={block.attributes.bedrooms} bathrooms={block.attributes.bathrooms} petFriendly={block.attributes.pet_friendly} hasParking={block.attributes.has_parking} />;
      }
      case "acf/ctabutton": {
        return (
          <CallToActionButton 
            key={block.id} 
            buttonLabel={block.attributes.data.label} 
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.align}
          />
        );
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.textAlign}
            content={block.attributes.content}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }

      case "core/post-title":
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
          />
        );
      }
      
      case "acf/formspree-form": {
        return (
          <FormspreeForm key={block.id} formId={block.attributes.data.form_id} />
        );
      }

      case "acf/propertysearch": {
        console.log("PROPERTY SEARCH BLOCK:", block);
        return <PropertySearch key={block.id} />;
      }

      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }
      case "core/columns": {
        console.log("COLUMNS: ", block.attributes);
        return (
        <Columns 
          key={block.id} 
          isStackedOnMobile={block.attributes.isStackedOnMobile}
          textColor={
              theme[block.attributes?.textColor] ||
              block.attributes?.style?.color?.text
              }
          backgroundColor={
            theme[block.attributes?.backgroundColor] ||
            block.attributes?.style?.color?.background
            }
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </Columns>
        );
      }
      case "core/column": {
        return (
          <Column 
            key={block.id} 
            width={block.attributes?.width}
            textColor={
              theme[block.attributes?.textColor] ||
              block.attributes?.style?.color?.text
              }
            backgroundColor={
              theme[block.attributes?.backgroundColor] ||
              block.attributes?.style?.color?.background
              }
            >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      case "core/block":
      case "core/group": {
        return (
          <BlockRenderer 
            key={block.id} 
            blocks={block.innerBlocks} 
          />
        );
      }
      case "core/image": {
        return (
          <Image 
            key={block.id} 
            src={block.attributes.url} 
            height={block.attributes.height}
            width={block.attributes.width}
            alt={block.attributes.alt || ""}
          />
        );
      }
      default: {
        console.log("UNKNOWN: ", block);
        return null;
      }
    }
    });
};