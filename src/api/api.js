import client from './apiServer';

export default class CentaurusApi {
  static async searchSelectedFilter(filters, pageSize, after) {
    // console.log('after api', after);
    // console.log('pageSize api', pageSize);
    try {
      let tagId;
      let fieldId;
      let typeId;
      let classId;
      let band;
      let search;

      filters.release === '' ? (tagId = 0) : (tagId = filters.release);
      filters.dataset === '' ? (fieldId = 0) : (fieldId = filters.dataset);
      filters.type === '' ? (typeId = 0) : (typeId = filters.type);
      filters.classesValue === ''
        ? (classId = 0)
        : (classId = filters.classesValue);
      filters.search === null ? (search = '') : (search = filters.search);
      filters.band === null ? (band = '') : (band = '');

      const data = await client.query(`
      query search {
        productsList(tagId:${tagId}, fieldId:${fieldId}, typeId:${typeId}, classId: ${classId}, band:"${band}", filter:"${search}", first: ${pageSize}, after: "${after}") {
          totalCount
          edges {
            node {
              productId
              displayName
              dataType
              processId
              tableId
              Class {
                id
                displayName
                productType {
                  typeName
                }
              }
              process {
                startTime
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
            cursor
          }
        }
      }
      
        `);
      // console.log("data", data);
      return data;
    } catch (e) {
      return null;
    }
  }

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
}
