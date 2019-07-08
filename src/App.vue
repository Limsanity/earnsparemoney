<template>
  <v-app>
    <v-toolbar app>
      <img class="toolbar__icon" src="@/assets/logo.png">
      <v-spacer></v-spacer>
      <v-btn color="info">登录</v-btn>
    </v-toolbar>

    <v-content
      class="content"
    >
      <router-view />
    </v-content>
    
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
    >
      <v-btn
        color="teal"
        flat
        value="questionnaire"
        to="questionnaire"
        :replace="true"
      >
        <span>问卷中心</span>
        <v-icon>assignment</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="task"
        to="task"
        :replace="true"
      >
        <span>任务中心</span>
        <v-icon>visibility</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  private bottomNav: string = 'questionnaire'
}
</script>

<style lang="stylus" scoped>
@import '~styles/common.styl'
.toolbar__icon
  width 40px
  height 40px
.icon--margin
  iconMargin()
.content
  padding 56px 0 !important
</style>