import Fetch from './fetch';

/**
 * Get all items from a resource
 * @param {string} resource - The resource name (e.g., 'users', 'products')
 * @param {Object} params - Optional query parameters
 * @returns {Promise} Response from the API
 */
export const getAll = async (resource, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = queryString ? `/${resource}?${queryString}` : `/${resource}`;
  return await Fetch(endpoint, 'GET');
};

/**
 * Get a single item by ID
 * @param {string} resource - The resource name
 * @param {string|number} id - The item ID
 * @returns {Promise} Response from the API-
 */
export const getById = async (resource, id) => {
  return await Fetch(`/${resource}/${id}`, 'GET');
};

/**
 * Create a new item
 * @param {string} resource - The resource name
 * @param {Object} data - The data to create
 * @returns {Promise} Response from the API
 */
export const create = async (resource, data) => {
  return await Fetch(`/${resource}`, 'POST', data);
};

/**
 * Update an existing item
 * @param {string} resource - The resource name
 * @param {string|number} id - The item ID
 * @param {Object} data - The data to update
 * @returns {Promise} Response from the API
 */
export const update = async (resource, id, data) => {
  return await Fetch(`/${resource}/${id}`, 'PUT', data);
};

/**
 * Delete an item
 * @param {string} resource - The resource name
 * @param {string|number} id - The item ID
 * @returns {Promise} Response from the API
 */
export const remove = async (resource, id) => {
  return await Fetch(`/${resource}/${id}`, 'DELETE');
};

/**
 * Patch an item (partial update)
 * @param {string} resource - The resource name
 * @param {string|number} id - The item ID
 * @param {Object} data - The data to patch
 * @returns {Promise} Response from the API
 */
export const patch = async (resource, id, data) => {
  return await Fetch(`/${resource}/${id}`, 'PATCH', data);
};