Vue.component('modalcreate', {
    template: `<transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            default header
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                          <div class="field">
                          <label class="label">Task Tittle</label>
                            <p class="control">
                              <input class="input" type="text" placeholder="Task Tittle">
                            </p>
                          </div>
                          <div class="field">
                            <label class="label">Task Detail</label>
                            <p class="control">
                              <textarea class="textarea" placeholder="Textarea"></textarea>
                            </p>
                          </div>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button button is-primary" @click="$emit('close')">
                            Submit
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>`
})

// start app
var app = new Vue({
    el: '#app',
    data: {
        showModalCreate: false,
    },
    methods:{
      logOut : function () {
        window.location = '/'
      }
    }
})