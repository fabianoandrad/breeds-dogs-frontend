<?php
// http-client.php - cURL, retorna array com ok,status,error,body

function requestBackend(string $url): array {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Accept: application/json",
        "User-Agent: PHP-cURL"
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 8);

    $body = curl_exec($ch);
    $err = curl_error($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($body === false || $err) {
        return ['ok' => false, 'status' => 0, 'error' => $err ?: 'unknown', 'body' => null];
    }

    $data = json_decode($body, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        // Retorna o body cru para debug se não for JSON
        return ['ok' => false, 'status' => $status, 'error' => 'invalid_json', 'body' => $body];
    }

    return $data;
}

function fetchAllBreeds(): array {
    $base = "http://localhost:8000/api/dogs";
    return requestBackend($base);
}

function fetchBreedById(string $id): array {
    $id = trim($id);
    if ($id === '') {
        return ['ok' => false, 'status' => 0, 'error' => 'empty_id', 'body' => null];
    }

    $base = "http://localhost:8000/api/dog/" . urlencode($id);

    $res = requestBackend($base);
    return $res;
}
