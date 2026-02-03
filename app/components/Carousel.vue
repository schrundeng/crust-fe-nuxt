<template>
  <div class="taplak-container">
    <div class="taplak">
      <div class="taplak-horizontal-stripes"></div>
      <div class="taplak-vertical-stripes"></div>
    </div>
  </div>
</template>

<style scoped>
.taplak-container {
  width: 100%;
  position: relative;
  overflow: clip;
  height: 372px;
}

.taplak {
  position: absolute;
  margin-top: 32px;
  width: 120%;
  left: -10%;
  height: 308px;
  background-color: #f5f5d5;
  transform: rotate(-4deg);
  transform-origin: center;
}

.taplak-horizontal-stripes {
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 28px,
    rgba(176, 181, 34, 0.5) 28px,
    rgba(176, 181, 34, 0.5) 56px
  );
}

.taplak-vertical-stripes {
  position: absolute;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 28px,
    rgba(176, 181, 34, 0.5) 28px,
    rgba(176, 181, 34, 0.5) 56px
  );
}
</style>
