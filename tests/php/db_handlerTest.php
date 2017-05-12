<?php
include __DIR__.'/../db_handler.php';
use PHPUnit\Framework\TestCase;
use PHPUnit\DbUnit\TestCaseTrait;

class db_handlerTest extends TestCase
{
  // Just an example, not really relevant
  public function testPushAndPop(){
    $stack = [];
    $this->assertEquals(0, count($stack));
  }
}
?>
