<template lang="pug">
.input-upload(:style="getStyles()")
  InputDecorate(:field="field", :name="name", :value="value", :ident="ident", @addItem="addItem", @cleanItems="cleanItems", @removeItem="removeItem", :actions="{add: true, remove: true, clean: true}")
    template(v-slot="{ value, index, ident }")
      .input-upload__inputs(:class="['input-upload__inputs--' + (field.upload || 'file'), (value && value.length && value[0].path ? 'input-upload__inputs--filled' : 'input-upload__inputs--empty')]")
        .input-upload__input
          .input-upload__upload
            el-upload(v-if="field.upload === undefined || field.upload === 'file'", :id="ident", :file-list="value", :data="getData()", :action="action", :on-success="(...args) => {doSuccess(index, ...args)}", :before-remove="(...args) => {doBeforeRemove(index, ...args)}")
              el-button(type="primary") Click to upload
              .el-upload__tip(slot="tip") jpg/png files with a size less than 500kb
            el-upload.input-upload__input-image(v-if="field.upload === 'image'", :id="ident", :file-list="value", :data="getData()", :action="action", :on-success="(...args) => {doSuccess(index, ...args)}", :before-remove="(...args) => {doBeforeRemove(index, ...args)}", :show-file-list="false")
              img.input-upload__image(v-if="value && value.length && value[0].path", :src="value[0].path")
              i.input-upload__image-icon.el-icon-plus(v-else)
          .input-upload__actions(v-if="field.upload === 'image' && value && value.length && value[0].path")
            .input-upload__action.input-upload__action--danger(@click="doDeleteValue(index, value)")
              i.el-icon-delete
  el-divider
</template>

<script>
import API from '~/client/api/API';

const api = API.create('/api');

export default {
  props: ['field', 'value', 'name', 'ident'],
  data() {
    return {
      action: '',
      image: '',
    };
  },
  mounted() {
    api.getUrl('upload.file').then(v => this.action = v);
  },
  methods: {
    log(value) {
      console.log(value);
      return value;
    },
    getData() {
      return { 
        upload_dir: this.field.upload_dir,
      };
    },

    getStyles() {
      const styles = {};

      if (this.field.span) {
        styles['grid-column'] = this.field.span + ' span';
      }
      return styles;
    },

    cleanItems() {
      const value = [];
      for (const item of this.value) {
        if (item.value.length) {
          value.push(item);
        }
      }
      
      if (!value.length) {
        this.value.splice(0, this.value.length);
        this.addItem();
      } else {
        this.$emit('input', value);
      }
    },

    addItem() {
      this.value.push({value: []});
      this.$emit('input', this.value);
    },

    removeItem() {
      this.value.pop();
      if (!this.value.length) {
        this.addItem();
      } else {
        this.$emit('input', this.value);
      }
    },

    input(value, index) {
      if (index === undefined) {
        this.$emit('input', value);
      } else {
        this.value[index].value = value;
        this.$emit('input', this.value);
      }
    },

    doBeforeRemove(index, file, fileList) {
      this.input([], index);
    },

    doSuccess(index, response, file, fileList) {
      if (response.content.state) {
        this.input([response.content.value], index);
      } else {
        fileList.pop();
        this.$message.error(response.content.message);
      }
    },

    doDeleteValue(index, value) {
      this.value[index].value = [];
      this.$emit('input', this.value);
    },
  },
};
</script>

<style lang="sass">
.input-upload

  &__inputs
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(165px, 200px))
    grid-gap: 10px

  &__inputs--image &__upload
    position: relative
    width: 100%
    padding-bottom: 100%

  &__input-image
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    cursor: pointer
    overflow: hidden

    &:hover
      border-color: #409EFF

    & .el-upload--text
      display: flex
      width: 100%
      height: 100%
      justify-content: center
      align-items: center

  &__inputs--empty &__input-image
    border: 1px dashed #d9d9d9
    border-radius: 6px

  &__inputs--filled &__input-image
    border-top-left-radius: 6px
    border-top-right-radius: 6px

  &__image
    width: 100%
    height: 100%
    object-fit: cover

  &__image-icon
    text-align: center
    color: #8c939d
    font-size: 28px

  &__actions
    display: flex
    border-bottom-left-radius: 6px
    border-bottom-right-radius: 6px
    overflow: hidden

  &__action
    width: 100%
    text-align: center
    padding: 5px
    cursor: pointer

  &__action--primary
    color: white
    background-color: #409EFF

    &:hover
      background-color: #66b1ff

  &__action--danger
    color: white
    background-color: #F56C6C

    &:hover
      background-color: #f89a9a

</style>
