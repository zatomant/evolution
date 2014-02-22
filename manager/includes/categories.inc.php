<?php
//Helper functions for categories
//Kyle Jaebker - 08/07/06

//Create a new category
function newCategory($newCat) {
    global $modx;
    $useTable = $modx->getFullTableName('categories');
    $categoryId = $modx->db->insert(
        array(
            'category' => $modx->db->escape($newCat),
        ), $useTable);
    if (!$categoryId) $categoryId = 0;
    return $categoryId;
}
//check if new category already exists
function checkCategory($newCat = '') {
    global $modx;
    $useTable = $modx->getFullTableName('categories');
    $sql = 'select * from ' . $useTable . ' order by category';
    $cats = $modx->db->query($sql);
    while($row = $modx->db->getRow($cats)) {
        if ($row['category'] == $newCat) {
            return $row['id'];
        }
    }
    return 0;
}
//Get all categories
function getCategories() {
    global $modx;
    $useTable = $modx->getFullTableName('categories');
    $sql = 'select id, category from ' . $useTable . ' order by category';
    $cats = $modx->db->query($sql);
    $resourceArray = array();
    while($row = $modx->db->getRow($cats)) {
        array_push($resourceArray,array( 'id' => $row['id'], 'category' => stripslashes( $row['category'] ) )); // pixelchutes
    }
    return $resourceArray;
}
//Delete category & associations
function deleteCategory($catId=0) {
    global $modx;
    if ($catId) {
        $resetTables = array('site_plugins', 'site_snippets', 'site_htmlsnippets', 'site_templates', 'site_tmplvars', 'site_modules');
        foreach ($resetTables as $n=>$v) {
            $useTable = $modx->getFullTableName($v);
            $modx->db->update(array('category'=>0), $useTable, "category='{$catId}'");
        }
        $catTable = $modx->getFullTableName('categories');
        $modx->db->delete($catTable, "id='{$catId}'");
    }
}

?>