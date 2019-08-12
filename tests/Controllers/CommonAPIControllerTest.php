<?php

namespace Tests\Controllers;

use Tests\TestCase;

class CommonAPIControllerTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function test_can_get_all_country_list()
    {
        $response = $this->getJson('api/b1/currencies');

        $this->assertNotEmpty($response->original);
        $this->assertArrayHasKey('country', $response->original[0]);
        $this->assertArrayHasKey('iso_code', $response->original[0]);
    }
}