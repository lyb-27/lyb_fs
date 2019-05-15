<template>
  <div class="app-layout">
    <AppMenu class="menu" :isCollapse="isCollapsed" accordion ref="sideMenu" :active-name="$route.name"></AppMenu>
    <div :class="['app-layout-right', isCollapsed ? 'collapsed' : '']">
      <div class="app-layout-right-title"><app-header></app-header></div>
      <app-nav></app-nav>
      <div class="app-layout-main-wrap">
        <div class="app-layout-right-content-main">
          <router-view :key="key"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./AppLayout.less" lang="less" scoped></style>
<script src="./AppLayout.js"></script>
