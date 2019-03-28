import Lokka from 'lokka';

import Transport from 'lokka-transport-http';

const apiUrl =
  process.env.NODE_ENV !== 'development'
    ? window.origin + '/api/graphql'
    : process.env.REACT_APP_API_URL;

const client = new Lokka({
  transport: new Transport(apiUrl),
});

export default class CentaurusApi {
  static async getAllrelease() {
    try {
      const releases = await client.query(`
      query realease {
        releaseTagList {
          edges {
            node {
              id
              releaseDisplayName
              tagId
              name
            }
          }
        }
      }
      `);
      return releases;
    } catch (e) {
      return null;
    }
  }

  static async getDataset(tagId) {
    try {
      const datasets = await client.query(`
          query fieldByTag {
            fieldsByTagId(tagId: ${tagId}) {
              id
              fieldId
              displayName
            }
          }
        `);
      return datasets;
    } catch (e) {
      return null;
    }
  }

  static async getAllClass() {
    try {
      const productClass = await client.query(`
      query productClass {
        productClassList {
          edges {
            node {
              displayName
            }
          }
        }
      }
      
        `);
      return productClass;
    } catch (e) {
      return null;
    }
  }

  static async getAllType() {
    try {
      const productType = await client.query(`
      query type {
        productTypeList {
          edges {
            node {
              id
              typeName
              displayName
            }
          }
        }
      }
      
        `);
      return productType;
    } catch (e) {
      return null;
    }
  }

  static async searchProductsAllFilters({ search, releaseName }) {
    try {
      const release = releaseName !== null ? releaseName : '';
      const data = await client.query(`
      query search {
        productsList(filter: "${search}", releaseName:"${release}" ) {
          edges {
            node {
              productId
              displayName
              dataType
              processId
              tableId
              dataType
              Class {
                id
                displayName
              }
              process {
                startTime,
                session {
                  id
                  user {
                    id
                    userName
                  }
                }
              fields {
                edges {
                  node {
                    id
                      displayName
                      releaseTag {
                        id
                        releaseDisplayName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `);
      return data;
    } catch (e) {
      return null;
    }
  }
}
