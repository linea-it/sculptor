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
      console.log(releases);
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
      console.log(datasets);
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
      console.log(productClass);
      return productClass;
    } catch (e) {
      return null;
    }
  }
}
