<script setup lang="ts">
import { RECITER } from '../lib/ayah-audio'
</script>

<template>
  <div class="nav-page settings-page">
    <div class="nav-hero">
      <h2>Credits</h2>
      <p class="nav-subtitle">The people and projects this app relies on</p>
    </div>

    <section class="settings-section">
      <h3 class="settings-heading">Recitation audio</h3>
      <dl class="credits-list">
        <dt>Reciter</dt>
        <dd>Sheikh {{ RECITER }} (murattal, Hafs 'an 'Asim)</dd>
        <dt>Source</dt>
        <dd>
          Ayah-by-ayah recordings from
          <a href="https://everyayah.com/" target="_blank" rel="noopener noreferrer">EveryAyah.com</a>
        </dd>
        <dt>Used in</dt>
        <dd>Surah Breakdown, one file per ayah</dd>
      </dl>
      <p class="settings-hint">
        The recordings belong to the reciter and their publishers. They are included here unaltered,
        free of charge and for non-commercial use only, with credit to the reciter and EveryAyah.com.
        Rights holders who want a recording removed can
        <a href="https://github.com/ikhwanh/arabic-flashcard/issues" target="_blank" rel="noopener noreferrer">open an issue on GitHub</a>.
      </p>
    </section>
  </div>
</template>
