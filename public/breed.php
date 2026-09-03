<?php
require_once __DIR__ . '/../src/http-client.php';
$id = isset($_GET['id']) ? trim($_GET['id']) : null;
$breed = fetchBreedById($id);
include __DIR__ . '/../includes/header.html';
?>
<section class="breed-page">
  <h2>Detalhes da Raça</h2>

  <form method="get" action="breed.php" class="search-form">
    <label for="breedId">ID da raça</label>
    <input id="breedId" name="id" value="<?= htmlspecialchars($id ?? '') ?>" placeholder="Digite o ID">
    <button type="submit">Buscar</button>
  </form>

  <?php if ($id && $breed === null): ?>
    <p class="error">Raça não encontrada ou erro ao consultar o backend.</p>
  <?php endif; ?>

  <?php if ($breed): ?>
    <article class="breed-details">
      <h3><?= htmlspecialchars($breed['name'] ?? '—') ?></h3>
      <p><strong>Origem</strong>: <?= htmlspecialchars($breed['origin'] ?? '—') ?></p>
      <p><strong>Grupo</strong>: <?= htmlspecialchars($breed['group'] ?? '—') ?></p>
      <p><?= nl2br(htmlspecialchars($breed['description'] ?? '')) ?></p>
    </article>
  <?php else: ?>
    <p class="placeholder">Busque uma raça pelo ID ou clique em "Ver detalhes" na lista.</p>
  <?php endif; ?>
</section>
<?php include __DIR__ . '/../includes/footer.html'; ?>
