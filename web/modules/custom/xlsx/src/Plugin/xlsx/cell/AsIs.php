<?php

namespace Drupal\xlsx\Plugin\xlsx\cell;

use Drupal\xlsx\Plugin\XlsxCellBase;

/**
 * Default XLSX cell plugin.
 *
 * @XlsxCell(
 *   id = "as_is",
 *   name = @Translation("As is"),
 *   description = @Translation("Pass cell value As is."),
 *   field_types = {}
 * )
 */
class AsIs extends XlsxCellBase {

  /**
   * {@inheritdoc}
   */
  public function import($entity, $field_name, $value, $mapped_fields) {
    $sval = trim($value);
    if ($sval == 'N/A') {
      return '';
    }
    return $value;
  }

}
