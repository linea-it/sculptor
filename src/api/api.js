import Lokka from 'lokka';

import Transport from 'lokka-transport-http';

const apiUrl =
  process.env.NODE_ENV !== 'development'
    ? window.origin + '/api/graphql'
    : process.env.REACT_APP_API_URL;

const client = new Lokka({
  transport: new Transport(apiUrl),
});
const query = ` edges {
  node {
    productId
    displayName
    dataType
    processId
    tableId
    table {
      id
      map {
        id
        filter
      }
    }
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
}`;

export default class CentaurusApi {
  static async getRelease() {
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

  static async searchRelease(value) { 
    try {
      const data = await client.query(`query search {
        productsList(first:10, tagId:${value}) {${query}}`);
        return data;
    } catch(e) {
      return null;
    };
  };

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

  static async searchDataset(value) { 
    try {
      const data = await client.query(`query search {
        productsList(first:10, fieldId:${value}) {${query}}`);
        return data;
    } catch(e) {
      return null;
    };
  };


  static async getType() {
    try {
      const productType = await client.query(`
      query type {
        productTypeList {
          edges {
            node {
              id
              typeId
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

  static async searchType(value) { 
    try {
      const data = await client.query(`query search {
        productsList(first:10, typeId:${value}) {${query}}`);
        return data;
    } catch(e) {
      return null;
    }; 
  };

  static async getClasses() {
    try {
      const productClass = await client.query(`
      query productClass {
        productClassList {
          edges {
            node {
              displayName
              classId
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

  static async searchClasses(value) { 
    try {
      const data = await client.query(`query search {
        productsList(first:10, classId:${value}) {${query}}`);
        return data;
    } catch(e) {
      return null;
    }; 
  };


  static async getBand() {
    try {
      const bandClass = await client.query(`
      query band {
        filtersList {
          edges {
            node {
              id
              filter
            }
          }
        }
      }
    `); 
    return bandClass;
    } catch (e) {
      return null;
    }
  }

  static async searchBand(value) { 
    try {
      const data = await client.query(`query search {
        productsList(first:10, band:"${value}") {${query}}`);
        return data;
    } catch(e) {
      return null;
    }; 
  };

  static async searchInput(value) { 
    try {
      const data = await client.query(`query search {
        productsList(filter:"${value}") {${query}}`);
        return data;
    } catch(e) {
      return null;
    }; 
  };
}



