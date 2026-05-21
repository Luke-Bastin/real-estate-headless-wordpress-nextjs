import { gql } from "@apollo/client";
import client from "../../client";

const handler = async (req, res) => {
  try {
    const filters = JSON.parse(req.body);

    const metaFilters = [];

    if (filters.hasParking) {
      metaFilters.push(`
        {
          key: "has_parking"
          compare: EQUAL_TO
          value: "1"
        }
      `);
    }

    if (filters.petFriendly) {
      metaFilters.push(`
        {
          key: "pet_friendly"
          compare: EQUAL_TO
          value: "1"
        }
      `);
    }

    if (filters.minPrice) {
      metaFilters.push(`
        {
          key: "price"
          compare: GREATER_THAN_OR_EQUAL_TO
          value: "${filters.minPrice}"
          type: NUMERIC
        }
      `);
    }

    if (filters.maxPrice) {
      metaFilters.push(`
        {
          key: "price"
          compare: LESS_THAN_OR_EQUAL_TO
          value: "${filters.maxPrice}"
          type: NUMERIC
        }
      `);
    }

    const offset = ((filters.page || 1) - 1) * 3;

    const metaQuerySection =
      metaFilters.length > 0
        ? `
          metaQuery: {
            relation: AND
            metaArray: [
              ${metaFilters.join(",")}
            ]
          }
        `
        : "";

    const query = gql`
      query AllPropertiesQuery {
        properties(
          where: {
            offsetPagination: { size: 3, offset: ${offset} }
            ${metaQuerySection}
          }
        ) {
          pageInfo {
            offsetPagination {
              total
            }
          }
          nodes {
            databaseId
            title
            uri
            featuredImage {
              node {
                uri
                sourceUrl
              }
            }
            propertyFeatures {
              price
              petFriendly
              hasParking
              bedrooms
              bathrooms
            }
          }
        }
      }
    `;

    const { data } = await client.query({
      query,
    });

    return res.status(200).json({
      total: data.properties.pageInfo.offsetPagination.total,
      properties: data.properties.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
    return res.status(500).json({
      error: "Something went wrong fetching properties.",
    });
  }
};

export default handler;