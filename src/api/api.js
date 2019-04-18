import client from './apiServer';

export default class CentaurusApi {
  
  static async searchSelectedFilter(value) {
    const tagId = null;
    const fieldId = null; 
    const typeId = null;
    const classId = null;
    if (value.type === 'release') {
    }
    console.log('searchSelectedFilter:', value);
    try {
      const data = await client.query(`
      query search {
        productsList(first: 10, tagId:${value.value}, fieldId:${value.value}) {
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
          }
        }
      }      
        `);
      console.log('Data:', data);
      value = null;
      return data;
    } catch (e) {
      return null;
    };
  };

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