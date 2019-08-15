/* eslint-disable no-console */
import client from './apiServer';

export default class CentaurusApi {
  static async searchSelectedFilter(filters) {
    try {
      const tagId = filters.release ? filters.release : 0;
      const fieldId = filters.dataset ? filters.dataset : 0;
      const typeId = filters.value ? filters.value : 0;
      const classId = filters.classesValue ? filters.classesValue : 0;
      let band;
      let search;

      filters.search === null ? (search = '') : (search = filters.search);
      filters.band === null ? (band = '') : (band = '');

      const data = await client.query(`
      query search {
        productsList(
          first: 5,
          tagId: ${tagId},
          fieldId: ${fieldId},
          typeId: ${typeId},
          classId: ${classId},
          band: "${band}",
          search: {
            text: "${search}"
          }
        ) {
          edges {
            node {
              productId
              displayName
              dataType
              processId
              tableId
              table {
                id
               dachsUrl
              }
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
          }
        }
      }

        `);

      console.log(data);

      return data;
    } catch (e) {
      console.error(e);
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
      console.error(e);
    }
  }

  static async getDataset(tagId) {
    try {
      let datasets = '';
      if (tagId === 0) {
        const data = await client.query(`
            query fieldsList {
              fieldsList {
                edges {
                  node {
                    id
                    fieldId
                    displayName
                  }
                }
              }
            }
        `);
        datasets = {
          fieldsByTagId: data.fieldsList.edges.map(edge => edge.node),
        };
      } else {
        datasets = await client.query(`
            query fieldByTag {
              fieldsByTagId(tagId: ${tagId}) {
                id
                fieldId
                displayName
              }
            }
        `);
      }
      return datasets;
    } catch (e) {
      console.error(e);
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
      console.error(e);
    }
  }

  static async getClasses() {
    try {
      const data = await client.query(`
        query search {
          productsList(first: 10) {
            edges {
              node {
                displayName
                dataType
                processId
                tableId
                dataType
                table {
                  id
                dachsUrl
                }
                Class {
                  id
                  classId
                  displayName
                }
                process {
                  productLog
                  startTime,
                  session {
                    id
                    user {
                      id
                      userName
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
      console.error(e);
    }
  }
}
