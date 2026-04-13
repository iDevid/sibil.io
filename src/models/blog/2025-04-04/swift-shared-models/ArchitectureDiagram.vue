<template>
  <div class="diagram-wrap">
    <p class="diagram-title">Dependency Graph</p>

    <!-- Top row: consumers -->
    <div class="row consumers">
      <div class="node">
        <div class="node-box nb-ios">iOS App</div>
        <div class="node-label">SwiftUI · Swift</div>
      </div>
      <div class="node">
        <div class="node-box nb-android">Android App</div>
        <div class="node-label">Compose · Kotlin · swift-java</div>
      </div>
      <div class="node">
        <div class="node-box nb-backend">Vapor Backend</div>
        <div class="node-label">Linux · Swift</div>
      </div>
    </div>

    <!-- Arrows from iOS & Android down to SharedNetworkLayer; Vapor bypasses it -->
    <div class="row arrow-row">
      <div class="arrow-cell double-arrow">↑</div>
      <div class="arrow-cell double-arrow">↑</div>
      <div class="arrow-cell long-arrow">↑</div>
    </div>

    <!-- Middle row: SharedNetworkLayer (iOS + Android only) + Vapor arrow continues -->
    <div class="row middle-row">
      <div class="network-layer-wrap">
        <div class="node">
          <div class="node-box nb-network">SharedNetworkLayer</div>
          <div class="node-label">HTTP client · iOS &amp; Android</div>
        </div>
      </div>
      <div class="vapor-bypass-label">bypasses<br>network layer</div>
    </div>

    <!-- Arrows from all three (SharedNetworkLayer + Vapor) down to SharedModels -->
    <div class="row arrow-row center-arrows">
      <div class="arrow-cell">↑</div>
      <div class="arrow-cell">↑</div>
    </div>

    <!-- Bottom: SharedModels -->
    <div class="row">
      <div class="node">
        <div class="node-box nb-shared">SharedModels</div>
        <div class="node-label">Swift Package · All platforms</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.diagram-wrap {
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  /* Stay inside the grid column on narrow viewports */
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

.diagram-title {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 0 1.5rem;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.consumers {
  gap: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.node-box {
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  font-family: "SF Mono", "Fira Code", ui-monospace, monospace;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  min-width: 110px;
  text-align: center;
}

.node-label {
  font-size: 0.72rem;
  color: var(--muted);
  font-weight: 500;
}

/* Arrow row with three equal columns matching consumer layout */
.arrow-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  max-width: 460px;
  margin: 0.3rem 0;
}

.arrow-cell {
  font-size: 1.3rem;
  color: var(--line-strong);
  text-align: center;
}

/* Middle row: network layer (spans first two cols) + vapor bypass label (third col) */
.middle-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  max-width: 460px;
  align-items: center;
  gap: 0.5rem;
  margin: 0.1rem 0;
}

.network-layer-wrap {
  display: flex;
  justify-content: center;
}

.vapor-bypass-label {
  font-size: 0.65rem;
  color: var(--muted);
  text-align: center;
  line-height: 1.4;
  font-style: italic;
}

/* Two arrows below the middle row: one from SharedNetworkLayer, one from Vapor path */
.center-arrows {
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  max-width: 460px;
  margin: 0.3rem 0;
}

.nb-ios     { background: #0a84ff; }
.nb-android { background: #3ddc84; color: #0f0e0d; }
.nb-backend { background: #2d6a4f; }
.nb-network {
  background: rgba(255, 159, 10, 0.15);
  border: 1.5px solid #ff9f0a;
  color: #ff9f0a;
}
.nb-shared {
  background: rgba(184, 249, 127, 0.12);
  border: 1.5px solid var(--accent);
  color: var(--accent);
  font-size: 0.9rem;
  padding: 1rem 10rem;
}

@media (max-width: 480px) {
  .diagram-wrap {
    padding: 1.25rem 0.75rem;
  }

  .consumers {
    gap: 0.6rem;
  }

  .node-box {
    min-width: 80px;
    padding: 0.6rem 0.7rem;
    font-size: 0.7rem;
  }

  .node-label {
    font-size: 0.62rem;
  }

  .arrow-row,
  .center-arrows,
  .middle-row {
    max-width: 100%;
  }

  .vapor-bypass-label {
    font-size: 0.58rem;
  }

  .nb-shared {
    font-size: 0.8rem;
    padding: 0.75rem 6rem;
  }
}
</style>
