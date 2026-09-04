<?php
  require_once __DIR__ . '/../src/http-client.php';
  $breeds = fetchAllBreeds('');
  include __DIR__ . '/../includes/header.html';
?>
<section class="list">
  <h2>Raças</h2>

  <?php if (empty($breeds)): ?>
    <p>Nenhuma raça encontrada.</p>

  <?php else: ?>
    <a class="btn" href="breed.php?id=<?= urlencode($b['id'] ?? '') ?>">Selecione uma raça</a>
    <div class="cards">
        <?php foreach ($breeds as $b): ?>
            <article class="card">
            <h3><?= htmlspecialchars($b['name'] ?? '—') ?></h3>
            <p><?= htmlspecialchars($b['origin'] ?? 'Origem desconhecida') ?></p>
            
            </article>
        <?php endforeach; ?>
    </div>
  <?php endif; ?>
</section>

<?php include __DIR__ . '/../includes/footer.html'; ?>
