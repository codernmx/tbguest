<template>
  <div>
    <vue-particles
      color="#FF5777"
      :particleOpacity="0.6"
      :particlesNumber="90"
      shapeType="circle"
      :particleSize="4"
      linesColor="#FF5777"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="130"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="bg"
    >
    </vue-particles>

  </div>
</template>

<script>
export default {
  name: 'Snow',

  components: {},

  directives: {},

  data () {
    return {

    };
  },

  mounted () {

  },

  methods: {

  },
};
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  position: absolute;
  z-index: -1;
}
</style>