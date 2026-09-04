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
    <?php echo "<p class='error'>Raça com ID " . $breed . " não encontrada.</p>"; ?>
    <p class="error">Raça não encontrada</p>

  <?php else: ?>
    <article class="breed-details">
      <h3><?= htmlspecialchars($breed['name'] ?? '—') ?></h3>
      <p><strong>Origem</strong>: <?= htmlspecialchars($breed['origin'] ?? '—') ?></p>
      <p><strong>Grupo</strong>: <?= htmlspecialchars($breed['group'] ?? '—') ?></p>
      <p><?= nl2br(htmlspecialchars($breed['description'] ?? '')) ?></p>
    </article>
  <?php endif; ?>
</section>

<?php include __DIR__ . '/../includes/footer.html'; ?>
