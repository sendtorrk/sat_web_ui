//
// Author: Raja Kannan
//

'use strict';

export default {
  methods: {
    // Private API
    // Callers should use other APIs
    async $_resource(options) {
      const config = {
        method: options.method,
        url: '/ui' + options.path
      }

      if (options.data) {
        config.data = options.data;
      }

      if (options.headers) {
        Object.assign(config.headers, options.headers);
      }

      const response = await this.$axios.request(config)
      return response.data;
    },

    async $postResource(path, data) {
      const options = {
        method: 'post',
        path: path,
        data: data
      };

      return await this.$_resource(options);
    },

    async $putResource(path, data) {
      const options = {
        method: 'put',
        path: path,
        data: data
      };

      return await this.$_resource(options);
    },

    async $getResource(path) {
      const options = {
        method: 'get',
        path: path
      }

      return await this.$_resource(options);
    },

    async $deleteResource(path) {
      const options = {
        method: 'delete',
        path: path
      }

      return await this.$_resource(options);
    },

    async $deleteWithDataResource(path, data) {
      const options = {
        method: 'delete',
        path: path,
        data: data
      }

      return await this.$_resource(options);
    }
  }
}