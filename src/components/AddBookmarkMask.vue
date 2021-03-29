<template>
  <transition name="fade">
    <div id="mask" @click="closeMask">
      <div class="modal-dialog">
        <div class="modal-header"></div>
        <div class="modal-content">
          <div class="m-row">
            <span>网址：</span>
            <input
              v-model.trim="meta.url"
              type="text"
              placeholder="粘贴网址或输入网址(Enter)，自动抓取标题和简介"
              @paste="pasteHandle"
              @keyup.enter="pasteHandle"
            />
          </div>
          <div class="m-row">
            <span>标题：</span>
            <input v-model.trim="meta.title" type="text" :disabled="disabled" />
          </div>
          <div class="m-row">
            <span>简介：</span>
            <textarea v-model.trim="meta.desc" :rows="5" :disabled="disabled"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <div class="modal-cancel" @click="cancelHandle">取消</div>
          <div class="modal-confirm" @click="confirmHandle">确认</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// import { debounce } from 'lodash';
import { defineComponent, reactive, ref, inject } from 'vue';

import { getTitleAndDescByUrl, createBookMark } from '@/api/index';

const URL_REG = /(^https?:\/\/)((\w+\.)+([a-z]{2,6})+|(([0-9]{1,3}\.){3}[0-9]{1,3}))/;

export default defineComponent({
  emits: ['close', 'confirm'],
  setup(props, { emit }) {
    const meta = reactive({
      url: '',
      title: '',
      desc: ''
    });

    const disabled = ref(true);
    const toast = inject('toast') as any;

    function cancelHandle() {
      emit('close');
    }
    async function confirmHandle() {
      if (!meta.url.startsWith('https')) {
        meta.url = 'https://' + meta.url.replace('http://', '');
      }
      if (!URL_REG.test(meta.url)) {
        toast('warn', '网址不合法');

        meta.url = '';
        meta.title = '';
        meta.desc = '';
        return;
      }

      const { id } = (await createBookMark(meta)) as any;
      toast('success', 'Success');
      emit('confirm', {
        id,
        title: meta.title,
        desc: meta.desc
      });
    }
    function pasteHandle() {
      setTimeout(async () => {
        if (!meta.url.startsWith('https')) {
          meta.url = 'https://' + meta.url.replace('http://', '');
        }

        console.log(meta.url);

        if (!URL_REG.test(meta.url)) {
          toast('warn', '网址不合法');

          meta.url = '';
          meta.title = '';
          meta.desc = '';
          return;
        }
        const { title, desc } = (await getTitleAndDescByUrl({ url: encodeURI(meta.url) })) as any;
        disabled.value = false;
        meta.title = title;
        meta.desc = desc;
      }, 0);
    }

    function closeMask(el: any) {
      if (el.target.id == 'mask') {
        emit('close');
      }
    }
    return { meta, disabled, confirmHandle, cancelHandle, pasteHandle, closeMask };
  }
});
</script>

<style scoped>
#mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 15px;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  position: relative;
  top: 15%;
  left: 50%;
  width: 100%;
  max-width: 600px;
  font-size: 16px;
  transform: translate(-50%);
  background-color: #ffffff;
  border-radius: 7px;
  overflow: hidden;
}
.modal-header {
  height: 44px;
  background-color: #f3f3f3;
}
.modal-footer {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.modal-cancel,
.modal-confirm {
  display: inline-block;
  width: 200px;
  text-align: center;
  height: 44px;
  line-height: 44px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 6px;
  color: #000000;
  background-color: #e6e6e6;
  margin-left: 35px;
}
.modal-cancel:hover {
  background-color: #ccc;
}
.modal-dialog .modal-confirm {
  color: #ffffff;
  background-color: #009a61;
}
.modal-confirm:hover {
  background-color: #006741;
  border-color: #00432a;
}
.modal-content {
  padding: 0 26px;
  text-align: left;
}
.m-row {
  display: flex;
  margin-top: 20px;
}
textarea[disabled] {
  background-color: #f3f3f3;
}
input[disabled] {
  background-color: #f3f3f3;
}
.modal-content input {
  flex: 1;
  padding: 4px 12px;
}
.modal-content textarea {
  padding: 6px;
  flex: 1;
  resize: none;
  border: 1px solid #e5e5e5;
}
</style>
