/* eslint-disable no-console */
import client from './apiServer';

export default class CentaurusApi {
  static async searchSelectedFilter(filters, pageSize, after) {
    // console.log('after api', after);
    // console.log('pageSize api', pageSize);
    try {
      const tagId = filters.release ? filters.release : 0;
      const fieldId = filters.dataset ? filters.dataset : 0;
      const typeId = filters.type ? filters.type : 0;
      const classId = filters.classesValue ? filters.classesValue : 0;
      const sizePage =
        pageSize && typeof pageSize !== 'undefined' ? pageSize : 10;
      let band;
      let search;

      filters.search === null ? (search = '') : (search = filters.search);
      filters.band === null ? (band = '') : (band = '');

      const data = await client.query(`
      query search {
        productsList(
          tagId:${tagId},
          fieldId:${fieldId},
          typeId:${typeId},
          classId: ${classId},
          band:"${band}",
          search: {
            text: "${search}",
            columns: [
              release_tag_name,
              fields_field_name,
              fields_display_name,
              product_type_display_name
              product_class_display_name
              products_display_name,
              products_process_id,
            ]
          },
          first: ${sizePage},
          after: "${after}"
        ) {
          totalCount
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
                  displayName
                }
              }
              process {
                startTime
                session {
                  id
                  user {
                    id
                    userName
                    displayName
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

  static async getClasses(typeId) {
    console.log(typeId);
    try {
      let classes = '';
      if (typeId === 0) {
        classes = await client.query(`
          query search {
            productClassList {
              edges {
                node {
                  id
                  classId
                  displayName
                }
              }
            }
          }
        `);
        console.log(classes);
        classes = {
          productClassByTypeId: classes.productClassList.edges.map(
            edge => edge.node
          ),
        };
      } else {
        classes = await client.query(`
          query search {
            productClassByTypeId(typeId: ${typeId}) {
              id
              classId
              displayName
            }
          }
        `);
      }
      return classes;
    } catch (e) {
      console.error(e);
    }
  }
}
