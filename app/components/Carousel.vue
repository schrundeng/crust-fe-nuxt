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
  height: 480px;
}

.taplak {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 130vw;
  height: 308px;
  background-color: #f5f5d5;
  transform: translate(-50%, -50%) rotate(-4deg);
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

@media (min-width: 768px) {
  .taplak-container {
    height: 560px;
  }

  .taplak {
    height: 364px;
  }
}
</style>
