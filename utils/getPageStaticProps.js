import client from "../client";
import { gql } from "@apollo/client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  console.log("CONTEXT: ", context);

  const uri = context.params?.slug
    ? `/${context.params.slug.join("/")}/`
    : "/";

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks(postTemplate: false)
            seo {
              opengraphDescription
              opengraphTitle
              twitterDescription
              twitterTitle
              title
              metaDesc
              canonical
            }
          }
          ... on Property {
            id
            blocks(postTemplate: false)
            seo {
              opengraphDescription
              opengraphTitle
              twitterDescription
              twitterTitle
              title
              metaDesc
              canonical
            }
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              label
              destination {
                ... on Page {
                  uri
                }
              }
            }
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });

  if (!data?.nodeByUri) {
    return {
      notFound: true,
    };
  }

  const blocks = cleanAndTransformBlocks(data.nodeByUri.blocks || []);

  return {
    props: {
      seo: data.nodeByUri.seo,
      blocks,
      menu: data.acfOptionsMainMenu ?? null,
      items: mapMainMenuItems(
        data.acfOptionsMainMenu?.mainMenu?.menuItems || []
      ),
      callToActionLabel:
        data.acfOptionsMainMenu?.mainMenu?.callToActionButton?.label || null,
      callToActionDestination:
        data.acfOptionsMainMenu?.mainMenu?.callToActionButton?.destination?.uri ||
        null,
    },
  };
};