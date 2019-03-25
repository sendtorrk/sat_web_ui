//
// Author: Raja Kannan
//

'use strict';

export default {
  methods: {
    $confirmDialog(title = 'Confirm', message = 'Are you sure you want to continue ?', responseCb) {
      this.$q.dialog({
        title: title,
        message: message,
        ok: 'OK',
        cancel: 'Cancel'
      }).then(() => {
        return responseCb(true);
      }).catch(() => {
        return responseCb(false);
      });
    },

    $promptDialog(title = 'Prompt', message = 'Enter', defaultVal, responseCb) {
      this.$q.dialog({
        title: title,
        message: message,
        prompt: {
          model: defaultVal ? defaultVal : '',
          type: 'text' // optional
        },
        cancel: true,
        color: 'secondary'
      }).then(data => {
        return responseCb(data);
      }).catch(() => {
        return responseCb();
      });
    }
  }
}