<template>
  <div :class="[{'menu-left-hidden':isCollapse},'menu-left']">
    <div :class="[{'is-collapse':isCollapse},'title']">{{titleText}}</div>
    <Menu theme="dark" v-if="!isCollapse" :active-name="active_name" accordion  :open-names="['/first_home']">
      <Submenu v-for="menu in menuData" :key="menu.path" :name="menu.path">
        <template slot="title">
          <Icon type="md-document" />
          {{menu.name}}
        </template>
        <MenuItem
          v-for="menuChild in menu.children"
          :key="menuChild.path"
          :to="menuChild"
          :name="menuChild.name"
           @click.native="updateOpened(menu.path,menuChild)">
          {{ menuChild.meta.title }}
        </MenuItem>
      </Submenu>
    </Menu>
    <Menu theme="dark" v-else />
  </div>
</template>
<style src="./AppMenu.less" lang="less" scoped></style>
<script src="./AppMenu.js"></script>